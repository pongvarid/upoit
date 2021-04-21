<template>
  <div class="md:pt-6 pb-32 pt-44"  >
    <form  @submit.prevent="genReport()">
      <v-text-field v-model="yearData" required label="ระบุปีงบประมาณ" outlined></v-text-field>
      <v-btn type="submit">สร้างรายงาน</v-btn>
    </form>

    <div v-if="!year">
      <v-alert>ไม่พบข้อมูลปีงบประมาณ</v-alert>
    </div>
    <div><br>
      หน่วยงาน :  {{agencyCount}} / {{agencies.length}}
      <v-progress-linear
          :value="percentage(agencyCount,agencies.length)"
          height="25"
      >
        <strong>{{ percentage(agencyCount,agencies.length) }}%   </strong>
      </v-progress-linear>
    </div>




  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Core/Navbar.vue";
import Loading from "@/components/Web/Loading.vue";
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Web } from "@/store/web";
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import _ from 'lodash'
import XLSX from 'xlsx' // import xlsx
import {Result} from '@/store/result'
import {CoreResult} from '@/store/core_result'
@Component({
  components: {
    Navbar,
    Loading,
  },
  computed: {}
})

export default class TestDevClass extends Vue {

  agencyData:any = 7;


  yearData:any = '' ;
  agencies:any = [];
  agency:any = null
  assignments:any = null
  year:any = [];
  issues:any = [];
  response:boolean  = false;
  score:any = ''
  score30:number = 0
  chooseAssignId:number = 1;
  allUser:number = 0;

  async genReport(){
    let year = await this.yearCheck();
    if(year.id){
      for(let i=0; i < this.agencies.length; i++){
        await this.getIssue(this.agencies[i]);
        await this.getUserDone(this.agencies[i]);
        await this.storeData(this.agencies[i])

      }

    }
  }
  agencyCount:any = 0;
  async storeData(agency:any){
    console.log(agency,this.allUser,this.score,this.score30,(this.score >= 79)?'ผ่านการประเมิน':'ไม่ผ่านการประเมิน',this.assignments)
    let result = (this.score >= 79)?'ผ่านการประเมิน':'ไม่ผ่านการประเมิน'
    let store = await Core.postHttp(`/api/report/v1/reportraweit/`,{
      "year": this.yearData,
      "score": this.score,
      "score30": this.score30,
      "user_do": this.allUser,
      "user_set": agency.iit,
      "result": result,
      "rawType": JSON.stringify(this.assignments),
      "rawDone": JSON.stringify(this.issues),
      "agency": agency.id
    })
    if(store.id){
      this.agencyCount++
      await this.openNotification('top','success','<i class="em em-sunglasses" aria-role="presentation" aria-label="SMILING FACE WITH SUNGLASSES"></i>',agency.name,result);
    }else{
      await this.openNotification('top','danger','<i class="em em-triumph" aria-role="presentation" aria-label="FACE WITH LOOK OF TRIUMPH"></i>',agency.name,'ผิดพลาด');
    }
  }

  async yearCheck(){
    this.year = await Core.getHttp(`/api/iit/v2/year/?year=${this.yearData}`)
    this.year = (this.year[0])?this.year[0]:false
    return this.year
  }

  async getIssue(agency:any){

    this.assignments = await Core.getHttp(`/api/eit/v2/assessmentissues/?year=${this.year.id}`)
    this.chooseAssignId = this.assignments[0].id
    this.issues = await CoreResult.getIssueEIT(this.year.id,agency.id)
    this.score = await CoreResult.getScrollAll();
    this.score30 = await CoreResult.getScoreEIT();
    console.log(this.issues );

  }



  async created(){
    await Web.switchLoad(true)
    this.agencies = await Core.getHttp(`/api/ita/v1/agency/`)

    await Web.switchLoad(false)


  }

  async getUserDone(agency:any){

    let user = await Core.getHttp(`/api/eit/v2/answersuggestioneit/?year=${this.year.id}&agency=${agency.id}`)
    this.allUser = user.length
  }

  async onExport() {
    const dataWS = XLSX.utils.json_to_sheet(this.issues)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, dataWS)
    XLSX.writeFile(wb,'export.xlsx')
  }
  $vs:any
  async openNotification(position:any = null, color:any, icon:any,title:string,text:string) {

    const noti = this.$vs.notification({
      icon,
      color,
      position,
      title: title,
      text: text}) }
  percentage(partialValue:any, totalValue:any) {
    return Number(((100 * partialValue) / totalValue).toFixed(0))
  }

}
</script>

