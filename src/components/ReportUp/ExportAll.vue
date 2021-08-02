<template>
  <div class="" v-if="response">
      <h2><b>คะแนนภาพรวมหน่วยงานภายในมหาวิทยาลัยพะเยา</b> :  {{base}} คะแนน</h2> 
      <h2><b>ระดับผลการประเมิน </b> :  {{rate}} </h2> 
        <center><apexchart type="radar" height="450px" :options="chartOptions" :series="series"></apexchart></center>
        <h2><b>ภาพรวมคะแนนรายตัวชี้วัด</b></h2><br>
     <bin-card2 class="m-2 " v-for="(r,i) in raw" :key="i"  c="purple" :i="r.order" :t="r.value" :h="r.score" /> 
     <br>
     <h2><b>ข้อเสนอแนะ/หมายเหตุ</b></h2>
     <v-textarea outlined></v-textarea>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Core/Navbar.vue";
import Loading from "@/components/Web/Loading.vue";
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Web } from "@/store/web";
import { Component, Vue, Watch,Prop } from "vue-property-decorator";
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
  @Prop({default:''})
  year:any

  report:any = ''
  response:boolean = false;
  rawDetail:any = [];
  rawBase:any = [];
  raw:any = []
  base:any = 0;
  rate:string = '';
  series: any = [{
    name: 'คะแนน',
    data: [],
  }]
  chartOptions: any = {
    chart: {
      height: 350,
      type: 'radar',
    },
    title: {},
    xaxis: {
      categories:[]
    }
  }

  async created(){
    await this.loadEnv();
    //await this.genReport()
  }

  async loadEnv(){
    this.rawDetail = await Core.getHttp(`/api/report/v1/reportdetail/?year=${this.year}`)
    this.rawDetail = await _.filter(this.rawDetail , (a:any)=> {return a.agency != 98 && a.agency != 99})
    this.rawBase = await Core.getHttp(`/api/report/v1/reportall/?year=${this.year}`)
    this.rawBase = await _.filter(this.rawBase , (a:any)=> {return a.agency != 98 && a.agency != 99})
    await this.groupByDetail()
    await this.groupBase();
    await this.generateGraph();
    this.response = true;
  }
  async groupBase(){
    let base = await _.meanBy(this.rawBase ,(r:any)=>{return r.all})
    this.base = Number(base.toFixed(2))
    this.rate = this.getRate(base)

  }
  async groupByDetail(){
    let group:any =  await _.chain(this.rawDetail)
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
        .groupBy("name")
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

  async generateGraph(){


    let categories = _.map(this.raw, 'value');
    let score = _.map(this.raw, 'score');
    console.log(this.raw);
    this.series[0].data = score
    this.chartOptions.xaxis.categories = categories


  }
  inRange(x:number, min:number, max:number) {
    return ((x-min)*(x-max) <= 0);
  }

  async onExport(data:any,name:any) {
    const dataWS = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, dataWS)
    XLSX.writeFile(wb,name)
  }
}
</script>

