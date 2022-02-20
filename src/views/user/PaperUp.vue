<template>
<div class="relative md:pt-32 pb-32 pt-12" v-if="user.ext_link.oit">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="font-semibold text-xl text-gray-800">
                    <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ข้อมูลประจำปี
                    {{ year.year }} <span class="text-base" v-if="AGENCY_DATA">({{AGENCY_DATA.name}})</span>
                </h3>
                <hr class="border-gray-600 border-2 mt-2">
            </div>
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
                <div class="flex flex-wrap">

                    <div class="block w-full overflow-x-auto">
                        <div v-for="g,gindex in group" :key="gindex">
                            <h2 class="text-xl m-4 font-semibold text-purple-500">ตัวชี้วัดที่ {{(gindex == 0)?9:10}} : {{g.type_base}}</h2>
                            <div v-for="type_g,type_gindex in g.base_data" :key="type_gindex">

                                <h2 class="text-base  m-4 font-semibold text-red-400" v-if="type_g.type == 'ข้อมูลพื้นฐาน'">ตัวชี้วัดที่ 9.1 ข้อมูลพื้นฐาน</h2>
                                <h2 class="text-base  m-4 font-semibold text-red-400" v-if="type_g.type == 'การดำเนินงาน'">ตัวชี้วัดที่ 9.2 การบริหารงาน</h2>
                                <h2 class="text-base  m-4 font-semibold text-red-400" v-if="type_g.type == 'แผนการใช้จ่ายงบประมาณประจำปี'">ตัวชี้วัดที่ 9.3 การบริหารเงินงบประมาณ</h2>
                                <h2 class="text-base  m-4 font-semibold text-red-400" v-if="type_g.type == 'การบริหารและพัฒนาทรัพยากรบุคคล'">ตัวชี้วัดที่ 9.4 การบริหารและพัฒนาทรัพยากรบุคคล</h2>
                                <h2 class="text-base  m-4 font-semibold text-red-400" v-if="type_g.type == 'การจัดการเรืองร้องเรียนการทุจริตและประพฤติมิชอบ'">ตัวชี้วัดที่ 9.5 การส่งเสริมความโปร่งใสและ การจัดการเรืองร้องเรียนการทุจริตและประพฤติมิชอบ</h2>
                                <h2 class="text-base  m-4 font-semibold text-red-400" v-if="type_g.type == 'เจตจำนงสุจริตของผู้บริหาร'">ตัวชี้วัดที่ 10.1 การดำเนินการเพื่อป้องกันการทุจริต</h2>
                                <h2 class="text-base  m-4 font-semibold text-red-400" v-if="type_g.type == 'มาตรการส่งเสริมความโปร่งใสและป้องกันการทุจริตภายในหน่วยงาน'">ตัวชี้วัดที่ 10.2 มาตรการภายในเพื่อป้องกันการทุจริต</h2>
                                <h2 class="text-base  m-4   text-red-400">{{type_g.type}}</h2>
                                <table class="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                                                ข้อ
                                            </th>
                                            <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                                                ข้อมูล /องค์ประกอบ
                                            </th>
                                            <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                                                สถานะ
                                            </th>
                                            <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                                                บันทึกข้อมูล
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="rate,index in type_g.data" :key="index" :class="(index%2 != 0)?`bg-gray-200`:``">
                                            <th class="font-bold text-gray-700" style="width:20px!important;">
                                                O{{ rate.number }}

                                            </th>
                                            <td class="font-bold text-gray-700 pt-2 pb-2" style="width:600px;">
                                                <br><br>
                                                {{ rate.name }}<br><br>
                                                <p class="text-sm font-thin" style="white-space: pre-wrap;" v-html="rate.detail"></p>
                                                <br><br>
                                            </td>

                                            <td style="width:300px;" class="p-2">
                                                <h2 class="text-sm">
                                                    <v-icon v-if="rate.result.length > 0" style="color:green;">mdi-check-circle</v-icon>
                                                    <v-icon v-else style="color:red;">mdi-clock-time-eight</v-icon>
                                                    การบันทึกข้อมูล<br> <b class="ml-4 " :class="(rate.result.length > 0)?`text-green-600`:`text-red-600`">(จำนวน Url {{rate.result.length}} )</b>
                                                </h2>

                                                <h2 class="text-sm">
                                                    <v-icon v-if="passingAllCheckTrue(rate.result)" style="color:green;">mdi-check-circle</v-icon>
                                                    <v-icon v-else style="color:red;">mdi-clock-time-eight</v-icon>
                                                    การยืนยันจากหัวหน้าหน่วยงาน
                                                </h2>
                                                <hr class="mt-2 mb-2">
                                                <h2 class="text-sm">
                                                    <v-icon style="color:red;">mdi-clock-time-eight</v-icon> การตรวจและการให้คะแนน
                                                </h2>

                                            </td>

                                            <td class="font-bold text-gray-700 pt-6 pb-2" style="width:1050px;">
                                                <form @submit.prevent="storeResult(formResult[rate.number -1],rate.number -1)">
                                                    <div class="m-1 flex flex-row">
                                                        <v-select style="width:60px;" dense outlined :items="['เสร็จสิ้น','อยู่ระหว่างการปรับปรุง','ไม่มีข้อมูล']" v-model="formResult[rate.number -1].register_type" label="สถานะ"></v-select>
                                                        <v-text-field class="ml-1" v-model="formResult[rate.number -1].urls" dense outlined name="name" label="Url" id="id"></v-text-field>
                                                        <v-textarea rows="2" required v-model="formResult[rate.number -1].ref" class="ml-2" dense outlined name="name" label="คำอธิบาย Url" id="id"></v-textarea>
                                                        <v-btn type="submit" class="ml-1" color="info">
                                                            <span v-if="(rate.result).length ==0">
                                                                <v-icon>mdi-content-save</v-icon> บันทึกข้อมูล
                                                            </span>
                                                            <span v-else>
                                                                <v-icon>mdi-plus</v-icon> เพิ่มข้อมูล
                                                            </span>
                                                        </v-btn>
                                                    </div>

                                                </form>
                                                <v-divider></v-divider><br>

                                                <div class="p-4 rounded-xl bg-green-200">
                                                    <form @submit.prevent="updateData(res,rate.number -1)" v-for="res,res_index in rate.result" :key="res_index">
                                                        <div class="m-1 flex flex-row">
                                                            <v-select style="width:60px;" dense outlined :items="['เสร็จสิ้น','อยู่ระหว่างการปรับปรุง','ไม่มีข้อมูล']" v-model="res.register_type" label="สถานะ"></v-select>
                                                            <v-text-field class="ml-1" v-model="res.urls" dense outlined name="name" label="Url" id="id"></v-text-field>
                                                            <v-btn x-small class="ml-1" fab v-if="res.urls" color="#49bcff" @click="openLink(res.urls)" dark>
                                                                <v-icon>mdi-play</v-icon>
                                                            </v-btn>
                                                            <v-textarea rows="2" required v-model="res.ref" class="ml-2" dense outlined name="name" label="คำอธิบาย Url" id="id"></v-textarea>
                                                            <v-btn v-if="passingAllCheck(rate.result)" x-small type="submit" fab class="ml-1" color="warning">
                                                                <v-icon>mdi-pencil</v-icon>
                                                            </v-btn>
                                                            <v-btn v-if="passingAllCheck(rate.result)" @click="removeData(res,rate.number -1)" x-small class="ml-3 mr-3" fab color="red" dark>
                                                                <v-icon>mdi-delete</v-icon>
                                                            </v-btn>
                                                        </div>
                                                    </form>

                                                    <v-btn class="w-full" v-if="user.passing &&  passingAllCheck(rate.result)" @click="passingAllStore(rate.result)" x-large outlined color="deep-purple accent-4" dark>
                                                        <v-icon>mdi-bookmark-check</v-icon><b> ยืนยันการส่ง</b>
                                                    </v-btn>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>

    </div>

