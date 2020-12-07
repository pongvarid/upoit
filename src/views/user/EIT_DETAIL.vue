<template>
<div class="relative md:pt-32 pb-32 pt-12  ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  " v-if="response">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800  ">
                    <v-icon>mdi-newspaper</v-icon> แบบประเมิน EIT
                </h3>
            </div>

            <v-app>

                <vs-dialog prevent-close not-close blur v-model="dialog">
                    <template #header>
                        <h4 class="not-margin">
                            เลือกหน่วยงานที่ต้องการประเมิน
                        </h4>
                    </template>
                    <span v-if="chooseAgency && lockUser">
                        <i class="em em-x" aria-role="presentation" aria-label="CROSS MARK"></i> คุณได้ประเมินให้หน่วยงานนี้แล้ว ไม่สามารถทำการประเมินได้
                    </span>

                    <v-card flat>
                        <v-card-text>
                            <v-main>
                                <v-autocomplete v-model="chooseAgencyType" :items="agencyType" item-text="name" item-value="id" filled label="ประเภทหน่วยงาน"></v-autocomplete>
                                <v-autocomplete v-model="chooseAgency" :items="agencies" item-text="name" item-value="id" filled label="หน่วยงาน"></v-autocomplete>
                            </v-main>
                        </v-card-text>
                        <v-card-actions v-if="chooseAgency">
                            <v-btn v-if="!lockUser" dark color="#1E8449" style="width:100%;" large @click="getStart">
                                ยืนยัน
                            </v-btn>

                        </v-card-actions>
                    </v-card>

                    <template #footer>
                        <div class="footer-dialog">
                            <div class="new">
                                <v-btn @click="$router.go(-1)" color="primary" text>กลับ</v-btn>
                            </div>
                        </div>
                    </template>
                </vs-dialog>

                    <vs-dialog prevent-close not-close blur v-model="dialogUser">
                    <template #header>
                        <h4 class="not-margin">
                            ผู้มีส่วนได้ส่วนเสียภายนอก
                        </h4>
                    </template>
      

                    <v-card flat>
                        <v-card-text>
                            <v-btn @click="useUserData()" color="success" text>ใช้ข้อมูลระบบ</v-btn>
                            <input type="text" v-model="formUser.agency" :class="`${$xinput} mb-2`" placeholder="ชื่อหน่วยงาน *">
                            <input type="text" v-model="formUser.name" :class="`${$xinput} mb-2`" placeholder="ชื่อองค์กร/ชื่อ - นามสกุล *">
                            <input type="text" v-model="formUser.tel"  :class="`${$xinput} mb-2`" placeholder="เบอร์โทรศัพท์">
                            <input type="text" v-model="formUser.email"  :class="`${$xinput} mb-2`" placeholder="อีเมล์ ">
                            <input type="text" v-model="formUser.other"  :class="`${$xinput} mb-2`" placeholder="ช่องทางการติดต่ออื่นๆ">
                             <input type="text" v-model="formUser.contact"  :class="`${$xinput} mb-2`" placeholder="ประเภทการติดต่อ *">
                        </v-card-text>
                        <v-card-actions >
                            <v-btn dark color="#1E8449" style="width:100%;" large @click="dialogUser = false">
                                ยืนยัน
                            </v-btn> 
                        </v-card-actions>
                    </v-card>

                    <template #footer>
                        <div class="footer-dialog">
                            <div class="new">
                                <v-btn @click="$router.go(-1)" color="primary" text>กลับ</v-btn>
                            </div>
                        </div>
                    </template>
                </vs-dialog>

                <!-- {{resultAll.length}} -->
                <v-stepper v-model="e1" v-if="chooseAgency">
                    <v-stepper-header style=" overflow-x: scroll; overflow-y:hidden;  display:flex; flex-wrap: nowrap; padding:4px;">
                        <v-stepper-step :complete="e1 > tab.order" :step="tab.order" v-for="tab,i in data" :key="i">
                            <span class="font-bold" style="font-size:16px;"> {{tab.name}}</span>
                        </v-stepper-step>

                    </v-stepper-header>
                    <v-progress-linear v-if="data.length > 0" style="width:100%;" striped height="10" color="#32a852" :value="(tmp*100)/data[e1-1].issueCount" :buffer-value="100"></v-progress-linear>

                    <v-stepper-items>
                        <v-stepper-content :step="tab.order" v-for="tab,i in data" :key="i">
                            <v-card class="mb-12" flat>
                                <h3 class="text-xl font-bold  text-white">{{ tmp}} / {{tab.issueCount}}</h3>
                                <div v-for="issue,index in tab.issue">
                                    <h2>
                                        <v-avatar color="teal" size="36">
                                            <span class="white--text headline">i{{issue.order}} </span>
                                        </v-avatar> &nbsp;{{issue.name}}
                                    </h2>

                                    <div v-for="ans,j in issue.issueDetail"> <br>
                                        <h3 class="font-bold"  v-if="tab.name != 'ข้อเสนอแนะ'" > {{ans.sub_name}}</h3>
                                        <div v-if="ans.choice">
                                            <div v-if="ans.choice.resourcetype === 'Ascend'">
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`)" :class="$input">
                                                    <option :value="null">เลือกคำตอบ</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.notting,'value_by':'น้อยที่สุดหรือไม่มีเลย', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">น้อยที่สุดหรือไม่มีเลย</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.low, 'value_by':'น้อย', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">น้อย</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.very, 'value_by':'มาก', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">มาก</option>
                                                    <option :value="JSON.stringify({'value' :ans.choice.many, 'value_by':'มากที่สุด', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">มากที่สุด</option>
                                                </select>
                                            </div>
                                            <div v-else-if="ans.choice.resourcetype === 'Exist'">
                                                <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`)" :class="$input">
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
                                    <v-progress-linear v-if="data.length > 0" style="width:100%;" striped height="10" color="#32a852" :value="(tmp*100)/data[e1-1].issueCount" :buffer-value="100"></v-progress-linear>

                                    <v-btn x-large style="width:100%;" v-if=" tmp >= tab.issueCount && i < data.length" color="primary" @click="toTop() && (e1 = (tab.order+1)) && (tmp =0)  ">
                                        ดำเนินการต่อ
                                    </v-btn>
                                    <v-btn x-large style="width:100%;" v-if="tab.name == 'ข้อเสนอแนะ'" color="success" @click="saveAnswer()">
                                        บันทึกข้อมูลการประเมิน
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                            <!-- <v-btn @click="show">
                                ss
                            </v-btn> -->
                            <!-- <v-progress-linear v-if="data.length > 0" style="width:100%;" striped height="10" color="#32a852" :value="(tmp*100)/data[e1-1].issueCount" :buffer-value="100"></v-progress-linear>
