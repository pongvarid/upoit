<template>
<div class="relative md:pt-32 pb-32 pt-12  ">
  

    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6   " v-if="response">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                    <bin-card3    c="rgb(51, 102, 204)" :t="`ปีงบประมาณ : ${year.year}`" h="แบบประเมินการรับรู้ของผู้มีส่วนได้ส่วนเสียภายใน" i="IIT"></bin-card3>
                
                
            </div>

            <v-app class="rounded-lg shadow-xl">
                <!-- {{resultAll.length}} -->
                <v-stepper v-model="e1">
                    <v-stepper-header style=" overflow-x: scroll; overflow-y:hidden;  display:flex; flex-wrap: nowrap; padding:6px;">
                        <v-stepper-step :complete="e1 > tab.order" :step="tab.order" v-for="tab,i in data" :key="i">
                            <span class="font-bold" style="font-size:14px;"> {{tab.name}}</span>
                        </v-stepper-step>

                    </v-stepper-header>
                    <v-progress-linear v-if="data.length > 0" style="width:100%;" striped height="10" color="#32a852" :value="(tmp*100)/data[e1-1].issueCount" :buffer-value="100"></v-progress-linear>
                    <v-stepper-items>

                        <v-stepper-content :step="tab.order" v-for="tab,i in data" :key="i">

                            <v-card class="mb-12 " flat>
                                <div class="flex w-full">
                                    <h2 class="w-2/12 text-white">{{ tmp}} / {{getDataLoad(tab.issueCount)}}</h2>

                                </div>

                                <div v-for="issue,index in tab.issue">
                                    <h2>
                                        <v-avatar color="teal" size="36">
                                            <span class="white--text headline">i{{issue.order}} </span>
                                        </v-avatar> &nbsp;
                                            <span v-html="issue.name"></span>
                                    </h2>

                                    <div v-for="ans,j in issue.issueDetail"> <br>
                                        <h3 class="font-bold" v-if="tab.name != 'ข้อเสนอเเนะ' || tab.name != 'ข้อเสนอแนะ'"> {{ans.sub_name}}</h3>
                                        <div v-if="ans.choice">
                                            <div v-if="ans.choice.resourcetype === 'Ascend'">
                                                <!-- <v-alert>{{index}},{{j}}</v-alert> -->
                                                <!-- {{ appSetting }} -->
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`,index,j)" :class="`${$input} `">
                                                    <option :value="null">เลือกคำตอบ</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.nottingest,'value_by':'น้อยที่สุดหรือไม่มีเลย', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">
                                                        {{ getChoice(issue.order, 0, "ไม่เป็นไปตามวัตถุประสงค์") }}
                                                    </option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.notting,'value_by':'น้อยมาก', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">
                                                        {{ getChoice(issue.order, 1, "เป็นไปตามวัตถุประสงค์ น้อยมาก") }}
                                                    </option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.low, 'value_by':'น้อย', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">
                                                        {{ getChoice(issue.order, 2, "เป็นไปตามวัตถุประสงค์ น้อย") }}
                                                    </option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.very, 'value_by':'มาก', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">
                                                        {{ getChoice(issue.order, 3, "เป็นไปตามวัตถุประสงค์ ค่อนข้างมาก") }}
                                                    </option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.many, 'value_by':'มากพอสมควร', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">
                                                        {{ getChoice(issue.order, 4, "เป็นไปตามวัตถุประสงค์ มาก") }}
                                                    </option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.manyest, 'value_by':'มากที่สุด', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">
                                                        {{ getChoice(issue.order, 5, "เป็นไปตามวัตถุประสงค์ มากที่สุด") }}
                                                    </option>

                                                </select>
                                            </div>
                                            <div v-else-if="ans.choice.resourcetype === 'Exist'">
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`,index,j)" :class="$input">
                                                    <option :value="null">เลือกคำตอบ</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.notting, 'value_by':'มี', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">
                                                        {{ getChoice(issue.order, 0, "มี") }}
                                                    </option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.have,'value_by':'ไม่มี', 'value_type':ans.choice.id ,  id:ans.id , group:issue.id, assessment:tab.id  })">
                                                        {{ getChoice(issue.order, 1, "ไม่มี") }}
                                                    </option>
                                                </select>

                                            </div>
                                            <div v-else>
                                                <v-textarea v-model="suggestion" placeholder="ระบุข้อความ" error-count="255" label=""></v-textarea>
                                            </div>
                                        </div>

                                        <!-- <pre>{{ans.choice}}</pre> -->
                                    </div>
                                    <br><br>
                                    <hr class="divide-pink-900"><br>
                                </div>
                                <v-card-actions>
                                    <v-progress-linear v-if="data.length > 0"  style="width:100%;" striped height="10" color="#32a852" :value="(tmp*100)/data[e1-1].issueCount" :buffer-value="100"></v-progress-linear>

                                    <v-btn x-large style="width:100%;" v-if=" tmp >= tab.issueCount && i < data.length" color="primary" @click="toTop() && (e1 = (tab.order+1)) && (tmp =0)  ">
                                        ดำเนินการต่อ
                                    </v-btn>
                                    <v-btn x-large style="width:100%;" v-if="tab.name == 'ข้อเสนอเเนะ'|| tab.name == 'ข้อเสนอแนะ'" color="success" @click="saveAnswer()">
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

    <vs-dialog blur v-model="nullData" not-close prevent-close>
        <template #header>
            <h4 class="not-margin text-red-600 font-bold text-xl">
                ไม่มีข้อมูลในระบบ
            </h4>
        </template>
        <div>
            <center> <i class="em em-writing_hand text-4xl" aria-role="presentation" aria-label=""></i> <i class="em em-x" aria-role="presentation" aria-label="CROSS MARK"></i>
            </center>
            <center>
                <span>ยังไม่มีข้อมูลแบบประเมินสำหรับปีงบประมาณนี้ <br>กรุณาติดต่อผู้ดูแลระบบ หรือ<br>กลับไปประเมิน ปีงบประมาณอื่น</span>
            </center>
        </div>

        <template #footer>
            <div class="footer-dialog">
                <vs-button block @click="$router.go(-1)">
                    กลับไปก่อนหน้า
                </vs-button>

            </div>
        </template>
    </vs-dialog>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch
} from 'vue-property-decorator';
 

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
import {
    Web
} from '@/store/web'
@Component({
    components: {
         
    },
})
export default class Home extends Vue {
    private dashboard: any = null
    private user: any = {}
    private years: any = 0
    private year:any = {}
    private data: any = null
    private nullData: boolean = false
    private loadNum: number = 1

