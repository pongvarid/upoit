<template>
<div class="relative md:pt-32 pb-32 pt-12  "  style="z-index:1;" >
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 " v-if="response">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800">
                    <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> ผลการประเมิน IIT
                </h3>
                <!--            <hr class="border-gray-600 border-1 mt-2">-->
            </div>
            <div>
                <section class="py-8 px-4">
                    <div class="flex flex-wrap -mx-4">
                        <div class="w-full lg:w-1/4 px-4 mb-4 lg:mb-0">
                            <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-blue-600 ">
                                <div class="flex items-center justify-between py-3 px-4 border-b bg-blue-600 rounded-t-xl ">
                                    <h3 class="text-lg   font-heading text-white">หน่วยงาน</h3>
                                </div>
                                <div class="flex flex-col p-4">
                                    <h3 class="text-xl mb-3 font-semibold font-heading font-semibold">{{agency.name}}</h3>

                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/4 px-4 mb-4 lg:mb-0">
                            <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-yellow-600">
                                <div class="flex items-center justify-between px-4 py-3 border-b bg-yellow-600 rounded-t-xl">
                                    <h3 class="text-lg font-semibold font-heading text-white">บุคคลากรภายใน</h3>
                                </div>
                                <div class="flex flex-col p-4">
                                    <h3 class="text-xl mb-3 font-semibold font-heading font-semibold">{{agency.count}} คน</h3> 
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/4 px-4 mb-4 lg:mb-0">
                            <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-purple-600">
                                <div class="flex items-center justify-between px-4 py-3 border-b bg-purple-600 rounded-t-xl">
                                    <h3 class="text-lg font-semibold font-heading text-white">บุคคลากรที่ประเมิน</h3>
                                </div>
                                <div class="flex flex-col p-4">
                                    <h3 class="text-xl mb-3 font-semibold font-heading font-semibold">{{userDone}} คน</h3>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/4 px-4 mb-4 lg:mb-0">
                            <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-green-600">
                                <div class="flex items-center justify-between px-4 py-3 border-b bg-green-600 rounded-t-xl">
                                    <h3 class="text-lg font-semibold font-heading text-white">ผลคะแนนรวม</h3>
                                </div>
                                <div class="flex flex-col p-4">
                                    <h3 class="text-xl mb-3 font-semibold font-heading font-semibold"> {{score30}} <span class="text-sm">(คิด 30%)</span></h3>
                                     
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <v-tabs v-model="assessmentTab" color="#5E2C73" slider-color="#5E2C73" class="shadow-lg border-4 rounded-xl">
                    <v-tab v-for="assessment,index in assessmentData" :key="index">
                        {{assessment.name}}
                    </v-tab>
                    <v-tab-item v-for="assessment,index in assessmentData" :key="index">
                        <div v-if="assessment.name != 'ข้อเสนอเเนะ'">

                            <!-- <pre v-if="issueData">{{issueData}}</pre> -->

                            <div v-for="issue,i_index in issueData" :key="i_index" class="p-2">

                                <v-card>
                                    <v-card-title class="bg-purple-x text-white shadow-xl">
                                        <h2 class="text-sm">{{issue.name}}</h2>
                                    </v-card-title>
                                    <v-card-text>

                                        <div class="flex flex-wrap overflow-hidden mt-6" v-for="data,issueIndex in issue.value" :key="issueIndex">

                                            <div class="w-full overflow-hidden  p-2" :class="(data.issue_type != 'ระดับ')?'lg:w-6/12 xl:w-6/12':'lg:w-2/12 xl:w-2/12'">
                                                {{data.name}}
                                            </div>

                                            <div class="w-full overflow-hidden lg:w-2/12 xl:w-2/12 p-2" v-if="data.issue_type == 'ระดับ'">
                                                <div v-if="data.notting">
                                                    น้อยที่สุด&nbsp;{{data.notting.percent}}%
                                                    <v-progress-linear striped height="5" color="#AF7AC5" :value="data.notting.percent" :buffer-value="100"></v-progress-linear>
                                                </div>
                                            </div>

                                            <div class="w-full overflow-hidden lg:w-2/12 xl:w-2/12 p-2" v-if="data.issue_type == 'ระดับ'">
                                                <div v-if="data.low">
                                                    น้อย&nbsp;{{data.low.percent}}%
                                                    <v-progress-linear striped height="5" color="#8E44AD" :value="data.low.percent" :buffer-value="100"></v-progress-linear>
                                                </div>
                                            </div>

                                            <div class="w-full overflow-hidden lg:w-2/12 xl:w-2/12 p-2" v-if="data.issue_type == 'ระดับ'">
                                                <div v-if="data.very">
                                                    มาก&nbsp;{{data.very.percent}}%
                                                    <v-progress-linear striped height="5" color="#7D3C98" :value="data.very.percent" :buffer-value="100"></v-progress-linear>
                                                </div>
                                            </div>

                                            <div class="w-full overflow-hidden lg:w-2/12 xl:w-2/12 p-2" v-if="data.issue_type == 'ระดับ'">
                                                <div v-if="data.many">
                                                    มากที่สุด {{data.many.percent}}%
                                                    <v-progress-linear striped height="5" color="#5B2C6F" :value="data.many.percent" :buffer-value="100"></v-progress-linear>
                                                </div>
                                            </div>

                                            
                                              <div class="w-full overflow-hidden lg:w-2/12 xl:w-2/12 p-2" v-if="data.issue_type != 'ระดับ'">
                                                <div v-if="data.have">
                                                    ไม่มี&nbsp;{{data.nohave.percent}}%
                                                    <v-progress-linear striped height="5" color="#A763C3" :value="data.nohave.percent" :buffer-value="100"></v-progress-linear>
                                                </div>
                                            </div>
                                            <div class="w-full overflow-hidden lg:w-2/12 xl:w-2/12 p-2" v-if="data.issue_type != 'ระดับ'">
                                                <div v-if="data.have">
                                                    มี&nbsp;{{data.have.percent}}%
                                                    <v-progress-linear striped height="5" color="#7D3C98" :value="data.have.percent" :buffer-value="100"></v-progress-linear>
                                                </div>
                                            </div>
                                          

                                            <div class="w-full overflow-hidden lg:w-2/12 xl:w-2/12 p-2">
                                                <div v-if="data.avg">

                                                    <h2>คะแนน&nbsp;{{toFixed2(data.avg)}}</h2>
                                                    <v-progress-linear striped height="5" color="#1E8449" :value="data.avg" :buffer-value="100"></v-progress-linear>
                                                </div>
                                            </div>

                                        </div>

                                    </v-card-text>
                                    <v-card-actions class="bg-gray-x">
                                        <v-layout flex justify-end  style="background:transparent; height:28px;" color="transparent" flat>
                                            <h2 class="text-green-600  text-xl font-bold">รวม {{sumScore(issue.value)}} <span class="text-sm">คะแนน</span></h2>
                                        </v-layout>
                                    </v-card-actions>
                                </v-card>
                                <!-- <pre>{{issue}}</pre>
                                <h2>-------------------------------------------------------------------------------------------------------</h2> -->
                            </div>

                        </div>
                        <div v-else>

                        </div>
                    </v-tab-item>

                </v-tabs>
            </div>

        </div>

    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch
} from 'vue-property-decorator';
import CardStats from "@/components/Cards/CardStatWithBtn.vue";

