<template>
<div class="relative md:pt-32 pb-32 pt-12 h-screen">
    <v-toolbar class="mt-4" color="transparent" flat>
        <v-btn @click="$router.go(-1)" color="primary" large>กลับ</v-btn>
    </v-toolbar>
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6   -mt-6" v-if="response">
        <center class="mt-6 mb-2">
            <h2 class="text-2xl font-semibold">แบบประเมินตนเองตามกระบวนการส่งเสริมและพัฒนา “องค์กรคุณธรรม”</h2>
            <h2 class="text-xl font-semibold mt-2">ปีงบประมาณ {{year.name}}</h2>
        </center>
        <form class="p-4 bg-white shadow-2xl m-6 rounded-xl">
            <div class="w-full flex ">
                <v-text-field label="ระดับ" v-model="form.level"></v-text-field>
                <v-text-field readonly label="หน่วยงาน" v-model="agency.name"></v-text-field>
                <v-text-field readonly label="จำนวนสมาชิก" v-model="agency.count"></v-text-field>
            </div>
            <div class="w-full flex ">
                <v-text-field label="ที่ตั้ง" v-model="form.address"></v-text-field>
                <v-text-field label="เบอร์โทร" v-model="form.tel"></v-text-field>
            </div>

        </form>
        <v-card class="m-6" v-for="data,i in datas" :key="i">
            <v-card-title class="bg-blue-300">
                {{data.name}}
            </v-card-title>
            <v-card-text>
                <div v-for="assessment,j in data.assessment" :key="j">
                    <h2 class="font-semibold text-xl m-2">{{assessment.name}}</h2>
                    <v-radio-group v-model="forms[i][j]">
                        <v-radio v-for="choice,k in assessment.choices" :key="k" :label="choice.value" :value="choice.id"></v-radio>
                    </v-radio-group>
                </div>
            </v-card-text>
        </v-card>
        <v-toolbar color="transparent" flat>
            <v-spacer></v-spacer>
            <v-btn @click="checking()" x-large color="success">ส่งแบบประเมิน</v-btn>
        </v-toolbar> <br><br>
    </div>
</div>
</template>

<script>
import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
import _ from 'lodash'
export default {
    data: () => {
        return ({
            response: false,
            year: null,
            agency: null,
            datas: null,
            forms: [],
            form: {},
            choices: 0
        })
    },
    async created() {
        await User.loadUser()
        await this.initUser();
        await this.init();
        this.response = true;
    },
    methods: {
        async init() {
            this.datas = await Core.getHttp(`/api/moral_organization/category/?year=${this.$route.query.year}`)
            for (let i = 0; i < this.datas.length; i++) {
                let data = this.datas[i].assessment
                let form = []
                for (let j = 0; j < data.length; j++) {
                    form.push(-1)
                    this.choices++
                }
                this.forms.push(form)
            }
        },
        async initUser() {
            this.year = await Core.getHttp(`/api/moral_organization/year/${this.$route.query.year}/`)
            this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.user.ext_link.agency}/`)
        },
        async checking() {
            let check = true;
            for (let index = 0; index < this.forms.length; index++) {
                let find = _.find(this.forms[index], (r) => {
                    return r == -1
                })
                if (find == -1) {
                    check = false
                    break;
                }
            }
            if (!check) {
                await alert("กรุณาทำแบบประเมินให้ครบทุกข้อ")
            } else {
                await this.submiting();
            }
        },
        async submiting() {
            let idMain = await this.submitMain();
            if (idMain) {
                await this.submitChoice(idMain)
            }
        },
        async submitMain() {
            let form = {
                "sum_user": this.agency.count,
                "address": this.form.address,
                "tel": this.form.tel,
                "year": this.year.id,
                "user": this.user.pk,
                "agency": this.agency.id
            }
            let store = await Core.postHttp(`/api/moral_organization/main_exercise/`, form)
            return (store.id) ? store.id : null
        },
        async submitChoice(idMain) {
            let count = 0
            for (let i = 0; i < this.datas.length; i++) {
                let data = this.datas[i].assessment
                let choices = this.forms[i]

                for (let j = 0; j < data.length; j++) {
                    let form = {
                        "assessment": data[j].id,
                        "main_exercise": idMain,
                        "choice": choices[j]
                    }
                    let store = await Core.postHttp(`/api/moral_organization/do_exercise/`, form)
                    if (store.id) {
                        count++
                    }
                }
            }
            console.log(this.choices)
            if (count == this.choices) {
                alert('บันทึกข้อมูลแบบประเมินสำเร็จ')
                await this.$router.go(-1)
            } else {
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล โปรดติดต่อผู้ดูแลระบบ')
            }
        }
    },
    computed: {
        user() {
            return User.user
        }
    }
}
</script>

<style>

</style>
