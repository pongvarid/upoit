<template>
<div class="relative md:pt-32 pb-32 pt-12  ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6   " v-if="response">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800  ">
                    <v-icon>mdi-newspaper</v-icon> แบบประเมิน IIT
                </h3>
            </div>

            <v-app class="rounded-lg shadow-xl">
                <!-- {{resultAll.length}} -->
                <v-stepper v-model="e1">
                    <v-stepper-header style=" overflow-x: scroll; overflow-y:hidden;  display:flex; flex-wrap: nowrap; padding:6px;">
                        <v-stepper-step :complete="e1 > tab.order" :step="tab.order" v-for="tab,i in data" :key="i">
                            <span class="font-bold" style="font-size:14px;"> {{tab.name}}</span>
                        </v-stepper-step>

                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content :step="tab.order" v-for="tab,i in data" :key="i">
                            <v-card class="mb-12 " flat>
                                <div class="flex w-full">
                                    <h2 class="w-2/12">{{ tmp}} / {{tab.issueCount}}</h2>  
                                </div> 
  
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
                                                <!-- <v-alert>{{index}},{{j}}</v-alert> -->
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`,index,j)" :class="`${$input} `">
                                                    <option :value="null">เลือกคำตอบ</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.notting,'value_by':'น้อยที่สุดหรือไม่มีเลย', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">น้อยที่สุดหรือไม่มีเลย</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.low, 'value_by':'น้อย', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">น้อย</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.very, 'value_by':'มาก', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">มาก</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.many, 'value_by':'มากที่สุด', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">มากที่สุด</option>
                                                </select>
                                            </div>
                                            <div v-else-if="ans.choice.resourcetype === 'Exist'">
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`,index,j)" :class="$input">
                                                    <option :value="null">เลือกคำตอบ</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.notting, 'value_by':'มี', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">มี</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.have,'value_by':'ไม่มี', 'value_type':ans.choice.id ,  id:ans.id , group:issue.id, assessment:tab.id  })">ไม่มี</option>
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
                                <v-card-actions>
                                    <v-btn v-if=" tmp >= tab.issueCount && i < data.length" color="primary" @click="toTop() && (e1 = (tab.order+1)) && (tmp =0)  ">
                                        ดำเนินการต่อ
                                    </v-btn>
                                    <v-btn v-if="tab.name == 'ข้อเสนอเเนะ'" color="success" x-large @click="saveAnswer()">
                                        บันทึกข้อมูลการประเมิน
                                    </v-btn>
 
                                </v-card-actions>
                            </v-card>

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
    Vue, Watch
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
    

    private tmpChoice :any =[];

    private async addValue(val: any,indexIssue: number,index:number) {
        let checkNotNull = await this.tmpStore(indexIssue,index)
        console.log(checkNotNull);
        let e: any = document.getElementById(val);
        let value: any = e.options[e.selectedIndex].value;
        let text: any = e.options[e.selectedIndex].text;
        this.answer.push(JSON.parse(value))
        this.answer = _.uniqBy(_.reverse(this.answer), function (e: any) {
            return e.id;
        }); 
        if(checkNotNull){
            this.tmp++
        }
         
        await this.show() 
    }
    
    private async tmpStore(indexIssue:number, index: number){ 
        if(!_.find(this.tmpChoice,{"index":index,"indexIssue":indexIssue})) {
            this.tmpChoice.push({"indexIssue":indexIssue,"index":index});
            return true
        }else{
            return false
        } 
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
                "agency": this.user.ext_link.agency,
                "year": this.years,
                "issue": this.answer[index].group,
                "issueDetail": this.answer[index].id
            }
            await Core.postHttp(`/api/iit/v2/answerissue/`, form)
        }
        await Core.postHttp(`/api/iit/v2/answersuggestion/`, {
            "suggestion": this.suggestion,
            "user": this.user.pk,
            "agency": this.user.ext_link.agency,
            "year": this.years,
        })
        await this.storeUserInAnswer();
    }

    @Watch('e1')
    changeTab(value: any, oldValue: any) {
        while(this.tmpChoice .length > 0) {
                 this.tmpChoice .pop();
        } 
    }

    public async created() {
        //  await this.show();
        this.user = await User.getUser();
        this.years = this.$route.query.year
        this.data = await Core.getHttp(`/api/iit/v1/issue?year=${this.years}`)
        this.response = true
    }

    async sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async toTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    async storeUserInAnswer(){
        let form = {
                "user": this.user.pk,
                "agency": this.user.ext_link.agency,
                "year": this.years
            }
        await Core.postHttp(`/api/iit/v2/ansewer/user/`,form)
    }

}
</script>
