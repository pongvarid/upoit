<template>
  <div class="md:pt-6 pb-32 pt-44" v-if="response">

    <v-toolbar>

      <h2 class="text-xl font-bold">ผลการประเมิน EIT ({{agency.name}})</h2>

      <v-spacer></v-spacer>
      <v-icon>mdi-calendar</v-icon>
      {{year.year}}
    </v-toolbar>
    <div class="flex mt-4">
      <bin-card class="m-2"  c="#8A2BE2" i="mdi-account-group" t="บุคลากร (ที่ประเมิน/ทั้งหมด)" :h="`${allUser}/${agency.eit}`" />
      <bin-card class="m-2"  c="#ff8040" i="mdi-scoreboard" t="ผลคะแนนรวม (100%)" :h="score" />
      <bin-card class="m-2"  c="#1088B2" i="30%" t="ผลคะแนนรวม (30%)" :h="score30" />
      <bin-card class="m-2"  :c="(score >= 79)?'#16B77D':'#FF5733'" i="mdi-newspaper-variant-multiple-outline" t="ผลการประเมิน" :h="(score >= 79)?'ผ่านการประเมิน':'ไม่ผ่านการประเมิน'" />
    </div>

    <div class="mt-6">

      <div class="flex justify-center items-center">
        <v-btn large :color="(chooseAssignId == assign.id)?`info`:`primary`" @click="chooseAssignId = assign.id" class="m-2"
               v-for="(assign,i) in assignments" :key="i" v-if="assign.id != 4">{{assign.name}}</v-btn>
      </div>


      <v-card v-for="(issue,i) in issues" class="m-3"
              :key="i"  v-if="issue.assessment == chooseAssignId"  >
        <v-card-title class="bg-purple-x text-white shadow-xl">
          <h2 class="text-sm"><span class="font-bold">(e{{issue.order}})</span> {{issue.name}}</h2>

        </v-card-title>
        <v-card-text>

          <div class="flex" v-for="(data,j) in issue.choice_type" :key="j">
            <div class="w-full flex">
              <div class="w-1/6 p-2 pt-6">
                <h2 class="font-bold"><span class="mr-2">({{(data.choice.type == 1)?'+':'-'}})</span>{{data.sub_name}} </h2>

              </div>
              <div class="w-5/6 flex">
                <div class="w-3/12 p-2" v-for="(score,index_data) in data.data" :key="index_data" v-if="score.choice == data.choice.name">
                  <v-toolbar dense flat color="transparent">
                    <h2>{{score.value}}</h2>
                    <v-spacer></v-spacer>
                    <span class="font-bold">{{score.user_percent}} %</span>
                  </v-toolbar>
                  <v-progress-linear striped height="5" color="#AF7AC5" :value="score.user_percent" :buffer-value="100"></v-progress-linear>

                </div>

                <div class="w-3/12 p-2" >
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
@Component({
  components: {
    Navbar,
    Loading,
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

  async getIssue(){
    this.assignments = await Core.getHttp(`/api/eit/v2/assessmentissues/?year=${this.year.id}`)
    this.chooseAssignId = this.assignments[0].id
    this.issues = await CoreResult.getIssueEIT(this.year.id,this.agency.id)
    this.score = await CoreResult.getScrollAll();
    this.score30 = await CoreResult.getScoreEIT();
    console.log(this.issues );
  }



  async created(){
    await Web.switchLoad(true)
    this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.agencyData}/`)
    this.year = await Core.getHttp(`/api/eit/v2/year/`)
    this.year = await _.find(this.year,{year:this.yearData})
    if(this.year ){
      await this.getIssue();
      await this.getUserDone();
      await Web.switchLoad(false)
      this.response = true;
    }
    await Web.switchLoad(false)
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





}
</script>