</div>
<div class="pt-20" v-else>
    <v-alert type="error" :value="true">
        คุณไม่สามารถใช้งานข้อมูลส่วนนี้ได้ เนื่องจากสิทธิ์ในการเข้า
        ถึงไม่ได้ถูกกำหนดไว้ กรุณาติดต่อผุู้ดูแลระบบ
    </v-alert>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';

import _ from 'lodash'
import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'

@Component({
    components: {

    },
    props: {
        color: {
            default: "light",
            validator: function (value) {
                // The value must match one of these strings
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    }
})
export default class Home extends Vue {
    private CURRNT_AGENGY: number = 21;
    private AGENCY_DATA: any = null;
    private user: any = {}
    private year: any = []
    private rates: any = []
    private dialog: boolean = false
    private rate: any = {}
    private result: any = null
    private form: any = {}
    private formResult: any = []
    private formUpdate: any = null

    private urlList: any = null
    private urlResponse: boolean = true
    private url: any = []
    private urlForm: any = {}

    private rateDatas: any = []
    private response: boolean = false
    resultResponse: boolean = false
    group: any = []
    scroll: number = 0
    public async created() {

        await this.run()
        window.addEventListener("scroll", () => {
            this.scroll = window.scrollY;
        });

    }
    rateStatus: any = []
    private async run() {
        let loader = await this.$loading.show()
        this.response = false;
        this.user = await User.getUser();
        this.CURRNT_AGENGY = 21
        this.AGENCY_DATA = await Core.getHttp(`api/ita/v2/agency/${this.CURRNT_AGENGY}/`)
        this.year = await Core.getHttp(`/api/ita/v2/year/${this.$route.query.year}/`)
        this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.$route.query.year}/`)
        this.result = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.CURRNT_AGENGY}&rate__year=${this.$route.query.year}`)
        this.rateStatus = await Core.getHttp(`/api/ita/v1/ratestatus/`)
        await this.generateTable();
        await this.genGroup()
        this.response = true;
        await loader.hide()

    }
    i: any = 1
    dataIndex(index: any) {
        return index
    }

    private async genGroup() {
        this.group = await _.chain(this.rates)
            .groupBy("type_base")
            .map((value, key) => ({
                type_base: key,
                base_data: _.chain(value)
                    .groupBy("type")
                    .map((value, key) => ({
                        type: key,
                        data: value
                    }))
                    .value()
            }))
            .value()

    }

    private async generateTable() {
        for (let i = 0; i < this.rates.length; i++) {
            console.log(this.rates[i].id);
            let result: any = _.filter(this.result, {
                'rate': this.rates[i].id
            })
            this.rates[i].result = result
            this.formResult[i] = {
                name: this.rates[i].name,
                rate: this.rates[i].id,
                user: this.user.pk,
                agency: this.CURRNT_AGENGY,
                register_type: ""
            }

        }
    }

    async storeResult(form: any, index: number) {
        if (this.formResult[index].register_type) {
            let scroll = this.scroll
            let loader = await this.$loading.show()
            let data = await Core.postHttp(`/api/ita/v1/rateresult/`, form)
            if (data.id) {
                alert('บันทึกข้อมูลสำเร็จแล้ว')
                this.formResult[index].urls = ''
                this.formResult[index].register_type = null
                this.formResult[index].ref = ''
                await this.loadResult(data.rate, index)
            } else {
                alert("กรุณาตรวจสอบข้อมูลให้ถูกต้อง")
            }

            loader.hide()
            window.scrollTo(0, scroll);
        } else {
            alert("กรุณาระบุสถานะของข้อมูล")
        }

    }

    public async openDialog(rate: any) {

        await this.loadRateData(rate);
        this.dialog = true;

    }
    private async loadRateData(rate: any) {
        this.rate = await Core.getHttp(`/api/ita/v1/rate/${rate.id}/`)
        this.form.rate = rate.id
        this.form.name = rate.name
        this.rateDatas = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.CURRNT_AGENGY}&rate=${this.rate.id}`)
        console.log(this.rate)
        this.resultResponse = true;
    }

    public async closeDialog() {
        this.rate = null
        this.form = {}
        this.dialog = false;
        this.resultResponse = false;
    }

    private async loadResult(id: number, index: number) {
        this.response = false;
        this.rates[index].result = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.CURRNT_AGENGY}&rate__year=${this.$route.query.year}&rate=${id}`)

        this.response = true;
    }

    private async saveData() {
        this.form.user = this.user.pk
        this.form.agency = this.CURRNT_AGENGY
        let data = await Core.postHttp(`/api/ita/v1/rateresult/`, this.form)
        if (data.id) {
            alert('บันทึกข้อมูลสำเร็จแล้ว')
            this.form = {}
            await this.loadRateData(this.rate)
        }
        await this.run()
    }

    private async getResultByUser(i: number) {
        return await Core.putHttp(`/api/ita/v2/rateresult/`, {
            "agency": this.CURRNT_AGENGY,
            "rate": this.rates[i].id
        })
    }

    private async updateData(data: any, index: number) {
        let loader = await this.$loading.show()
        let scroll = this.scroll
        let update = await Core.putHttp(`/api/ita/v1/rateresult/${data.id}/`, data)
        if (update.id) {
            alert('แก้ไขข้อมูลสำเร็จ')
            await this.loadResult(data.rate, index)
        }
        loader.hide()
        window.scrollTo(0, scroll);
    }

    private async removeData(data: any, index: number) {
        let scroll = this.scroll
        let check = confirm("คุณแน่ใจใช่ไหมที่จะลบรายการนี้")
        let loader = await this.$loading.show()
        if (check) {
            let remove = await Core.deleteHttp(`/api/ita/v1/rateresult/${data.id}/`)
            await this.loadResult(data.rate, index)
        }
        loader.hide()
        window.scrollTo(0, scroll);

    }

    private async passingStore(data: any) {
        let form = {
            "user_passing": this.user.pk,
            "passing": true
        }
        let store = await Core.putHttp(`/api/ita/v2/passing/${data.id}/`, form)
        if (store.id) {
            console.log('ยืนยันการส่งสำเร็จ');
        }
    }

    private async passingAllStore(datas: any[]) {
        let check = confirm("คุณแน่ใจใช่ไหมที่จะส่งเนื้อหานี้ให้กับผู้ตรวจ")
        let scroll = this.scroll
        let loader = await this.$loading.show()
        if (check) {
            for (let i = 0; i < datas.length; i++) {
                await this.passingStore(datas[i])
            }
            await this.run()
        }
        loader.hide()
        window.scrollTo(0, scroll);
    }

    private async removePassingStore(data: any) {

        let form = {
            "user_passing": this.user.pk,
            "passing": false
        }
        let store = await Core.putHttp(`/api/ita/v2/passing/${data.id}/`, form)
        if (store.id) {
            console.log('ยกเลิก');
        }

    }

    private async removePassingAllStore(datas: any[]) {

        let check = confirm("คุณแน่ใจใช่ไหมที่จะยกเลิกส่งเนื้อหานี้ให้กับผู้ตรวจ")
        if (check) {
            for (let i = 0; i < datas.length; i++) {
                await this.removePassingStore(datas[i])
            }
            await this.loadRateData(this.rate)
        }
    }

    private passingDisableAdd(datas: any[]) {
        if (datas.length > 0) {
            let passed = _.filter(datas, {
                passing: false
            })
            console.log(passed);
            return (passed.length > 0) ? true : false;
        } else {
            return true;
        }
    }

    private passingAllCheck(datas: any[]) {

        if (datas.length > 0) {
            let passed = _.filter(datas, {
                passing: false
            })
            console.log(passed);
            return (passed.length > 0) ? true : false;
        } else {
            return false;
        }

    }

    private passingAllCheckTrue(datas: any[]) {

        if (datas.length > 0) {
            let passed = _.filter(datas, {
                passing: true
            })
            //console.log(passed.length , datas);
            return (passed.length > 0) ? true : false;
        } else {
            return false;
        }

    }

    private openLink(url: string) {
        window.open(url, '_blank');
    }

    getPassingTest(result: any) {
        let res = _.filter(result, {
            'rate': 4
        })
        return res.length;
    }

    getTest(result: any) {
        let res = _.filter(result, function (o) {
            return o.tester != null;
        })
        return res.length;
    }

}
</script>

<style>
.f-white {
    color: white !important;
}
</style>
