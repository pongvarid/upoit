<template>
  <div class="md:pt-24 pb-32 pt-44" v-if="response">
    <h2 class="text-2xl">ผลประเมินมหาวิทยาลัยพะเยา (Developer Preview)</h2>
    <v-select @change="loadEnv()" label="ปีงบประมาณ" :items="years" v-model="year"></v-select>
    <v-btn @click="onExport(report,'ss.xlsx')">Export</v-btn>

<pre>{{report}}</pre>

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
  report:any = []
  response:boolean = false;
  rawDetail:any = [];
  rawBase:any = [];
  years:any = ['2564','2565','2566','2567','2568','2569','2570',]
  year:any = '2565'
  raw:any = []
  base:any = 0;
  rate:string = '';
  async created(){
    await this.loadEnv();
     await this.genReport()
  }

  async loadEnv(){ this.rawDetail
    this.rawDetail = await Core.getHttp(`/api/report/v1/reportdetail-all/?year=${this.year}`)
    this.rawDetail = await _.filter(this.rawDetail , (a:any)=> {return a.agency != 98 && a.agency != 99})
    this.rawBase = await Core.getHttp(`/api/report/v1/reportall-all/?year=${this.year}`)
    this.rawBase = await _.filter(this.rawBase , (a:any)=> {return a.agency != 98 && a.agency != 99})
    await this.groupByDetail()
    await this.groupBase();
    this.response = true;
  }
  async groupBase(){
    let base = await _.meanBy(this.rawBase ,(r:any)=>{return r.all})
    this.base = Number(base.toFixed(2))


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
    for (let i=0 ;i < this.rawDetail.length; i++){
      this.report.push({
        "ลำดับ": this.rawDetail[i].order,
        "หัวข้อ": this.rawDetail[i].name,
        "คะแนน": this.rawDetail[i].score,
        "หน่วยงาน":this.rawDetail[i].agency.name,
      })
    }
  }

  async onExport(data:any, name:string) {

   //let  dataWS = XLSX.utils.aoa_to_sheet([["ปีงบประมาณ", this.year]]);
    // let  dataWS:any =   XLSX.utils.json_to_sheet(data,{
    //   origin: 3,  // append to bottom of worksheet starting on first column
    // })
   
    // let wb:any = XLSX.utils.book_new()
    // console.log(dataWS);
   
    // XLSX.utils.sheet_add_aoa(dataWS, [
    //   ["ปีงบประมาณ", this.year,'',''],
    //   ["คะแนนรวม", this.base,'',''],
    //   ["ผล", this.rate,'','']
    // ], {origin: 0})
    // XLSX.utils.book_append_sheet(wb, dataWS)
    // // XLSX.utils.book_append_sheet(wb, [1,2,3])
    // XLSX.writeFile(wb,name)
  }



}
</script>

