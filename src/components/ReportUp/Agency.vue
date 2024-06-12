<template>
<div class="" v-if="response">
    <div class="flex flex-row">

        <div class="w-full" v-if="response">
            <v-toolbar flat class="mt-8">
                <img class="w-20" src="@/assets/res_all.svg" alt="">
                <h2 class="text-2xl font-bold text-yellow-500 "> ผลประเมินของแต่ละหน่วยงาน  ปีงบประมาณ  {{ year }} </h2>
                <v-spacer></v-spacer>
                <v-btn @click="onExport(exports,'หน่วยงาน.XLSX')">ส่งออกข้อมูล</v-btn>
            </v-toolbar>
            <div v-if="year < 2567">
                <v-tabs>
                    <v-tab>AA</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/AA.svg" alt="">
    
                            <h2 class="text-3xl font-bold text-green-600">ระดับ AA</h2>
                        </center>
                        <Bars v-for="(data,i) in result.AA" :key="i" color="green" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>A</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/A.svg" alt="">
                            <h2 class="text-3xl font-bold text-yellow-500">ระดับ A</h2>
                        </center>
                        <Bars v-for="(data,i) in result.A" :key="i" color="green" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>B</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/B.svg" alt="">
                            <h2 class="text-3xl font-bold text-blue-500">ระดับ B</h2>
                        </center>
                        <Bars v-for="(data,i) in result.B" :key="i" color="blue" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>C</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/C.svg" alt="">
                            <h2 class="text-3xl font-bold text-purple-500">ระดับ C</h2>
                        </center>
                        <Bars v-for="(data,i) in result.C" :key="i" color="purple" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>D</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/D.svg" alt="">
                            <h2 class="text-3xl font-bold text-red-500">ระดับ D</h2>
                        </center>
                        <Bars v-for="(data,i) in result.D" :key="i" color="orange" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>E</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/E.svg" alt="">
                            <h2 class="text-3xl font-bold text-red-500">ระดับ E</h2>
                        </center>
                        <Bars v-for="(data,i) in result.E" :key="i" color="red" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>F</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/F.svg" alt="">
                            <h2 class="text-3xl font-bold text-red-500">ระดับ F</h2>
                        </center>
                        <Bars v-for="(data,i) in result.F" :key="i" color="red" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>ไม่ผ่านเกณฑ์</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <img class="w-48 " src="@/assets/Other.svg" alt="">
                            <h2 class="text-3xl font-bold text-yellow-500">ไม่ผ่านเกณฑ์</h2>
                        </center>
                        <Bars v-for="(data,i) in result.Other" :key="i" color="yellow" :name="`${i+1}. `+ data.agency.name" :sub="data.rate" :score="data.all"></Bars>
                    </v-tab-item>
                </v-tabs>
            </div>
            <div v-else>
                <v-tabs>
                    <v-tab>ผ่านดีเยี่ยม</v-tab>
                    <v-tab-item class="pt-6">
                        <center class="pyro"> 
                            <div class="before"></div>
                            <div class="after"></div>
                            <img class="w-48 animate__animated animate__heartBeat animate__infinite infinite" src="@/assets/AA.svg" alt="">
    
                            <h2 class="text-3xl font-bold text-green-600 mt-4">ผ่านดีเยี่ยม</h2>
                        </center>
                        <Bars v-for="(data,i) in result.newA" :key="i" color="green" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>ผ่านดี</v-tab>
                    <v-tab-item class="pt-6">
                        <center class="pyro">
                            <div class="before"></div>
                            <div class="after"></div>
                            <!-- <img class="w-48 " src="@/assets/A.svg" alt=""> -->
                            <center><h2 class="animate__animated animate__bounce animate__infinite infinite"  style="font-size:140px">🥰</h2></center>
                            <h2 class="text-3xl font-bold text-yellow-500">ผ่านดี</h2>
                        </center>
                        <Bars v-for="(data,i) in result.newB" :key="i" color="green" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>ผ่าน</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <center><h2 class="animate__animated animate__shakeX animate__infinite infinite"  style="font-size:140px">😃</h2></center>
                            <h2 class="text-3xl font-bold text-blue-500">ผ่าน</h2>
                        </center>
                        <Bars v-for="(data,i) in result.newC" :key="i" color="blue" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>ต้องปรับปรุง</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                              <center><h2 class="animate__animated animate__tada animate__infinite	infinite" style="font-size:140px">😥</h2></center>
                            <h2 class="text-3xl font-bold text-purple-500">ต้องปรับปรุง</h2>
                        </center>
                        <Bars v-for="(data,i) in result.newD" :key="i" color="purple" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item>
                    <v-tab>ต้องปรับปรุงโดยด่วน</v-tab>
                    <v-tab-item class="pt-6">
                        <center>
                            <center><h2 class="animate__animated animate__tada animate__infinite infinite" style="font-size:140px">😰</h2></center> 
                            <!-- <img class="w-48 " src="@/assets/D.svg" alt=""> --> 
                            <h2 class="text-3xl font-bold text-red-500">ระดับ D</h2>
                        </center>
                        <Bars v-for="(data,i) in result.newE" :key="i" color="orange" :name="`${i+1}. `+ data.agency.name" :score="data.all"></Bars>
                    </v-tab-item> 
                    <v-tab>ไม่ผ่านเกณฑ์</v-tab>
                    <v-tab-item class="pt-6"> 
                        <div v-if="result.Other">
                            <div v-if="(result.Other).length > 0">
                                <center>
                                    <center><h2 class="animate__animated animate__shakeX animate__infinite	infinite"  style="font-size:140px">😱</h2></center>
                                    <h2 class="text-3xl font-bold text-yellow-500">ไม่ผ่านเกณฑ์</h2>
                                </center>
                                <Bars v-for="(data,i) in result.Other" :key="i" color="yellow" :name="`${i+1}. `+ data.agency.name" :sub="data.rate" :score="data.all"></Bars>
                            </div>
                            <div v-else>
                                <center class="pyro">
                                    <div class="before"></div>
                                    <div class="after"></div>
                                    <center><h2 class="animate__animated animate__rubberBand animate__infinite	infinite" style="font-size:140px ">🌟</h2></center>
                                    <h2 class="text-3xl font-bold text-orange-500 ">ยินดีด้วย! ทุกหน่วยงานผ่านเกณฑ์การประเมิน</h2>
                                </center> 
                            </div>
                        </div>
                   
                    </v-tab-item>
                </v-tabs>
            </div>
         
            

        </div>
    </div>

    <br><br><br><br><br><br>
    <div class="flex flex-col justify-center items-center">
        <h2 class="text-2xl font-semibold">ผลคะแนนและระดับผลการประเมินของคณะ/วิทยาลัย/ระดับกองหรือเทียบเท่า และหน่วยงาน </h2><br>
        <v-card class="w-full">
            <v-card-title>
                ปีงบประมาณ {{year}}
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>

            </v-card-title>
            <v-data-table items-per-page="50" :headers="headers" :items="fullData" :search="search"> 
            </v-data-table>
        </v-card>

    </div>

