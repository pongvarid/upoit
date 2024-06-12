<template>
  <div class="" v-if="response">
    <div class="flex flex-col md:flex-row">

      <div class="w-full md:w-1/2">
            <v-toolbar flat>
              
              <h2 class="text-2xl pl-4 font-bold">📝 ผลการประเมินภาพรวม </h2>

            </v-toolbar>
        <h2 class="pl-24 text-purple-600 font-bold">มหาวิทยาลัยพะเยา</h2>
 
        <apexchart type="radar" height="450px" :options="chartOptions" :series="series"></apexchart>
        <center>
          <span class="text-base">ระดับผลประเมิน</span> 
          <h2 class="text-6xl font-bold"> {{rate}}</h2>
          <h2 class="text-xl p-2 rounded-xl font-semibold underlined underline-clip" style="width:200px">คะแนน {{base}} </h2>
          <br> <br>
          <v-btn @click="onExport(raw,'มหาวิทยาลัยพะเยา.xlsx')">ส่งออกข้อมูล</v-btn>
        </center>
      </div>
      <div class="w-full md:w-1/2 mt-4">

        <h2 class="text-xl font-semibold">คะแนนรายตัวชี้วัด</h2>
        
               <bin-card2 class="m-2 " v-for="(r,i) in raw" :key="i"  c="purple" :i="i+1" :t="r.value" :h="r.score" />

<!--        <v-toolbar class="m-2 " v-for="(r,i) in raw" :key="raw">{{r.order}}. {{r.value}} <v-spacer></v-spacer> <span class="font-bold">{{r.score}}% </span></v-toolbar>-->
<!--    -->
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
y2565:any =  [
        {
            "order": "1",
            "value": "การปฏิบัติหน้าที่",
            "score": "92.82"
        },
        {
            "order": "2",
            "value": "การใช้งบประมาณ",
            "score": "86.53"
        },
        {
            "order": "3",
            "value": "การใช้อํานาจ",
            "score": "90.12"
        },
        {
            "order": "4",
            "value": "การใช้ทรัพย์สินของราชการ",
            "score": "86.43"
        },
        {
            "order": "5",
            "value": "การแก้ไขปัญหาการทุจริต",
            "score": "89.35"
        },
        {
            "order": "9",
            "value": "คุณภาพการดําเนินงาน",
            "score": "90.79"
        },
        {
            "order": "10",
            "value": "ประสิทธิภาพการสื่อสาร",
            "score": "89.4"
        },
        {
            "order": "11",
            "value": "การปรับปรุงระบบการทํางาน",
            "score": "88.53"
        },
        {
            "order": "12",
            "value": "การเปิดเผยข้อมูล",
            "score": "85.87"
        },
        {
            "order": "13",
            "value": "การป้องกันการทุจริต",
            "score": "79.62"
        }
    ]
base2565:any = 0
  report:any = ''
  response:boolean = false;
  rawDetail:any = [];
  rawBase:any = [];
  raw:any = []
  base:any = 0;
  rate:any = '';
  series: any = [{
    name: 'คะแนน',
    data: [],
  }]
  chartOptions: any = {
    chart: {
      height: '100%',
      type: 'radar',
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius:2,
      }
    },
    title: {},
    xaxis: {
       labels:{
         style:{fontSize:'14px'}
       },
      categories:[]
    },
   
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
    let newUP = 0;
    let detA = _.meanBy( _.filter(this.raw,(r:any,index:Number)=>{ return index >=0 && index<=4}),(r:any)=>{return Number(r.score)}) 
    let detB =  _.meanBy(_.filter(this.raw,(r:any,index:Number)=>{ return index >=5 && index<=7}),(r:any)=>{return Number(r.score)}) 
    let detC =_.meanBy( _.filter(this.raw,(r:any,index:Number)=>{ return index >=8 && index<=9}),(r:any)=>{return Number(r.score)}) 
    newUP =  ((detA*30)/100) + ((detB*30)/100) + ((detC*40)/100)   
 
    this.base = Number(newUP.toFixed(2))
    if(this.year < 2567){
      this.rate = this.getRate(base)
    }else{
      let iit = detA
      let eit = detB
      let oit = detC
      this.rate = this.$calculate(iit,eit,oit,this.base)
      console.log(this.rate);
    }


  }
  async groupByDetail(){
    let group:any =  await _.chain(this.rawDetail)
        .groupBy("name")
        // `key` is group's name (color), `value` is the array of objects
        .map( (value, key) => ({ value: key,order:value[0].order, score: Number( (_.meanBy(value,(e:any)=>{return e.score})).toFixed(2) ) }))
        .value()
    this.raw = group
    if(this.year == 2565){
      this.raw = this.y2565
    }
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

