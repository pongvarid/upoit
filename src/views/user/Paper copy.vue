<template>
<div class="relative md:pt-32 pb-32 pt-12">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="font-semibold text-xl text-gray-800">
                    <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ข้อมูลประจำปี
                    {{ year.year }}
                </h3>
                <hr class="border-gray-600 border-2 mt-2">
            </div>
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
                <div class="flex flex-wrap">

                    <div class="block w-full overflow-x-auto">
                        <table class="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                                        ลำดับ
                                    </th>
                                    <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                                        ชื่อ
                                    </th>
                                    <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                                        รายละเอียด
                                    </th>
                                    <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                                        รายละเอียด
                                    </th>
                                    <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                                        จัดการ
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="rate,index in rates" :key="index" :class="(index % 2!=0)?`bg-gray-200`:``">
                                    <th class="font-bold text-gray-700" style="width:20px!important;">

                                        {{ rate.number }}

                                    </th>
                                    <td class="font-bold text-gray-700" style="width:350px;">

                                        {{ rate.name }}

                                    </td>
                                    <td style="width:650px;" class="p-2">

                                        <p v-html="rate.detail"></p>

                                    </td>
                                    <td style="width:500px;" class="p-2">
                                        <div v-if="rate.result">
                                            <div class="border-2 border-green-600 rounded shadow-xl p-2 bg-white" v-if="rate.result.tester">
                                                <v-card-text>
                                                    <h2 class="text-base text-green-600 font-bold">
                                                        <v-icon style="color:green;">mdi-book-check</v-icon>ผลการตรวจสอบ
                                                    </h2>
                                                    <hr> <br>
                                                    <h2>คะแนน : {{rate.result.score}}</h2>
                                                    <h2 v-if="rate.result">สถานะ : {{rate.result.rate_status.name}}</h2>
                                                    <p>ความเห็น : {{rate.result.comment}}</p>
                                                </v-card-text>
                                            </div>
                                            <div v-else>
                                                <div class="p-2 flex justify-center ">
                                                    <div class="p-2 flex flex-col justify-center items-center ">
                                                        <v-icon style="font-size:36px; color:#71b064;">mdi-clock-time-two</v-icon>
                                                        <h2 class="text-tiny" style="color:#71b064;">รอตรวจสอบ</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="p-2 flex justify-center ">
                                            <div class="p-2 flex flex-col justify-center items-center ">
                                                <v-icon style="font-size:36px; color:#c16c3d;">mdi-folder-information</v-icon>
                                                <h2 class="text-tiny" style="color:#c16c3d;">ยังไม่มีข้อมูลการตรวจ</h2>
                                            </div>
                                        </div>
                                    </td>

                                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                        <div class="flex items-center">
                                            <v-btn @click="openDialog(rate)" color="#5e5a98" dark v-if="!rate.result">
                                                <v-icon>mdi-book-plus</v-icon>เพิ่มข้อมูล
                                            </v-btn>
                                            <v-btn @click="openDialog(rate)" color="#2e9837" dark v-else>
                                                <v-icon>mdi-eye</v-icon>ดูข้อมูล
                                            </v-btn>
                                            <!--                      <button @click="openDialog(rate)" :class="`bg-purple-600 f-white ${$xbtn}`" type="button">-->
                                            <!--                        <span class="mdi mdi-grease-pencil"></span>-->
                                            <!--                        ดูข้อมูล-->
                                            <!--                      </button>-->

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

    <v-app v-if="dialog">
        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card>
                <v-card-title>
                    <b>{{ rate.number }}. {{ rate.name }}</b>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeDialog" icon text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p v-html="rate.detail"></p>
                    <div class="block w-full overflow-x-auto">
                        <v-alert v-if="form.passing" type="success">
                            ได้รับการยืนยันจากหัวหน้าหน่วยงานแล้ว
                        </v-alert>
                        <v-alert v-if="!form.passing && form.id" type="info">
                            เนื้อหานี้จะยังไม่สามารถให้ผู้ตรวจ ตรวจได้เนื่องจากยังไม่ได้รับการยืนยัน จากหัวหน้าหน่วยงาน
                        </v-alert>

                        <form @submit.prevent="(!form.id)?saveData():updateData(form)">

                            <v-text-field required v-model="form.name" placeholder="ข้อความ" label="หัวข้อ" filled></v-text-field>
                            <v-select required :items="['เสร็จสิ้น','อยู่ระหว่างการปรับปรุง','ไม่มีข้อมูล']" v-model="form.register_type" filled placeholder="ยังไม่มีข้อมูล" label="สถานะ	"></v-select>
                            <v-text-field v-model="form.ref" placeholder="คำอธิบายเพิ่มเติม" label="หมายเหตุ" filled></v-text-field> 
                             <form v-if="!form.passing" @submit.prevent="storeUrlInRate()" class="flex flex-row flex-wrap bg-blue-200 p-4"> 
                                 <v-text-field dense v-model="urlForm.name"   class="w-1/4" required  placeholder="ชื่ออ้างอิง" label="ชื่อ url"  ></v-text-field>
                                <v-text-field dense  v-model="urlForm.urls" class="w-2/4"  required  placeholder="้https://test//" label="URL"  ></v-text-field>
                                  <v-btn class="w-1/4" small  type="submit" color="success"><v-icon>mdi-plus</v-icon>บันทึกลิ้งลงรายการ</v-btn>
                             </form>
                             <h2 class="text-blue-600 text-xl mt-2"><v-icon>mdi-open-in-browser</v-icon>รายการลิ้ง</h2> <br>
                              <div v-for="url,index in urlList" :key="index" class="flex flex-row ">
                                 <v-text-field v-model="url.name"   class="w-1/3" required  placeholder="ชื่ออ้างอิง" label="ชื่อ url" filled></v-text-field>
                                <v-text-field  v-model="url.urls" class="w-2/3"  required  placeholder="้https://test//" label="URL" filled></v-text-field>
                                 <v-btn class="m-2" @click=" openLink(url.urls)" x-small dark fab color="#1494d1"><v-icon>mdi-play</v-icon></v-btn>
                                <v-btn v-if="!form.passing" class="m-2"  @click="editUrlInRate(url)" x-small dark fab color="orange"><v-icon>mdi-floppy</v-icon></v-btn>
                                <v-btn v-if="!form.passing" class="m-2"  @click="removeUrlInRate(form.id,url.id)" x-small dark fab color="red"><v-icon>mdi-close</v-icon></v-btn>
                              </div>
                           
                             

                            <!-- <v-text-field required v-model="form.urls" placeholder="้https://test//" label="URL" filled></v-text-field> -->

                            <center v-if="!form.passing">

                                <v-btn v-if="form.urls" color="#49bcff" @click="openLink(form.urls)" dark>
                                    <v-icon>mdi-play</v-icon> เปิดลิ้ง
                                </v-btn> &nbsp;
                                <v-btn v-if="!form.id" type="submit" color="#2cb830" dark click="saveData()">
                                    <v-icon>mdi-content-save</v-icon>
                                    บันทึก
                                </v-btn>&nbsp;
                                <v-btn v-else type="submit" color="#ff9f32" dark>
                                    <v-icon>mdi-pen</v-icon> แก้ไข
                                </v-btn>&nbsp;
                                <v-btn v-if="form.id" color="red" dark @click="removeData(form)">
                                    <v-icon>mdi-delete</v-icon> ลบ
                                </v-btn>

                            </center>
                            <!-- <center v-else>
                                <v-btn v-if="form.urls" color="#49bcff" @click="openLink(form.urls)" dark>
                                    <v-icon>mdi-play</v-icon> เปิดลิ้ง
                                </v-btn> &nbsp;
                            </center> -->
                        </form>

                    </div>
                </v-card-text>
                <v-card-actions v-if="user.passing">

                    <div class="flex flex-col justify-center" v-if="!form.passing && form.id">
                        <v-btn x-large outlined color="deep-purple accent-4" dark @click="passingStore(form)">
                            <v-icon>mdi-bookmark-check</v-icon><b> ยืนยันการส่ง</b>
                        </v-btn>

                    </div>
                    <div class="flex flex-col justify-center" v-else>
                        <v-btn x-large outlined color="red" dark @click="removePassingStore(form)">
                            <v-icon>mdi-bookmark-remove</v-icon><b> ยกเลิกการส่ง</b>
                        </v-btn>

                    </div>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
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

    private user: any = {}
    private year: any = []
    private rates: any = []
    private dialog: boolean = false
    private rate: any = {}
    private form: any = {}
    private formUpdate: any = null

    private urlList:any = null
    private urlResponse:boolean = true
    private url:any = []
    private urlForm:any = {}
    


    private rateDatas: any = []
    private response: boolean = false

   

    public async created() {

        await this.run()

    }

    private async run() {
        let loader = await this.$loading.show()
        this.response = false;
        this.user = await User.getUser();
        this.year = await Core.getHttp(`/api/ita/v2/year/${this.$route.query.year}/`)
        this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.$route.query.year}/`)
        for (let i = 0; i < this.rates.length; i++) {
            let result = await this.getResultByUser(i)
            this.rates[i].result = (result.id) ? result : null
        }
        this.response = true;
        await loader.hide()
    }

    public async openDialog(rate: any) {
        this.rate = rate
        this.form.rate = rate.id
        this.form.name = rate.name
        await this.loadRateData();
        this.dialog = true;
    }

    public async closeDialog() {
        this.rate = null
        this.form = {}
        this.dialog = false;
    }

    private async saveData() {
        this.form.user = this.user.pk
        this.form.agency = this.user.ext_link.agency
        let data = await Core.postHttp(`/api/ita/v1/rateresult/`, this.form)
        if (data.id) {
            await this.loadRateData()
            // this.form.rate = rate.id
            // this.form.name = rate.name
            // this.form = {}
        }
        await this.run()
    }

    private async loadRateData() {
        this.rateDatas = await Core.putHttp(`/api/ita/v2/rateresult/`, {
            "agency": this.user.ext_link.agency,
            "rate": this.rate.id
        })
        await this.loadUrlInRate(this.rateDatas.id)
        if (this.rateDatas.id) {
            this.form = this.rateDatas
        }
    }

    private async getResultByUser(i: number) {
        return await Core.putHttp(`/api/ita/v2/rateresult/`, {
            "agency": this.user.ext_link.agency,
            "rate": this.rates[i].id
        })
    }

    private async updateData(data: any) {
        let update = await Core.putHttp(`/api/ita/v1/rateresult/${data.id}/`, data)
        if (update.id) {
            await this.loadRateData()
        }
    }

    private async removeData(data: any) {
        let check = confirm("คุณแน่ใจใช่ไหมที่จะลบรายการนี้")
        if (check) {
            let remove = await Core.deleteHttp(`/api/ita/v1/rateresult/${data.id}/`)

        }
        await this.loadRateData()

    }

    private async passingStore(data: any) {
        let check = confirm("คุณแน่ใจใช่ไหมที่จะส่งเนื้อหานี้ให้กับผู้ตรวจ")
        if (check) {
            let form = {
                "user_passing": this.user.pk,
                "passing": true
            }
            let store = await Core.putHttp(`/api/ita/v2/passing/${data.id}/`, form)
            if (store.id) {
                await this.loadRateData()
            }
        }

    }

    private async removePassingStore(data: any) {
        let check = confirm("คุณแน่ใจใช่ไหมที่จะส่งเนื้อหานี้ให้กับผู้ตรวจ")
        if (check) {
            let form = {
                "user_passing": this.user.pk,
                "passing": false
            }
            let store = await Core.putHttp(`/api/ita/v2/passing/${data.id}/`, form)
            if (store.id) {
                await this.loadRateData()
            }
        }

    }

    private async loadUrlInRate(rateId:number){
        this.urlList =  await Core.getHttp(`/api/ita/v1/urlrate/?rateresult=${rateId}`)
    }
    private async storeUrlInRate( ){  
        if(!this.rateDatas.id){
         await this.saveData();
        }
        this.urlForm.rateresult = this.rateDatas.id
        await Core.postHttp(`/api/ita/v1/urlrate/`,this.urlForm)  
        this.urlForm = {};
        await this.loadUrlInRate(this.rateDatas.id)
    }
    private async editUrlInRate(url:any){
      await Core.putHttp(`/api/ita/v1/urlrate/${url.id}/`,url)
      await this.loadUrlInRate(this.rateDatas.id)
      alert('แก้ไขลิ้งสำเร็จแล้ว')
    }
    private async removeUrlInRate(rateId:number,id:number){
      await Core.deleteHttp(`/api/ita/v1/urlrate/${id}/`)
      await this.loadUrlInRate(rateId)
    }

    private openLink(url: string) {
        window.open(url, '_blank');
    }

}
</script>

<style>
.f-white {
    color: white !important;
}
</style>
