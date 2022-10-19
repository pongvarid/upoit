<template>
<div class="relative md:pt-32 pb-32 pt-12 h-screen">
    <br> <br>
    <h2 class="text-2xl font-semibold">แผนส่งเสริมคุณธรรม</h2>
    <v-toolbar color="transparent" flat>
        <h2>องค์กรคุณธรรม /</h2>
        <v-btn @click="$router.go(-1)" text>ปีงบประมาณ /</v-btn>
        <v-btn text color="primary">แผนส่งเสริมคุณธรรม</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="openDjangoFormAdd()" color="success">
            <v-icon>mdi-plus</v-icon> เพิ่มแผนส่งเสริมคุณธรรม
        </v-btn>
    </v-toolbar> 
    <v-expansion-panels accordion>
        <v-expansion-panel v-for="(data,i) in basePlans" :key="i">
            <v-expansion-panel-header>{{i+1}}. {{data.base_plan}}</v-expansion-panel-header>
            <v-expansion-panel-content>

                <div v-for="plan,j in data.plans" :key="j">
                    <v-toolbar color="transparent" flat dense>
                        <v-spacer></v-spacer>
                        <v-btn @click="editDjangoFormAdd(plan.id)" small color="warning">แก้ไขแผนส่งเสริมคุณธรรม</v-btn>
                        <v-btn class="ml-2" small @click="deleteBasePlan(plan.id)" color="error">ลบแผนส่งเสริมคุณธรรม</v-btn>
                    </v-toolbar>
                    <table>
                        <tr>
                            <th>ที่</th>
                            <th>คุณธรรมเป้าหมาย</th>
                            <th>ปัญหาที่อยากแก้</th>
                            <th>ความดีที่อยากทำ</th>
                            <th>กิจกรรม</th>
                            <th>ตัวชี้วัด</th>
                            <th>วัน/เดือน/ปี ที่ดำเนินงาน</th>
                            <th>งบประมาณในการดำเนินงาน</th>
                            <th>ผู้รับผิดชอบ</th>
                        </tr>
                        <tr>
                            <td>{{i+1}}.{{j+1}}</td>
                            <td>{{plan.name}}</td>
                            <td>{{plan.problem}}</td>
                            <td>{{plan.fix_want}}</td>
                            <td>{{plan.good_fix}}</td>
                            <td>{{plan.kpi}}</td>
                            <td>{{plan.doing_date}}</td>
                            <td>{{plan.money}}</td>
                            <td>{{plan.responsible_user}}</td>
                        </tr>
                    </table>
                    <v-timeline dense flat>
                        <v-timeline-item v-for="(list,i) in plan.lists" :key="i">
                            <v-card>
                                <v-card-title primary-title>
                                    <span class="text-sm font-semibold">ความสำเร็จของการดำเนินกิจกรรม/โครงการตามแผนส่งเสริมคุณธรรม </span>
                                </v-card-title>
                                <v-card-text>
                                    <table>
                                        <tr>
                                            <th>กิจกรรม/โครงการ</th>
                                            <th>{{list.doing_date}}</th>
                                        </tr>
                                        <tr>
                                            <th>วัน เวลา ที่ดำเนินการ</th>
                                            <th>{{list.doing_date}}</th>
                                        </tr>
                                        <tr>
                                            <th>สถานที่ ที่ดำเนินการ</th>
                                            <th>{{list.place}}</th>
                                        </tr>
                                        <tr>
                                            <th>จำนวนผู้เช้าร่วมกิจกรรม/โครงการ</th>
                                            <th>{{list.count_person}}</th>
                                        </tr>
                                        <tr>
                                            <th>งบประมาณที่ใช้ในการดำเนินงาน</th>
                                            <th>{{list.money}}</th>
                                        </tr>
                                        <tr>
                                            <th>แนบไฟส์</th>
                                            <th>{{list.money}}</th>
                                        </tr>
                                        <tr>
                                            <th>รูปภาพกิจกรรม/โครงการ</th>
                                            <th>
                                                <div v-for="file,index in list.file" :key="index">
                                                    <a class="p-4" :href="`${$backend}${file.file}`" target="_blank">ไฟล์แนบ {{index+1}}</a>
                                                </div>
                                            </th>
                                        </tr>
                                    </table>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </div>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
      <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-text>
                <div class="flex flex-col justify-center items-center h-full w-full">
                    <v-icon size="60" class="m-4">m em-school</v-icon>
                    <h2 class="text-xl font-semibold">ระบบกำลังพาคุณไปยังฟอร์มภายนอก</h2>
                    <span class="text-base">หากคุณทำการกรอกข้อมูล หรือ จัดการฟอร์มเรียบร้อยแล้ว ให้ปิด Popup และ ให้กด "ดำเนินการต่อ" </span>
                    <br>
                    <v-btn @click="closeDialog()" x-large color="success">ดำเนินการต่อ</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
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
            basePlans: [],
            dialog: false,

        })
    },
    async created() {
        await this.init()
        this.response = true;
    },
    methods: {
        async init() {
            await User.loadUser()
            this.year = this.$route.query.year
            this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.user.ext_link.agency}/`)
            await this.getBasePlan()
        },
        async getBasePlan() {
            let basePlans = await Core.getHttp(`/api/moral_organization/baseplan/?year=${this.$route.query.year}&agency=${this.user.ext_link.agency}`)
            this.basePlans = _.chain(basePlans).groupBy('name').map((value, key) => ({
                base_plan: key,
                plans: value
            })).value()
        },
        async openDjangoFormAdd() {
            this.dialog = true
            let url = `${this.$backend}/baseplan/?agency=${this.user.ext_link.agency}&year=${this.year}`
            let myWindow = window.open(url, "myWindow", 'height=800,width=600');
        },
        async editDjangoFormAdd(id) {
            this.dialog = true
            let url = `${this.$backend}/editplan/?id=${id}`
            let myWindow = window.open(url, "myWindow", "width=800,height=600");
        },
        async closeDialog() {
            await this.init();
            this.dialog = false
        },
        async deleteBasePlan(id) {
            let check = confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูล')
            if (check) {
                let remove = await Core.deleteHttp(`/api/moral_organization/baseplan/${id}/`)
                await this.init();
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
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