</div>
</template>

<script lang="ts">
import Navbar from "@/components/Core/Navbar.vue";
import Loading from "@/components/Web/Loading.vue";
import {
    Core
} from "@/store/core";
import {
    Web
} from "@/store/web";
import {
    Component,
    Vue,
    Watch,
    Prop
} from "vue-property-decorator";
import _ from 'lodash'
import XLSX from 'xlsx'
import Bars from '@/components/ReportUp/Bars.vue'
@Component({
    components: {
        Navbar,
        Loading,
        Bars
    },
    computed: {}
})

export default class TestDevClass extends Vue {
    @Prop({
        default: ''
    })
    year: any
    response: boolean = false;
    lists: any = []
    result: any = {
        AA: [],
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        Other: [],

    }
    exports: any = []
    fullData: any = []
    headers: any = [{
            text: 'ลำดับ',
            value: 'index'
        },
        {
            text: 'คณะ/วิทยาลัย/ส่วนงานอื่น',
            value: 'agency.name'
        },
        {
            text: 'ผลคะแนน',
            value: 'all'
        },
        {
            text: 'ระดับ',
            value: 'rate'
        },
    ]
    search: String = ''
    async created() {
        await this.loadEnv();
    }

    async loadEnv() {
        let results = [
            'AA',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'ผ่านดีเยี่ยม',
            'ผ่านดี',
            'ผ่าน',
            'ต้องปรับปรุง',
            'ต้องปรับปรุงโดยด่วน', 
        ]
        this.lists = await Core.getHttp(`/api/report/v1/reportall-all/?year=${this.year}`)
        await this.genAgency();
        this.result.AA = await _.orderBy(_.filter(this.lists, {
            rate: 'AA'
        }), (r: any) => {
            return -r.all
        })
        this.result.A = await _.orderBy(_.filter(this.lists, {
            rate: 'A'
        }), (r: any) => {
            return -r.all
        })
        this.result.B = await _.orderBy(_.filter(this.lists, {
            rate: 'B'
        }), (r: any) => {
            return -r.all
        })
        this.result.C = await _.orderBy(_.filter(this.lists, {
            rate: 'C'
        }), (r: any) => {
            return -r.all
        })
        this.result.D = await _.orderBy(_.filter(this.lists, {
            rate: 'D'
        }), (r: any) => {
            return -r.all
        })
        this.result.E = await _.orderBy(_.filter(this.lists, {
            rate: 'E'
        }), (r: any) => {
            return -r.all
        })
        this.result.F = await _.orderBy(_.filter(this.lists, {
            rate: 'F'
        }), (r: any) => {
            return -r.all
        })
        this.result.newA = await _.orderBy(_.filter(this.lists, {
            rate: 'ผ่านดีเยี่ยม'
        }), (r: any) => {
            return -r.all
        })
        this.result.newB = await _.orderBy(_.filter(this.lists, {
            rate: 'ผ่านดี'
        }), (r: any) => {
            return -r.all
        })
        this.result.newC = await _.orderBy(_.filter(this.lists, {
            rate: 'ผ่าน'
        }), (r: any) => {
            return -r.all
        })
        this.result.newD = await _.orderBy(_.filter(this.lists, {
            rate: 'ต้องปรับปรุง'
        }), (r: any) => {
            return -r.all
        })
        this.result.newE = await _.orderBy(_.filter(this.lists, {
            rate: 'ต้องปรับปรุงโดยด่วน'
        }), (r: any) => {
            return -r.all
        })

        this.result.Other = await _.orderBy(_.filter(this.lists, (r: any) => {
             return r.rate && !results.includes(r.rate)
        }), (r: any) => {
            return -r.all
        })

        // this.result.Other = await _.orderBy(_.filter(this.lists, (r: any) => {
        //     return (r.rate != 'AA' && r.rate != 'A' && r.rate != 'B' && r.rate != 'C' && r.rate != 'D' && r.rate != 'E' && r.rate != 'F')
        // }), (r: any) => {
        //     return -r.all
        // })


        this.fullData = await _.orderBy(this.lists, (r: any) => {
            return -r.all
        })
        let i =1
        this.fullData = await _.map(this.fullData,(r:any)=>{ 
          let obj = r
          obj.index = i++
          return obj;
        })
        let data = _.meanBy(this.fullData,(r:any)=>{return r.all})
       // alert(data);
        this.response = true;
    }

    async genAgency() {
        for (let i = 0; i < this.lists.length; i++) {
            this.exports.push({
                "หน่วยงาน": this.lists[i].agency.name,
                "คะแนน": this.lists[i].all,
                "ผล": this.lists[i].rate,
            })
        }
        // = await Core.getHttp(`/api/report/v1/reportall/?year=${this.year}`)
    }

    async onExport(data: any, name: any) {
        const dataWS = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, dataWS)
        XLSX.writeFile(wb, name)
    }

}
</script>
