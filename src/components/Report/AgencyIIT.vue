<template>
  <div class="md:pt-6 pb-32 pt-44" v-if="response">

    <v-toolbar>
    <h2 class="text-xs md:text-xl font-bold">ผลการประเมิน IIT ({{agency.name}})</h2>

      <v-spacer></v-spacer>
      <v-icon>mdi-calendar</v-icon>
      {{year}}
       <ExportIIT class="ml-2" :data="issues" />
    </v-toolbar>
    <div class="flex flex-col md:flex-row mt-4">
      <bin-card class="md:m-2 w-full md:w-1/4"  c="#8A2BE2" i="mdi-account-group" t="บุคลากรที่ประเมิน" :h="`${allUser}`" />
      <bin-card class="mt-2 md:mt-0 md:m-2 w-full md:w-1/4"  c="#ff8040" i="mdi-scoreboard" t="ผลคะแนนรวม (100%)" :h="score" />
      <bin-card class="mt-2 md:mt-0 md:m-2 w-full md:w-1/4"  c="#1088B2" i="30%" t="ผลคะแนนรวม (30%)" :h="score30" />
      <bin-card class="mt-2 md:mt-0 md:m-2 w-full md:w-1/4"  :c="(result == 'ผ่านการประเมิน')?'#16B77D':'#FF5733'" i="mdi-newspaper-variant-multiple-outline" t="ผลการประเมิน" :h="result" />
    </div>

    <div class="mt-6">

      <div class="flex flex-col md:flex-row justify-center items-center">
        <v-btn large :color="(chooseAssignId == assign.id)?`info`:`primary`" @click="chooseAssignId = assign.id" class="m-2 w-full md:w-auto"
               v-for="(assign,i) in assignments" :key="i" v-if="(assign.name !='ข้อเสนอแนะ') && assign.name !='ข้อเสนอเเนะ'">{{assign.name}}</v-btn>
      </div>



      <v-card v-for="(issue,i) in issues" class="m-3"
              :key="i"  v-if="issue.assessment == chooseAssignId"  >
        <v-card-title class="bg-purple-x text-white shadow-xl">
          <h2 class="text-sm"><span class="font-bold">(i{{issue.order}})</span> {{issue.name}}</h2>

        </v-card-title>
        <v-card-text>

          <div class="flex" v-for="(data,j) in issue.choice_type" :key="j">
            <div class="w-full flex">
              <div class="w-1/6 p-2 pt-6">
                <h2 class="font-bold"><span class="mr-2">({{(data.choice.type == 1)?'+':'-'}})</span>{{data.sub_name}} </h2>

              </div>
              <div class="w-5/6 flex flex-col md:flex-row">
                <div class="w-full md:w-3/12 p-2" v-for="(score,index_data) in data.data" :key="index_data" v-if="score.choice == data.choice.name">
                  <v-toolbar dense flat color="transparent">
                    <h2>{{score.value}}</h2>
                    <v-spacer></v-spacer>
                    <span class="font-bold">{{score.user_percent}} %</span>
                  </v-toolbar>
                  <v-progress-linear striped height="5" color="#AF7AC5" :value="score.user_percent" :buffer-value="100"></v-progress-linear>

                </div>

                <div class="w-full md:w-3/12 p-2" >
                  <v-toolbar dense flat color="transparent">
                    <h2>คะแนนรวม</h2>
                    <v-spacer></v-spacer>
                    <span class="font-bold">{{data.score_result}} %</span>
                  </v-toolbar>
                  <v-progress-linear striped height="5" color="#32CD32" :value="data.score_result" :buffer-value="100"></v-progress-linear>

                </div>
              </div>
            </div>
          </div>

        </v-card-text>
        <v-card-actions class="bg-gray-x">
          <v-layout flex justify-end  style="background:transparent; height:28px;" color="transparent" flat>
            <h2 class="text-green-600  text-xl font-bold">รวม  {{issue.score}}&nbsp;<span class="text-sm">คะแนน</span></h2>
          </v-layout>
        </v-card-actions>
      </v-card>

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
import ExportIIT from './ExportIIT.vue'

@Component({
  components: {
    Navbar,
    Loading,
    ExportIIT
  },
  computed: {}
})

export default class TestDevClass extends Vue {
  @Prop({default:7})
  agencyData:any;

  @Prop({default:'2563'})
  yearData:any ;

  agency:any = null
  assignments:any = null


  year:any = null;
  issues:any = [];
  response:boolean  = false;
  score:any = ''
  score30:number = 0
  chooseAssignId:number = 1;
  allUser:number = 0;
  allAgency:number = 0;
  result:any = ''

  async getIssue(){
    let years =  await Core.getHttp(`/api/iit/v1/year`)
    let thisYear = _.find(years,{year:this.yearData}) 
    this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.agencyData}/`)
    let raw = await Core.getHttp(`/api/report/v1/reportrawiit/?agency=${this.agencyData}&year=${this.yearData}`)
    if(raw.length > 0){
      let data = raw[0]
      this.allUser = data.user_do
      this.allAgency = data.user_set
      this.assignments = _.filter(JSON.parse(data.rawType),{year:thisYear.id})
      this.year = data.year
      this.chooseAssignId = (this.assignments[0])?this.assignments[0].id:1
      this.issues  = JSON.parse(data.rawDone)
      this.score = data.score
      this.score30 = data.score30
      this.result = data.result
      this.response = true;
    }

    console.log(this.issues );
  }



  async created(){
    await Web.switchLoad(true)

      await this.getIssue();

      await Web.switchLoad(false)




  }









}
</script>

