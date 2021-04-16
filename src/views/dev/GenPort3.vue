<template>
  <div class="md:pt-24 pb-32 pt-44" v-if="response">
        <h2 class="text-2xl">ผลประเมินมหาวิทยาลัยพะเยา (Developer Preview)</h2>
      <v-select @change="loadEnv()" label="ปีงบประมาณ" :items="years" v-model="year"></v-select>

    <div class="flex flex-row">
  {{base}} {{rate}}
       <div class="w-1/2">

       </div>
      <div class="w-1/2">
        <v-btn @click="onExport(report,'มหาวิทยาลัยพะเยา.xlsx')">Export</v-btn>
        <v-toolbar v-for="(r,i) in raw" :key="raw">{{r.order}}. {{r.value}} <v-spacer></v-spacer> {{r.score}} </v-toolbar>
      </div>
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
import { Component, Vue, Watch } from "vue-property-decorator";
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
  report:any = ''
  response:boolean = false;
  rawDetail:any = [];
  rawBase:any = [];
  years:any = ['2564','2565','2566','2567','2568','2569','2570',]
  year:any = '2564'
  raw:any = []
  base:any = 0;
  rate:string = '';
  async created(){
      await this.loadEnv();
      await this.genReport()
  }

  async loadEnv(){ this.rawDetail
    this.rawDetail = await Core.getHttp(`/api/report/v1/reportdetail/?year=${this.year}`)
    this.rawDetail = await _.filter(this.rawDetail , (a:any)=> {return a.agency != 98 && a.agency != 99})
    this.rawBase = await Core.getHttp(`/api/report/v1/reportall/?year=${this.year}`)
    this.rawBase = await _.filter(this.rawBase , (a:any)=> {return a.agency != 98 && a.agency != 99})
    await this.groupByDetail()
    await this.groupBase();
    this.response = true;
  }
  async groupBase(){
    let base = await _.meanBy(this.rawBase ,(r:any)=>{return r.all})
    this.base = Number(base.toFixed(2))
    this.rate = this.getRate(base)

  }
  async groupByDetail(){
    let group:any =  await _.chain(this.rawDetail)
        // Group the elements of Array based on `color` property
        .groupBy("name")
        // `key` is group's name (color), `value` is the array of objects
        .map( (value, key) => ({ value: key,order:value[0].order, score: Number( (_.meanBy(value,(e:any)=>{return e.score})).toFixed(2) ) }))
        .value()
    this.raw = group
    console.log(group);
    let data =  await _.meanBy(group,(r:any)=>{return r.score})
    console.log(data)
  }
  async genReport(){
    let group:any =  await _.chain(this.rawDetail)
        // Group the elements of Array based on `color` property
        .groupBy("name")
        // `key` is group's name (color), `value` is the array of objects
        .map( (value, key) => ({ "ลำดับ":value[0].order,"หัวข้อ": key, "คะแนน": Number( (_.meanBy(value,(e:any)=>{return e.score})).toFixed(2) ) }))
        .value()
    this.report =group

    console.log(this.report);
    // console.log(group);
    let data =  await _.meanBy(group,(r:any)=>{return r.score})
    console.log(data)
  }
  getRate(rate:any){
    if(this.inRange(rate,0,49.99) ){
      return 'F'
    }else if(this.inRange(rate,50.00,54.99) ){
      return 'E'
    }else if(this.inRange(rate,55.00,64.99) ){
      return 'C'
    }else if(this.inRange(rate,65.00,74.99) ){
      return 'C'
    }else if(this.inRange(rate,75.00,84.99) ){
      return 'B'
    }else if(this.inRange(rate,85.00,94.99) ){
      return 'A'
    }else if(this.inRange(rate,95.00,100) ){
      return 'AA'
    }else{
      return 'ไม่ทราบค่า'
    }
  }
  inRange(x:number, min:number, max:number) {
    return ((x-min)*(x-max) <= 0);
  }

  async onExport(data:any, name:string) {
    let dataWS = XLSX.utils.json_to_sheet(data)

    let wb:any = XLSX.utils.book_new()
    console.log(dataWS);

    XLSX.utils.sheet_add_aoa(dataWS, [
      ["ปีงบประมาณ", this.year],
      ["คะแนนรวม", this.base],
      ["ผล", this.rate]
    ], {origin: -1})
    XLSX.utils.book_append_sheet(wb, dataWS)
    // XLSX.utils.book_append_sheet(wb, [1,2,3])
    XLSX.writeFile(wb,name)
  }

}
</script>

