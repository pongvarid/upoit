<template>
  <div class="relative md:pt-32 pb-32 pt-12"  style="z-index:1;" >
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
                  <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                    ลำดับ
                  </th>
                  <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                    ชื่อ
                  </th>
                  <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                    รายละเอียด
                  </th>
                  <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                    จัดการ
                  </th>
                       <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]">
                    Url
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


                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div class="flex items-center">

                      <v-btn @click="openDialog(rate)" color="#987122" dark v-if="rate.result.length <= 0">
                        <v-icon>mdi-folder-information</v-icon>
                        ยังไม่มีข้อมูล
                      </v-btn>
                      <v-btn @click="openDialog(rate)" :color="(rate.result.tester)?'#2e9837':'#ff751a'" dark v-else>

                        <span v-if="!rate.result.tester"><v-icon>mdi-eye</v-icon>ตรวจสอบข้อมูล</span>
                        <span v-else><v-icon>mdi-book-check</v-icon>ตรวจสอบแล้ว</span>
                      </v-btn>
                      <!--                      <button @click="openDialog(rate)" :class="`bg-purple-600 f-white ${$xbtn}`" type="button">-->
                      <!--                        <span class="mdi mdi-grease-pencil"></span>-->
                      <!--                        ดูข้อมูล-->
                      <!--                      </button>-->


                    </div>
                  </td>
                  <td   class="p-2">
                    <h2 class="p-2 text-xl text-green-600">ส่งแล้ว {{rate.result.length}}</h2><br>
                    <div class="border-2 border-green-600 rounded shadow-xl p-2 bg-white" v-if="rate.result">
                      <h2>ตรวจแล้ว {{getPassingTest(rate.result,)}} / {{rate.result.length}}</h2><br>
                      <h2>ผ่านแล้ว {{getTest(rate.result)}} / {{rate.result.length}}</h2>
                    </div>
                    <div v-else>
                      <div class="p-2 flex justify-center ">
                        <div class="p-2 flex flex-col justify-center items-center ">
                          <v-icon style="font-size:36px; color:#71b064;">mdi-clock-time-two</v-icon>
                          <h2 class="text-tiny" style="color:#71b064;">รอตรวจสอบ</h2>
                        </div>
                      </div>
                    </div>