import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
import {
    Iit
} from '@/store/iit'
import _ from "lodash"

@Component({
    components: {
        CardStats
    },
})
export default class Home extends Vue {

    private user!: any;
    private yearData!: any;
    private agency: any = null

    private assessmentTab: number = 0
    private assessmentData!: any;

    private issueRaw: any = [];
    private issueData: any = null;
    private response: boolean = false;

    private userDone: number = 0
    private scoreAll : any = []
    private score100 :number = 0
    private score30 :number = 0

    public async created() {
        await this.run();
        await this.getAssessment();
        await this.getUserAnswer()
        await this.generateScore();
        await this.getAverage();
        this.response = true
    }

    private async run() {
        this.user = await User.getUser();
        this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.$route.query.agency}/`)
        this.yearData = await Core.getHttp(`/api/iit/v2/year/${this.$route.query.year}/`)
        
    }

    private async getAssessment() {
        this.assessmentData = await Core.getHttp(`/api/iit/v2/assessmentissues/?&year=${this.yearData.id}`)
        this.assessmentTab = 0
        await this.getRawIssue(this.assessmentData[0].id)
    }

    private async getUserAnswer() {
        let user = await Core.groupBy(this.issueRaw, 'user')
        this.userDone = user.length
    }

    @Watch('assessmentTab')
    private async switchTab(newIndex: number, oldIndex: number) {
        let assessmentData = this.assessmentData[newIndex]
        //console.log(newIndex, assessmentData.id)
        await this.getRawIssue(assessmentData.id)
    }

    private async getRawIssue(assignId: number) {
        this.issueRaw = await Core.getHttp(`/api/iit/v2/answerissue-report/?agency=${this.$route.query.agency}&assessmentIssues=${assignId}`)
    }

    private async generateScore() {
        if(this.issueRaw.length > 0){
        let issueGroup = await Iit.groupIssueRaw(this.issueRaw, this.userDone, this.agency.count);
        this.issueData = issueGroup
        }
      
    }
    toFixed2(num:number){
        return num.toFixed(2);
    }
    sumScore(arr:any){
        //console.log(arr);
        let numberArr = arr.length;
        let sumAvg =  _.sumBy(arr, 'avg');  
        let score = (sumAvg / arr.length); 
        return score.toFixed(2);
    }




    async getAverage(){
        let count = 0;
        let sumOutAvg = 0;
        let choice = 0;
        for (let i=0; i < this.assessmentData.length ; i++){
            let raw = await Core.getHttp(`/api/iit/v2/answerissue-report/?agency=${this.$route.query.agency}&assessmentIssues=${this.assessmentData[i].id}`)
            let issueGroup = await Iit.groupIssueRaw(raw, this.userDone, this.agency.count);
            for(let j=0; j < issueGroup.length; j++){
               let sumAvg =  this.sumScore(issueGroup[j].value)  
               sumOutAvg += Number(sumAvg)
               choice++;
              
            }
           
        }
        this.score100 = Number((sumOutAvg/choice).toFixed(2))
        this.score30 =  Number(((sumOutAvg/choice)*0.3).toFixed(2))
        if(isNaN(this.score30)  ){
            this.score30 = 0.00
        }
     
    }

}
</script>

 