    private e1: number = 1
    private response: boolean = false
    private suggestion: string = ''
    private answer: any = [];
    private ansIndex: number = 0;
    private resultAll: any = [];
    private tmp: any = 0
    appSetting: any = {}
   
    private tmpChoice: any = [];
    $vs: any
    private async addValue(val: any, indexIssue: number, index: number) {
        let e: any = document.getElementById(val);
        if (e.options[e.selectedIndex].value) {
            let checkNotNull = await this.tmpStore(indexIssue, index)
            console.log(checkNotNull);

            let value: any = e.options[e.selectedIndex].value;
            let text: any = e.options[e.selectedIndex].text;
            this.answer.push(JSON.parse(value))
            this.answer = _.uniqBy(_.reverse(this.answer), function (e: any) {
                return e.id;
            });
            if (checkNotNull) {
                this.tmp++
            }

            await this.show()
        }
    }

    private async tmpStore(indexIssue: number, index: number) {
        if (!_.find(this.tmpChoice, {
                "index": index,
                "indexIssue": indexIssue
            })) {
            this.tmpChoice.push({
                "indexIssue": indexIssue,
                "index": index
            });
            return true
        } else {
            return false
        }
    }

    private async show() {
        let xx: any = this.answer;
        xx = await _.chain(xx)
            .groupBy('group')
            .map((value: any, key: any) => ({
                group: key,
                value: value
            }))
            .value();
        this.resultAll = xx
        console.log(xx)
    }

    private async saveAnswer() {
        await Web.switchLoad(true);
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
        await Web.switchLoad(false);
        await this.openNotification('top-right', 'success', `<i class="em em-smiley" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>`, 'ประเมินสำเร็จแล้ว', '')
       let check = confirm('การประเมิน IIT สำเร็จแล้ว คุณต้องการทำแบบประเมิน EIT ต่อหรือไม่')
       if(check){
           await this.$router.push('/eit/year')
       }else{
await this.$router.go(-1)
       }
       // 

    }

    @Watch('e1')
    changeTab(value: any, oldValue: any) {
        while (this.tmpChoice.length > 0) {
            this.tmpChoice.pop();
        }
    }

    public async created() {
        //  await this.show();
        await Web.switchLoad(true);
        this.user = await User.getUser();
        this.years = this.$route.query.year
        this.year = await Core.getHttp(`/api/iit/v2/year/${this.years}/`)
        this.data = await Core.getHttp(`/api/iit/v1/issue?year=${this.years}`)
        if (this.data.length == 0) {
            this.nullData = true
        }
        try {
            this.appSetting = await Core.getSetting(this.year.year)
        } catch (error) {
            this.appSetting = null
        }
        await Web.switchLoad(false);
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

    async storeUserInAnswer() {
        let form = {
            "user": this.user.pk,
            "agency": this.user.ext_link.agency,
            "year": this.years
        }
        await Core.postHttp(`/api/iit/v2/ansewer/user/`, form)
    }
    getDataLoad(num: number) {
        // this.loadNum = num 
        return num;
    }
    async openNotification(position: any = null, color: any, icon: any, title: string, text: string) {

        const noti = this.$vs.notification({
            icon,
            color,
            position,
            title: title,
            text: text
        })
    }

    getChoice(choice:any, index:any, defChoices:any){
        try {
            let choices = this.appSetting.iit_choices
        let result = _.find(choices, item => _.includes(item.index, choice));
        if (result) {
            return result.choices[index]
        } else {
            return defChoices
        } 
        } catch (error) {
            return defChoices
        }
    }
}
</script>
