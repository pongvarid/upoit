<template>
  <div class="md:pt-24 pb-32 pt-44" v-if="response">
<v-btn @click="genReport()">GenReport</v-btn>


    <h2>{{data}}</h2><h2>{{agency.length}}</h2>
    <v-progress-linear striped height="10" color="#32CD32" :value="data" :buffer-value="agency.length"></v-progress-linear>



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

  agency:any = null
  assignments:any = null
  year:any = null;
  issues:any = [];
  response:boolean  = false;
  score:any = ''
  score30:number = 0
  chooseAssignId:number = 1;
  allUser:number = 0;
  data:number = 0;

  results:any = [];
  num:number = 0;











  async getIssueIIT(year:number,agency:number){
    this.assignments = await Core.getHttp(`/api/iit/v2/assessmentissues/?year=${year}`)
    this.issues = await CoreResult.getIssueIIT(year,agency)
    this.score = await CoreResult.getScrollAll();
    this.score30 = await CoreResult.getScoreEIT();

    for (let i =0; i< this.assignments.length; i++){
      if(this.assignments[i].order != 6){
        let data = await _.filter(this.issues,{assessment:this.assignments[i].id})
        let score = await _.sumBy(data,function(res:any) { return res.score; }) / data.length
        let result  = {
          "year": "2564",
          "name": this.assignments[i].name,
          "score": Number(score.toFixed(2)) ,
          "order": ++this.num,
          "agency": agency
        }
        this.results.push(result)
       await Core.postHttp(`/api/report/v1/reportdetail/`,result)
      }
    }

    let data = await _.filter(this.issues,function(data:any) { return data.name != "ข้อเสนอแนะ"; })
    let all = await _.sumBy(data,function(data:any) { return data.score; })
    let score:any = Number((all/(data).length).toFixed(2))
    let result = (score*0.3).toFixed(2)
    console.log(result);

    return result

  }

  async getIssueEit(year:number,agency:number){
    let assignments = await Core.getHttp(`/api/eit/v2/assessmentissues/?year=${year}`)
    let issues = await CoreResult.getIssueEIT(year,agency)
    for (let i =0; i< assignments.length; i++){
      if(assignments[i].order != 4){
        let data = await _.filter(issues,{assessment:assignments[i].id})
        let score = await (_.sumBy(data,function(res:any) { return res.score; }) ) / data.length
        let num = this.results.length;
        let result  = {
          "year": "2564",
          "name": assignments[i].name,
          "score": Number(score.toFixed(2)) ,
          "order": ++this.num,
          "agency": agency
        }
        this.results.push(result)

       await Core.postHttp(`/api/report/v1/reportdetail/`,result)

      }
    }
    let data = await _.filter(issues,function(data:any) { return data.name != "ข้อเสนอแนะ"; })
    let all = await _.sumBy(data,function(data:any) { return data.score; })
    let score:any = Number((all/(data).length).toFixed(2))
    let result = (score*0.3).toFixed(2)
    console.log(result);

    return result

  }


  async getOIT(year:number,agency:number){
    let rates = await Core.getHttp(`/api/oit/v1/evaluateoit/?agency=${agency}&rate__year=${year}`)
    let rates_data = await _.filter(rates,{"rate_status": 1})
    if(rates.length ==43 && rates_data.length == 0){
      let score:any = (await _.sumBy(rates,function(res:any) { return res.score; }))/43
      score = Number((score*100).toFixed(2))
     // console.log(rates.length,score);
      let num = this.results.length;
      let result  = {
        "year": "2564",
        "name": 'การป้องกันการทุจริต ',
        "score": Number(score.toFixed(2)) ,
        "order": ++this.num,
        "agency": agency
      }
      this.results.push(result)
      await Core.postHttp(`/api/report/v1/reportdetail/`,result)

    let yscore = Number((score*0.4).toFixed(2))
      console.log('sssss',yscore);
      return yscore

    }else{
      return 0
    }



  }





  async created(){
    this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
    //await this.getOIT(3,85);
    //for(let i=0 ; i<this.agency.length;i++){
   //  let agency = this.agency[i].id
   //  await this.getIssueIIT(2,agency);
   //   await this.getIssueEit(2,agency);
   //  await this.getOIT(3,85);

    // this.results = []
  //  if(i==2)break;
 //  }



    this.response = true;

  }

  async genReport(){

    let agency = 7
    for (let i=0; i< this.agency.length; i++){
      agency = this.agency[i].id;
      let iit = await this.getIssueIIT(2,agency);
      let eit = await this.getIssueEit(2,agency);
      let oit = await this.getOIT(3,agency);

      let result = Number(oit)+Number(iit)+Number(eit)
      let data = {
        "year": "2564",
        "iit": Number(iit),
        "eit": Number(eit),
        "oit": Number(oit),
        "all": result,
        "rate": this.getRate(result),
        "agency": agency
      }

      await Core.postHttp(`/api/report/v1/reportall/`,data)
      this.num = 0;
      this.data++;
    //  break;
    }

  }

  getRate(rate:any){
    if(this.inRange(rate,0,50) ){
      return 'F'
    }else if(this.inRange(rate,50,65) ){
      return 'D'
    }else if(this.inRange(rate,65,75) ){
      return 'C'
    }else if(this.inRange(rate,75,85) ){
      return 'B'
    }else if(this.inRange(rate,85,100) ){
      return 'A'
    }else{
      return 'F'
    }
  }

  inRange(x:number, min:number, max:number) {
    return ((x-min)*(x-max) <= 0);
  }

  async getUserDone(){

    let user = await Core.getHttp(`/api/eit/v2/answersuggestioneit/?year=${this.year.id}&agency=${this.agency.id}`)
    this.allUser = user.length
  }

  async onExport() {
    const dataWS = XLSX.utils.json_to_sheet(this.issues)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, dataWS)
    XLSX.writeFile(wb,'export.xlsx')
  }


  async storeReport(){
   // for (let i=0;)
   // await Core.postHttp(`/api/report/v1/reportdetail/`,data)
  }



}
</script>

