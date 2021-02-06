<template>
  <div class="pt-20">
      <v-select v-model="year" filled label="ปีงบประมาณ" :items="years" item-text="year" item-value="year"></v-select>
     <div v-for="agency,index in agencies" :key="index">
       <v-card class="p-4 m-2" @click="getDetail(agency)">
         <h2>{{agency.name}}</h2>
       </v-card>
     </div>

    <v-dialog v-model="dialog">
      <v-card v-if="dialog">
        <v-card-title>
            {{agency.name}} <v-spacer></v-spacer><v-btn @click="closeDialog()" icon fab small><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <h2 class="text-xl">IIT : {{binIIT}}</h2>
          <h2 class="text-xl">EIT : {{binEIT}}</h2>
          <h2 class="text-xl">OIT : {{binOIT}}</h2>
            <br>
          <h2 class="text-xl">รายละเอียด</h2>
          <v-expansion-panels v-model="exTab" multiple>
            <v-expansion-panel >
              <v-expansion-panel-header>
                IIT
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <IIT @data="getIITScore" :currentAgency="agency" :currentYear="yearIIT" />
               </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel >
              <v-expansion-panel-header>
                EIT
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <EIT @data="getEITScore" :currentAgency="agency" :currentYear="yearEIT" />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel >
              <v-expansion-panel-header>
                OIT
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <OIT @data="getOITData" :currentAgency="agency" :currentYear="yearOIT" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>


<!--         >-->

<!--           -->


        </v-card-text>
        <v-card-actions>
          <v-btn @click="storeData" x-large color="success" class="w-full">บันทึกผลคะแนน &nbsp;&nbsp; <b>{{agency.name}}</b>&nbsp;  ปีงบประมาณ <b>{{year}}</b></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script lang="ts">
import {Web} from "@/store/web";
import {User} from "@/store/user";
import {Auth} from "@/store/auth";
import {Core} from "@/store/core";
import {Report} from "@/store/report";
import { userRouter } from '@/router/user'
import {Component, Vue, Watch} from "vue-property-decorator";
import _ from 'lodash'
import IIT from '@/components/ReportAdmin/IIT.vue'
import EIT from '@/components/ReportAdmin/EIT.vue'
import OIT from '@/components/ReportAdmin/OIT.vue'
@Component({
  components: {
    IIT,EIT,OIT
  },
  computed: {}
})

export default class ReportPage extends Vue {
  private exTab:any = [0,1,2,3]
 private agencies:any = null;
  private years:any = null;
  private dialog:boolean = false
  private year:any = null
  private agency:any = null
  private yearIIT:any = null
  private yearEIT:any = null
  private yearOIT:any = null
  private binIIT:any = 0
  private binEIT:any = 0
  private binOIT:any = 0
  private rawIIT:any = null;
  private rawEIT:any = null;
  private rawOIT:any = null;
  async created() {
    await Web.switchLoad(true)
    await this.loadEnv();

    await Web.switchLoad(false)
      
  }

  async loadEnv(){
    this.agencies = await Core.getHttp(`/api/ita/v1/agency/`)
    this.years = await Core.getHttp(`/api/ita/v1/year/`)
  }

  async getDetail(agency:any){
    if(this.year){
      this.agency = agency
      this.yearIIT = await Report.getYearIIT(this.year)
      this.yearEIT = await Report.getYearEIT(this.year)
      this.yearOIT = await Report.getYearOIT(this.year)
      this.dialog = true;
    }else{
      alert('กรุณาเลือกปีงบประมาณ')
    }

  }
  async closeDialog(){
    this.dialog = false
  }

  async getIITScore(val:any){
      this.binIIT = val.score30
      this.rawIIT = val
  }

  async getEITScore(val:any){
    this.binEIT = val.score30
    this.rawEIT = val
  }
  async getOITData(value:any){
    this.binOIT = value.score60
    this.rawOIT = value
  }

  async storeData(){
    await this.storeReport();
    await this.storeReportDetail();
  }

  async storeReport(){
    let form = {
      year : this.year,
      agency : this.agency.id,
      iit : Number(this.rawIIT.score30),
      eit : Number(this.rawEIT.score30),
      oit : Number(this.rawOIT.score60),
      all : Number(this.rawIIT.score30) + Number(this.rawEIT.score30) + Number(this.rawOIT.score60),
    }
    await Core.postHttp(`/api/report/v1/reportall/`,form)
  }

  async storeReportDetail(){

      for (let i =0 ; i < this.rawIIT.list_data.length ; i++){
        let bin = this.rawIIT.list_data[i]

        let form = {
          year : this.year,
          agency : this.agency.id,
          name :  bin.name,
          score :  bin.score,
          order :  bin.order,
        }
        console.log('{DTATA}',form);
        await Core.postHttp(`/api/report/v1/reportdetail/`,form)
      }

    for (let i =0 ; i< this.rawEIT.list_data.length ; i++){
      let bin = this.rawEIT.list_data[i]
      let form = {
        year : this.year,
        agency : this.agency.id,
        name :  bin.name,
        score :  bin.score,
        order :  bin.order,
      }
      await Core.postHttp(`/api/report/v1/reportdetail/`,form)
    }

  }


  

}
</script>

<style>
 
</style>
