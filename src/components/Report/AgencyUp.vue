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
    <div v-else>
      <center>
        <v-icon  style="font-size:62px;">mdi-information</v-icon>
        <h2>กรุณาเลือกปีงบประมาณ และ หน่วยงาน กอง ศูนย์ หรือ คณะ</h2>
      </center>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
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

import RawDataChart from './AgencyRawDataChart.vue'
@Component({
  components: {
    RawDataChart
  },
})
export default class Home extends Vue {

  chooseYear: any = 2563
  chooseAgency:any = 7

  response:boolean = false
  private agency: any = null
  private years:any = []
  async created() {
    this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
    this.years = await Core.getHttp(`/api/ita/v1/year/`)
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

<style>
.md\:w-74 {
  width: 26rem;
}

.f-white {
  color: white;
}
</style>
