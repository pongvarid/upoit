<template>
<div class="relative md:pt-32 pb-32 pt-12  ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  " v-if="response">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800  ">
                    <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> Hi
                </h3>
            </div>

            <v-app>

                <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-transition">
                    <v-card class="" elevation="" max-width="">
                        <v-card-title primary-title>
                            เลือกหน่วยงานที่ต้องการประเมิน
                        </v-card-title>
                        <v-card-text>
                            <v-main>
                                <v-autocomplete v-model="chooseAgencyType" :items="agencyType" item-text="name" item-value="id" filled label="ประเภทหน่วยงาน"></v-autocomplete>
                                <v-autocomplete v-model="chooseAgency" :items="agencies" item-text="name" item-value="id" filled label="หน่วยงาน"></v-autocomplete>
                            </v-main>
                        </v-card-text>
                        <v-card-actions v-if="chooseAgency">
                            <v-btn @click="dialog = false" color="">
                                ยืนยัน
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                {{resultAll.length}}
                <v-stepper v-model="e1" v-if="chooseAgency">
                    <v-stepper-header style=" overflow-x: scroll; overflow-y:hidden;  display:flex; flex-wrap: nowrap; padding:4px;">
                        <v-stepper-step :complete="e1 > tab.order" :step="tab.order" v-for="tab,i in data" :key="i">
                            <span class="font-bold" style="font-size:16px;"> {{tab.name}}</span>
                        </v-stepper-step>

                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content :step="tab.order" v-for="tab,i in data" :key="i">
                            <v-card class="mb-12" flat>
                                <h3 class="text-xl font-bold bg-green">{{ tmp}} / {{tab.issueCount}}</h3>
                                <div v-for="issue,index in tab.issue">
                                    <h2>
                                        <v-avatar color="teal" size="36">
                                            <span class="white--text headline">i{{issue.order}} </span>
                                        </v-avatar> &nbsp;{{issue.name}}
                                    </h2>

                                    <div v-for="ans,j in issue.issueDetail"> <br>
                                        <h3 class="font-bold"> {{ans.sub_name}}</h3>
                                        <div v-if="ans.choice">
                                            <div v-if="ans.choice.resourcetype === 'Ascend'">
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`)" :class="$input">
                                                    <option :value="null">เลือกคำตอบ</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.notting,'value_by':'notting', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">น้อยที่สุดหรือไม่มีเลย</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.low,'value_by':'low', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">น้อย</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.very,'value_by':'very', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">มาก</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.many,'value_by':'many', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">มากที่สุด</option>
                                                </select>
                                            </div>
                                            <div v-else-if="ans.choice.resourcetype === 'Exist'">
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`)" :class="$input">
                                                    <option :value="null">เลือกคำตอบ</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.notting,'value_by':'nohave', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">มี</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.have,'value_by':'have', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">ไม่มี</option>
                                                </select>

                                            </div>
                                            <div v-else>
                                                <v-textarea v-model="suggestion" placeholder="ระบุข้อความ" error-count="255" label="ข้อเสนอแนะ"></v-textarea>
                                            </div>
                                        </div>

                                        <!-- <pre>{{ans.choice}}</pre> -->
                                    </div>
                                    <br><br>
                                    <hr class="divide-pink-900"><br>
                                </div>

                            </v-card>
                            <v-btn @click="show">
                                ss
                            </v-btn>

                            <v-btn color="primary" v-if=" tmp >= tab.issueCount" @click="(e1 = (tab.order+1)) && (tmp =0)">
                                Continue
                            </v-btn>
                            <v-btn v-if="resultAll.length == 15" @click="saveAnswer()">
                                save
                            </v-btn>

                            <v-btn text v-if="i != 0" @click="e1 = (tab.order-1)">
                                Cancel
                            </v-btn>
                        </v-stepper-content>

                    </v-stepper-items>
                </v-stepper>
            </v-app>

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
import _ from "lodash"
import test from '@/assets/test.json'
@Component({
    components: {
        CardStats
    },
})
export default class Home extends Vue {
    private dashboard: any = null
    private user: any = {}
    private years: any = 0
    private data: any = null

    private e1: number = 1
    private response: boolean = false
    private suggestion: string = ''
    private answer: any = [];
    private ansIndex: number = 0;
    private resultAll: any = [];
    private tmp: any = 0
    private agencies: any = []
    private agencyType: any = []
    private chooseAgencyType: number | null = null
    private chooseAgency: number | null = null
    private dialog: boolean = true
    @Watch('chooseAgencyType')
    private async chnageChooseAgencyType(val: number) {
        this.agencies = await Core.getHttp(`/api/ita/v2/agencys/?agency_type=${val}`)
    }

    private async addValue(val: any) {
        let e: any = document.getElementById(val);
        let value: any = e.options[e.selectedIndex].value;
        let text: any = e.options[e.selectedIndex].text;
        this.answer.push(JSON.parse(value))
        this.answer = _.uniqBy(_.reverse(this.answer), function (e: any) {
            return e.id;
        });

        this.tmp++
        // console.log(this.answer);
        await this.show()

    }

    private async show() {
        let xx: any = this.answer;
        xx = await _.chain(xx)
            .groupBy('group')
            .map((value: any, key: any) => ({ group: key, value: value }))
            .value();
        this.resultAll = xx
        console.log(xx)
    }

    private async saveAnswer() {
        for (let index = 0; index < this.answer.length; index++) {
            let form = {
                "value": this.answer[index].value,
                "value_type": this.answer[index].value_type,
                "value_by": this.answer[index].value_by,
                "user": this.user.pk,
                "assessmentIssues": this.answer[index].assessment,
                "agency": this.chooseAgency,
                "year": this.years,
                "issue": this.answer[index].group,
                "issueDetail": this.answer[index].id
            }
            await Core.postHttp(`/api/eit/v2/answerissueeit/`, form)
        }
        await Core.postHttp(`/api/eit/v2/answersuggestioneit/`, {
            "suggestion": this.suggestion,
            "user": this.user.pk,
            "agency": this.chooseAgency,
            "year": this.years,
        })
    }

    public async created() {
        //  await this.show();
        this.agencyType = await Core.getHttp(`/api/ita/v1/agencytype/`)

        this.user = await User.getUser();
        this.years = this.$route.query.year
        this.data = await Core.getHttp(`/api/eit/v1/issue?year=${this.years}`)
        this.response = true
    }

    async sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
</script>