<!--                         <div v-if="rate.result" class="p-2   " >-->
<!--                            <div v-for="data,iindex in rate.result.urls" :key="iindex" class="p-2">  -->
<!--                              <v-btn class="w-full" @click="openLink(data.urls)" dark small color="#1188ff"><v-icon style="color:white;" >mdi-play</v-icon>{{data.name}}</v-btn> -->
<!--                            </div>-->
<!--                                        -->
<!--                       </div>  -->

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
      <v-dialog v-model="dialog" persistent max-width="500px">
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
              <v-tabs>
                <v-tab>การส่งข้อมูล</v-tab>
                <v-tab>การตรวจสอบ</v-tab>
                <v-tab-item><br>
                  <form @submit.prevent="(!form.id)?saveData():updateData(form)">

                    <v-text-field readonly v-model="form.name" placeholder="ข้อความ" label="หัวข้อ"
                                  filled></v-text-field>
                    <v-select readonly required :items="['เสร็จสิ้น','อยู่ระหว่างการปรับปรุง','ไม่มีข้อมูล']"
                              v-model="form.register_type"
                              filled placeholder="ยังไม่มีข้อมูล" label="สถานะ	"></v-select>
                    <v-text-field readonly v-model="form.ref" placeholder="คำอธิบายเพิ่มเติม" label="หมายเหตุ"
                                  filled></v-text-field>
                    <v-text-field readonly required v-model="form.urls" placeholder="้https://test//" label="URL"
                                  filled></v-text-field>
                    <center>
                      <v-btn v-if="form.urls" color="#49bcff" @click="openLink(form.urls)" dark>
                        <v-icon>mdi-play</v-icon>
                        เปิดลิ้ง
                      </v-btn> &nbsp;
                    </center>
                  </form>
                </v-tab-item>
                <v-tab-item><br>
                  <form @submit.prevent="updateData(form)" v-if="form.passing">
                    <v-select required v-model="form.rate_status" label="สถานะการตรวจสอบ" placeholder="ระบุสถานะ"
                              :items="rateStatus" item-text="name" item-value="id" filled></v-select>
                    <v-text-field required v-model="form.score" label="คะแนน" placeholder="ระบุตัวเลข" filled
                                  type="number"></v-text-field>
                    <v-textarea   v-model="form.comment" placeholder="ข้อความ" label="ความคิดเห็น"
                                filled></v-textarea>
                    <center>
                      <v-btn v-if="form.urls" color="#49bcff" @click="openLink(form.urls)" dark>
                        <v-icon>mdi-play</v-icon>
                        เปิดลิ้ง
                      </v-btn> &nbsp;
                      <v-btn type="submit" color="#3eb83e" dark>
                        <v-icon>mdi-clipboard-check</v-icon>
                        ยืนยันการจรวจสอบ
                      </v-btn> &nbsp;

                    </center>

                  </form>
                  <div v-else class="p-4">
                    <v-alert type="info">
                      ยังไม่สามารถตรวจสอบได้เนื่องจาก ยังไม่มีข้อมูลการส่งหรือ หัวหน้าหน่วยงานยังไม่อนุมัติการส่ง
                    </v-alert>
                  </div>
                </v-tab-item>
              </v-tabs>


            </div>
          </v-card-text>

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
import _ from 'lodash'

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
  private currentId: any | null = null
  private user: any = {}
  private year: any = []
  private rates: any = []
  private dialog: boolean = false
  private rate: any = {}
  private form: any = {}
  private formUpdate: any = null
  private rateDatas: any = []
  private rateStatus: any = []
  private response: boolean = false

  public async created() {

    await this.run()

  }
  result:any = []
  private async run() {
    let loader = await this.$loading.show()
    this.response = false;
    this.currentId = this.$route.query.id
    this.user = await User.getUser();
    this.year = await Core.getHttp(`/api/ita/v2/year/${this.$route.query.year}/`)
    this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.$route.query.year}/`)
    this.result = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.user.ext_link.agency}`)
    this.rateStatus = await Core.getHttp(`/api/ita/v1/ratestatus/`)
    await this.generateTable()
    this.response = true;
    await loader.hide()
  }

  private async generateTable() {
    for (let i = 0; i < this.rates.length; i++) {
      console.log(this.rates[i].id);
      let result: any = _.filter(this.result, {
        'rate': this.rates[i].id
      })
      this.rates[i].result = result
    }
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

  private async loadRateData() {
    this.rateDatas = await Core.putHttp(`/api/ita/v2/rateresult/`, {
      "agency": this.currentId,
      "rate": this.rate.id
    })
    if (this.rateDatas.id) {
      this.form = this.rateDatas
    }
  }

  private async getResultByUser(i: number) {
    return await Core.putHttp(`/api/ita/v2/rateresult/`, {
      "agency": this.currentId,
      "rate": this.rates[i].id
    })
  }

  private async updateData(data: any) {
    data.user = data.user.pk
    data.user_passing = data.user_passing.pk
    data.tester = this.user.pk
    let update = await Core.putHttp(`/api/ita/v1/rateresult/${data.id}/`, data)
    if (update.id) {
      this.form = {}
      await this.run()
      await this.loadRateData()

    }
  }



  private openLink(url: string) {
    window.open(url, '_blank');
  }
  getPassingTest(result:any){
    let res = _.filter(result,{'rate':4})
    return res.length;
  }

  getTest(result:any){
    let res = _.filter(result,function(o) { return o.tester != null; })
    return res.length;
  }
}
</script>

<style>
.f-white {
  color: white !important;
}
</style>