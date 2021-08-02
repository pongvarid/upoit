<template>
<div class=" " v-if="response">

    <v-toolbar>
        <h2 class="text-xl font-bold">ผลการประเมิน IIT </h2>

    

    </v-toolbar>
    <div class="flex mt-4">
        <bin-card class="m-2" c="#8A2BE2" i="mdi-account-group" t="บุคลากร (ที่ประเมิน/ทั้งหมด)" :h="`${allUser}/${allAgency}`" />
        <bin-card class="m-2" c="#ff8040" i="mdi-scoreboard" t="ผลคะแนนรวม (100%)" :h="score" />
        <bin-card class="m-2" c="#1088B2" i="30%" t="ผลคะแนนรวม (30%)" :h="score30" />
        <bin-card class="m-2" :c="(score >= 79)?'#16B77D':'#FF5733'" i="mdi-newspaper-variant-multiple-outline" t="ผลการประเมิน" :h="result" />
    </div>

    <div class="mt-6">
 

        <div v-for="(issue,i) in issues" class="m-3" :key="i">
            <v-card v-if="issue.assessment != 9" > 
                <v-card-title class="bg-purple-x text-white shadow-xl">

                    <h2 class="text-sm"><span class="font-bold">(i{{issue.order}})</span> {{issue.name}}</h2>

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

                                <div class="w-3/12 p-2">
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
                    <v-layout flex justify-end style="background:transparent; height:28px;" color="transparent" flat>
                        <h2 class="text-green-600  text-xl font-bold">รวม {{issue.score}}&nbsp;<span class="text-sm">คะแนน</span></h2>
                    </v-layout>
                </v-card-actions>
            </v-card>
            <v-card v-else>
                <v-card-title class="bg-purple-x text-white shadow-xl" >
                   <h2 class="text-sm"><span class="font-bold">ข้อเสนอแนะ</span></h2>
                </v-card-title>
                <v-card-text>

                     <div v-for="(feedback,indexFeed) in feedbacks" :key="indexFeed" v-if="feedback.suggestion != ''"  >
                      <h2> - {{feedback.suggestion}}</h2>
                  </div>
                  
                </v-card-text>
                
              
            </v-card>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import _ from 'lodash'
import XLSX from 'xlsx' // import xlsx
import { Result } from '@/store/result'
import { CoreResult } from '@/store/core_result'
import { Report } from '@/store/report'

@Component({
    components: {
        Navbar,
        Loading,

    },
    computed: {}
})

export default class TestDevClass extends Vue {
    @Prop({ default: 7 })
    agencyData: any;

    @Prop({ default: '2563' })
    yearData: any;
    
    yearFull:any;

    agency: any = null
    assignments: any = null

    year: any = null;
    issues: any = [];
    response: boolean = false;
    score: any = ''
    score30: number = 0
    chooseAssignId: number = 1;
    allUser: number = 0;
    allAgency: number = 0;
    result: any = ''
    
    feedbacks:any = []


    async getIssue() {
        this.yearFull =  await Report.getYearIIT(this.yearData)
        this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.agencyData}/`)
        let raw = await Core.getHttp(`/api/report/v1/reportrawiit/?agency=${this.agencyData}&year=${this.yearData}`)
        if (raw.length > 0) {
            let data = raw[0]
            this.allUser = data.user_do
            this.allAgency = data.user_set
            this.assignments = JSON.parse(data.rawType)
            this.year = data.year
            this.chooseAssignId = 1
            this.issues = JSON.parse(data.rawDone)
            this.score = data.score
            this.score30 = data.score30
            this.result = data.result
            this.response = true;
        }
        console.log(raw)

         this.feedbacks  = await Core.getHttp(`/api/iit/v2/answersuggestion/?agency=${this.agencyData}&year=${this.yearFull.id}`)

        console.log(this.issues);
    }

    async created() {
        await Web.switchLoad(true)

        await this.getIssue();

        await Web.switchLoad(false)

    }

}
</script>
