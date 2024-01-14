<template>
   <div>
    <v-toolbar color="ttbarx" fixed  style="z-index:1;">
        <v-btn color="white" depressed fab>
            <span class="text-orange-500 font-semibold ">EIT</span>
        </v-btn>
        <div class="pl-2" v-if="!$vuetify.breakpoint.mobile">
            <h2 class="text-white font-semibold">แบบประเมินการรับรู้ของผู้มีส่วนได้ส่วนเสียภายนอก</h2>
            <h2 class="text-white text-xs">External Integrity and Transparency Assessment : EIT</h2>
        </div>     
        <v-spacer></v-spacer>
        <img class="h-10 w-auto" src="https://upload.wikimedia.org/wikipedia/th/thumb/0/00/University_of_Phayao_Logo.svg/1200px-University_of_Phayao_Logo.svg.png" alt="">
        <img class="h-8 w-auto ml-2" src="https://univer2017.files.wordpress.com/2017/09/e0b8a1e0b8abe0b8b2e0b8a7e0b8b4e0b897e0b8a2e0b8b2e0b8a5e0b8b1e0b8a2e0b89ee0b8b0e0b980e0b8a2e0b8b21.png?w=1000&h=208" alt="">
    </v-toolbar> 
    <div class="relative pb-32   ">
        <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  " v-if="response">
            <div class="rounded-t mb-0 px-4 py-3 border-0 ">
                <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                   <bin-card3 class="m-2" c="rgb(255, 102, 0)" :t="`ปีงบประมาณ : ${year.year}`" h="แบบประเมินการรับรู้ของผู้มีส่วนได้ส่วนเสียภายนอก" i="EIT"></bin-card3>
                
                </div>
    
                <v-app>
    
                    <vs-dialog prevent-close not-close blur v-model="dialog">
                        <bin-card3 class="m-2" c="rgb(255, 102, 0)" :t="`ปีงบประมาณ : ${year.year}`" h="แบบประเมินการรับรู้ของผู้มีส่วนได้ส่วนเสียภายนอก" i="EIT"></bin-card3>
                            
                            <h4 class="not-margin">
                                เลือกหน่วยงานที่ต้องการประเมิน
                            </h4>
                           
    
                            <v-alert type="error" v-if="chooseAgency && lockUser" >
                                คุณได้ประเมินให้หน่วยงานนี้แล้ว ไม่สามารถทำการประเมินได้
                            </v-alert>
                            
    
                            <v-alert type="warning" v-if="chooseAgency == myAgency" >
                                คุณไม่สามารประเมิน (EIT) หน่วยงานของตนเองได้ กรุณาเลือกหน่วยงานอื่น
                            </v-alert>
                            
    
                        <v-card flat>
                            <v-card-text>
                                <v-text-field v-model="name" filled  label="ชื่อ-นามสกุล" persistent-hint hint=" *ต้องระบุข้อมูล"  ></v-text-field>
                                <v-text-field oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="phone_number" filled  label="เบอร์โทร" persistent-hint hint=" *ต้องระบุข้อมูล"  ></v-text-field>
                                <v-autocomplete v-model="chooseAgencyType" :items="agencyType" item-text="name" item-value="id" filled label="ประเภทหน่วยงาน"></v-autocomplete>
                                <v-autocomplete v-model="chooseAgency" :items="agencies" item-text="name" item-value="id" filled label="หน่วยงาน"></v-autocomplete>
    
                            </v-card-text>
                            <v-card-actions v-if="chooseAgency && chooseAgency != myAgency && name && phone_number">
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
    
              
                    <!-- {{resultAll.length}} -->
                    <v-stepper v-model="e1" v-if="chooseAgency">
                        <v-stepper-header style=" overflow-x: scroll; overflow-y:hidden;  display:flex; flex-wrap: nowrap; padding:4px;">
                            <v-stepper-step :complete="e1 > tab.order" :step="tab.order" v-for="tab,i in data" :key="i">
                                <span class="font-bold"  style=" font-size:16px;">  {{tab.name}}</span>
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
                                                <span class="white--text headline">e{{issue.order}} </span>
                                            </v-avatar> &nbsp; 
                                              <span v-html="issue.name"></span>
                                        </h2>
    
                                        <div v-for="ans,j in issue.issueDetail"> <br>
                                            <h3 class="font-bold" v-if="tab.name != 'ข้อเสนอแนะ'"> {{ans.sub_name}}</h3>
                                            <div v-if="ans.choice">
                                                <div v-if="ans.choice.resourcetype === 'Ascend'">
                                                    <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`)" :class="$input">
                                                        <option :value="null">เลือกคำตอบ</option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.nottingest,'value_by':'น้อยที่สุดหรือไม่มีเลย', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">
                                                        
                                                            {{ getChoice(issue.order, 0, 'ไม่เห็นด้วยอย่างยิ่ง') }}
                                                        </option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.notting,'value_by':'น้อยที่สุดหรือไม่มีเลย', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">
                                                            {{ getChoice(issue.order, 1, 'ไม่เห็นด้วย') }}
                                                        </option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.low, 'value_by':'น้อย', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">
                                                            {{ getChoice(issue.order, 2, 'ค่อนข้าง ไม่เห็นด้วย') }}
                                                        </option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.very, 'value_by':'มาก', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">
                                                            {{ getChoice(issue.order, 3, 'ค่อนข้าง เห็นด้วย') }}
                                                        </option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.many, 'value_by':'มากที่สุด', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">
                                                            {{ getChoice(issue.order, 4, 'เห็นด้วย') }}
                                                        </option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.manyest, 'value_by':'มากที่สุด', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">
                                                            {{ getChoice(issue.order, 5, 'เห็นด้วย อย่างยิ่ง') }}
                                                        </option>

                                                        <!-- <option :value="JSON.stringify({'value' :ans.choice.notting,'value_by':'น้อยที่สุดหรือไม่มีเลย', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id })">น้อยที่สุดหรือไม่มีเลย</option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.low, 'value_by':'น้อย', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">น้อย</option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.very, 'value_by':'มาก', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">มาก</option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.many, 'value_by':'มากที่สุด', 'value_type':ans.choice.id , id:ans.id , group:issue.id, assessment:tab.id  })">มากที่สุด</option>
                                                    -->
                                                    </select>
                                                </div>
                                                <div v-else-if="ans.choice.resourcetype === 'Exist'">
                                                    <select :id="`choice${index}_${ans.id}`" @change="addValue(`choice${index}_${ans.id}`)" :class="$input">
                                                        <option :value="null">เลือกคำตอบ</option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.notting, 'value_by':'มี', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">
                                                            {{ getChoice(issue.order, 0, 'มี') }}
                                                        </option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.have,'value_by':'ไม่มี', 'value_type':ans.choice.id ,  id:ans.id , group:issue.id, assessment:tab.id  })">
                                                            {{ getChoice(issue.order, 1, 'ไม่มี') }}
                                                        </option>

                                                        <!-- <option :value="JSON.stringify({'value' :ans.choice.notting, 'value_by':'มี', 'value_type':ans.choice.id , id:ans.id , group:issue.id , assessment:tab.id })">มี</option>
                                                        <option :value="JSON.stringify({'value' :ans.choice.have,'value_by':'ไม่มี', 'value_type':ans.choice.id ,  id:ans.id , group:issue.id, assessment:tab.id  })">ไม่มี</option>
                                                  -->
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
        private name:string = ""
        private phone_number:string = ""
        
        private dashboard: any = null
        private user: any = {}
        private years: any = 0
        private year:any ={}
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
        private dialogUser: boolean = false;
        private formUser: any = {};
        private myAgency :any = 0
        public appSetting: any = {}

    
        private async getStart() {
            this.dialog = false;
            //let check = confirm('คุณต้องการให้ข้อมูลส่วนตัวเพิ่มเติมหรือไม่')
            // if(check){
            //   this.dialogUser = true;
            // } 
        }
        private async useUserData() {
            this.dialogUser = false;
            let data = await Core.getHttp(`/api/ita/v2/dashboard/${this.user.ext_link.id}/`)
            this.formUser.agency = data.agency
            this.formUser.name = this.user.first_name + " " + this.user.last_name
            this.formUser.email = this.user.email
            console.log(data.agency);
            this.dialogUser = true;
        }
    
        @Watch('chooseAgencyType')
        private async chnageChooseAgencyType(val: number) {
            this.agencies = await Core.getHttp(`/api/ita/v2/agencys/?agency_type=${val}`)
    
        }
        @Watch('chooseAgency')
        private async chnageChooseAgency(val: number) {
            let check = await Core.getHttp(`/api/eit/v2/answerissueeit-report/?agency=${this.chooseAgency}&year=${this.years}&phone_number=${this.phone_number}`)
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
            await Web.switchLoad(true);
            for (let index = 0; index < this.answer.length; index++) {
                let form = {
                    "value": this.answer[index].value,
                    "value_type": this.answer[index].value_type,
                    "value_by": this.answer[index].value_by,
                    // "user": this.user.pk,
                    "name": this.name,
                    "phone_number": this.phone_number,
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
                // "user": this.user.pk,
                "name": this.name,
                "phone_number": this.phone_number,
                "agency": this.chooseAgency,
                "year": this.years,
            })
            await Web.switchLoad(false);
            await this.openNotification('top-right', 'success', `<i class="em em-smiley" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH"></i>`, 'ประเมินสำเร็จแล้ว', '')
            alert('ประเมิน EIT สำเร็จแล้ว')
             await this.$router.go(-1)
        }
    
        public async created() {
            await Web.switchLoad(true);
            this.agencyType = await Core.getHttp(`/api/ita/v1/agencytype/`)
            this.agencyType = await _.filter(this.agencyType ,(r:any)=>{return r.id != 3})
    
            //this.user = await User.getUser();
            this.years = this.$route.query.year
            this.year = await Core.getHttp(`/api/eit/v2/year/${this.years}/`)
            this.data = await Core.getHttp(`/api/eit/v1/issue?year=${this.years}`)
            try {
             this.appSetting = await Core.getSetting(this.year.year)
                } catch (error) {
                    this.appSetting = null
                }
            await Web.switchLoad(false);
            // this.myAgency = this.user.ext_link.agency
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
        getChoice(choice:any, index:any, defChoices:any){
        try {
            let choices = this.appSetting.eit_choices
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
    <style>
    .ttbarx{
        background: rgb(255,155,51);
    background: linear-gradient(90deg, rgba(255,155,51,1) 0%, rgba(119,43,255,1) 58%, rgba(255,255,255,1) 100%);
    }
    </style>