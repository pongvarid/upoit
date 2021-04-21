<template>
  <div  >
    <div class="container px-auto">
      <h2 class="text-xl mt-2 leading-tight font-semibold font-heading"> ผลการประเมินแต่ละหน่วยงาน
        <v-btn class="m-1" @click="prePrint()"><i class="em em-printer" aria-role="presentation" aria-label=""></i>Print</v-btn>
      </h2><br>
       <div class="flex ">
         <v-select class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="chooseYear" :items="years" item-text="year" item-value="year"></v-select>
         <v-autocomplete class="m-1"  @change="loadData()" filled  label="หน่วยงาน / คณะ /กอง / ศูนย์" v-model="chooseAgency" :items="agency" item-text="name" item-value="id"></v-autocomplete>
      </div>




    </div>

    <div class="block relative " style="z-index:1;" v-if="response" >
      <div class="container mx-auto">


        <div class="mt-4">
         <RawDataChart :year="chooseYear" :agency="chooseAgency" />
        </div>




       
      </div>
    </div>
    <div class="flex flex-wrap flex-col md:flex-row justify-center" v-else>
      <center>

        <div>
          <v-icon  style="font-size:79px; color:#3182ce;">mdi-information</v-icon><br><br>
          <h2  class="text-2xl text-blue-600">ยังไม่เปิดให้เข้าถึงข้อมูล</h2>
        </div>
      </center>
    </div >


  </div>
</template>

<script lang="ts">
import {
  Component, Prop,
  Vue
} from 'vue-property-decorator';
import {
  Core
} from '@/store/core'
import {
  Auth
} from '@/store/auth'
import {
  User
} from '@/store/user'
import _ from 'lodash'
import {
  Web
} from '@/store/web'

import RawDataChart from './AgencyRawDataChartRealtime.vue'
@Component({
  components: {
    RawDataChart
  },
})
export default class Home extends Vue {


  @Prop({default:false})
  private debug:any;

  appSetting:any = {}
  chooseYear: any = '2563'
  chooseAgency:any = 85

  response:boolean = false
  private agency: any = null
  private years:any = []
  async created() {



   this.appSetting = await Core.getHttp(`/setting/app/`)

    this.appSetting = await Core.getHttp(`/setting/app/`)
    if(!this.debug){
      this.years = await _.filter(this.appSetting.year_result,{open:true})
    }else{
      this.years = this.appSetting.year_result
    }

    if(this.years[0]){
      this.chooseYear = this.years[this.years.length-1].year
    }



    this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
    try {
      let user = await User.getProfile();
      if(user){
        this.chooseAgency = user.ext_link.agency
      }

    }
    catch(err) {

    }

    await this.loadData();

    this.response = true;
  }

  async loadData(){
   await Web.switchLoad(true)
    this.response = false;
   setTimeout(() => {  console.log("World!"); }, 5000);
   await Web.switchLoad(false)
    this.response = true;
  }





  prePrint(){
    window.print();
  }

}
</script>