<br><br> -->
                            <!-- <v-btn color="primary" v-if=" tmp >= tab.issueCount" @click="(e1 = (tab.order+1)) && (tmp =0)">
                                Continue
                            </v-btn>
                            <v-btn v-if="resultAll.length == 15" @click="saveAnswer()">
                                save
                            </v-btn>

                            <v-btn text v-if="i != 0" @click="e1 = (tab.order-1)">
                                Cancel
                            </v-btn> -->

                            <!-- <v-btn x-large style="width:100%;" v-if=" tmp >= tab.issueCount && i < data.length" color="primary" @click="toTop() && (e1 = (tab.order+1)) && (tmp =0)  ">
                                        ดำเนินการต่อ
                                    </v-btn>
                                    <v-btn x-large style="width:100%;" v-if="tab.name == 'ข้อเสนอเเนะ'" color="success" @click="saveAnswer()">
                                        บันทึกข้อมูลการประเมิน
                                    </v-btn> -->

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
    private lockUser: boolean = true
    $vs: any
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
    private dialogUser:boolean = false;
    private formUser:any = {};

    private async getStart(){
        this.dialog = false;
        this.dialogUser = true;
    }
    private async useUserData(){
        this.dialogUser = false;
        let data = await Core.getHttp(`/api/ita/v2/dashboard/${this.user.ext_link.id}/`)
        this.formUser.agency = data.agency
        this.formUser.name = this.user.first_name +" "+this.user.last_name 
        this.formUser.email= this.user.email
        console.log(data.agency);
        this.dialogUser = true;
    }

    @Watch('chooseAgencyType')
    private async chnageChooseAgencyType(val: number) {
        this.agencies = await Core.getHttp(`/api/ita/v2/agencys/?agency_type=${val}`)

    }
    @Watch('chooseAgency')
    private async chnageChooseAgency(val: number) {
        let check = await Core.getHttp(`/api/eit/v2/answerissueeit-report/?agency=${this.chooseAgency}&year=${this.years}&user=${this.user.pk}`)
      //  alert(check.length )
        if (check.length > 0) {
            this.lockUser = true;
        } else {
            this.lockUser = false;
        }
    }

    private async addValue(val: any) {
        let e: any = document.getElementById(val);
        if (e.options[e.selectedIndex].value) {
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

        await this.openNotification('top-right', 'success', `<i class="em em-smiley" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>`, 'ประเมินสำเร็จแล้ว', '')
        await this.$router.go(-1)
    }

    

    public async created() {
        //  await this.show();
        this.agencyType = await Core.getHttp(`/api/ita/v1/agencytype/`)

        this.user = await User.getUser();
        this.years = this.$route.query.year
        this.data = await Core.getHttp(`/api/eit/v1/issue?year=${this.years}`)
         
        this.response = true
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
}
</script>
