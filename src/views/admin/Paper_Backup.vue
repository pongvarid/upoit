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
                  <th  class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
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
                    ข้อมูล
                  </th>


                </tr>
                </thead>
                <tbody>
                <tr v-for="rate,index in rates" :key="index"
                    :style="(getPassingTest(rate.result) == rate.result.length && rate.result.length > 0)  ? 'background-color:#5F9EA0;':''"
                    :class="(index%2 != 0)?`bg-gray-200`:``" >
                  <th class="font-bold text-gray-700" style="width:20px!important;">

                    {{ rate.number }}

                  </th>
                  <td class="font-bold text-gray-700" >

                    {{ rate.name }}

                  </td>
                  <td   class="p-2">

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
                    </div>
                  </td>
                  <td  style="width:300px;" class="p-2">
                    <!--                    <h2 class="p-2 text-xl text-green-600">ส่งแล้ว {{rate.result.length}}</h2><br>-->
                    <h2 class="p-2 text-xl " :class="(rate.result.length)?`text-green-600`:`text-orange-600`">
                      <v-icon v-if="rate.result.length" color="success">mdi-check-underline-circle</v-icon>
                      <v-icon v-else color="error">mdi-information</v-icon>
                      ส่งแล้ว {{rate.result.length}}
                    </h2><br>
                    <div class="border-2 border-green-600 rounded shadow-xl p-2 bg-white" v-if="rate.result">
                      <h2>ตรวจแล้ว {{getPassingTest(rate.result)}} / {{rate.result.length}}</h2><br>

                      <h2>คะแนน {{getScoreAll(rate.result)}}</h2>
                      <!--                      <h2>ผ่านแล้ว {{getTest(rate.result)}} / {{rate.result.length}}</h2>-->
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
      <v-dialog v-model="dialog" persistent max-width="900px">
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
              <!--              <v-alert v-if="form.passing" type="success">-->
              <!--                ได้รับการยืนยันจากหัวหน้าหน่วยงานแล้ว-->
              <!--              </v-alert>-->
              <!--              <v-alert v-if="!form.passing && form.id" type="info">-->
              <!--                เนื้อหานี้จะยังไม่สามารถให้ผู้ตรวจ ตรวจได้เนื่องจากยังไม่ได้รับการยืนยัน จากหัวหน้าหน่วยงาน-->
              <!--              </v-alert>-->

              <v-expansion-panels>
                <v-expansion-panel  v-for="data_rate,index in rateDatas" :key="index" >
                  <v-expansion-panel-header>
                    <v-toolbar flat color="transparent">
                      <h2>{{data_rate.name}}</h2>
                      <v-spacer></v-spacer>
                      <span v-if="!data_rate.passing" class="bg-orange-400 p-2 rounded">
                                            <v-icon>mdi-information</v-icon>ยังไม่ได้ยืนยันจากหัวหน้าหน่วยงาน
                                        </span>
                      <span v-if="data_rate.passing" class="bg-green-400 p-2 rounded ">
                                            <v-icon>mdi-check</v-icon>ยืนยันจากหัวหน้าหน่วยงานแล้ว
                                        </span>
                      <span v-if="data_rate.tester" class="m-2 bg-blue-200 p-2 rounded">
                                            <v-icon>mdi-account-check</v-icon> มีการตรวจแล้ว
                                        </span>
                      <span v-if="data_rate.rate_status == 4" class="m-2 bg-green-600 text-white p-2 rounded">
                                            <v-icon>mdi-check</v-icon> ข้อมูลครบถ้วนแล้ว ( {{data_rate.score}} คะแนน )
                                        </span>
                    </v-toolbar>

                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-tabs>
                      <v-tab>การส่งข้อมูล</v-tab>
                      <v-tab>การตรวจสอบ</v-tab>
                      <v-tab-item><br>

                        <form @submit.prevent="(!data_rate.id)?saveData():updateData(data_rate)">

                          <v-text-field readonly v-model="data_rate.name" placeholder="ข้อความ" label="หัวข้อ"
                                        filled></v-text-field>
                          <v-select readonly required :items="['เสร็จสิ้น','อยู่ระหว่างการปรับปรุง','ไม่มีข้อมูล']"
                                    v-model="data_rate.register_type"
                                    filled placeholder="ยังไม่มีข้อมูล" label="สถานะ	"></v-select>
                          <v-text-field readonly v-model="data_rate.ref" placeholder="คำอธิบายเพิ่มเติม" label="หมายเหตุ"
                                        filled></v-text-field>
                          <v-text-field readonly required v-model="data_rate.urls" placeholder="้https://test//" label="URL"
                                        filled></v-text-field>

                          <center>
                            <v-btn v-if="data_rate.urls" color="#49bcff" @click="openLink(data_rate.urls)" dark>
                              <v-icon>mdi-play</v-icon>
                              เปิดลิ้ง
                            </v-btn> &nbsp;
                          </center>
                        </form>
                      </v-tab-item>
                      <v-tab-item><br>

                        <form @submit.prevent="updateData(data_rate)" v-if="data_rate.passing">
                          <v-select required v-model="data_rate.rate_status" label="สถานะการตรวจสอบ" placeholder="ระบุสถานะ"
                                    :items="rateStatus" item-text="name" item-value="id" filled></v-select>
                          <v-text-field required v-model="data_rate.score" label="คะแนน" placeholder="ระบุตัวเลข" filled
                                        type="number"></v-text-field>
                          <v-textarea   v-model="data_rate.comment" placeholder="ข้อความ" label="ความคิดเห็น"
                                        filled></v-textarea>
                          <center>
                            <v-btn v-if="data_rate.urls" color="#49bcff" @click="openLink(data_rate.urls)" dark>
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

                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>





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

  private scoreAll:number = 0
  private scoreArr:any = [];
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
    this.result = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.$route.query.id}`)
    this.rateStatus = await Core.getHttp(`/api/ita/v1/ratestatus/`)
    await this.generateTable()
    await this.generateScore();
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
    await this.loadRateData(rate);
    this.dialog = true;
  }

  public async closeDialog() {
    this.rate = null
    this.form = {}
    this.dialog = false;
  }
  resultResponse:boolean = false
  private async loadRateData(rate:any) {
    this.rate = await Core.getHttp(`/api/ita/v1/rate/${rate.id}/`)
    this.form.rate = rate.id
    this.form.name = rate.name
    this.rateDatas = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.$route.query.id}&rate=${this.rate.id}`)
    console.log(this.rate)
    this.resultResponse = true;
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
      await this.loadRateData(this.rate)

    }
  }



  private openLink(url: string) {
    window.open(url, '_blank');
  }
  getTest(result:any){
    let res = _.filter(result,{'rate':4})
    return res.length;
  }

  getPassingTest(result:any){
    let res = _.filter(result,function(o) { return o.tester != null; })
    return res.length;
  }
  getScoreAll(result:any){
    let score = _.meanBy(result, (p:any) => p.score);
    return isNaN(score)?0:score
  }

  async generateScore(){
    let listView = [];
    for (let index = 0 ; index < this.rates.length ; index++){

      let score = _.meanBy(this.rates[index].result, (p:any) => p.score);
      listView.push({
        "name":this.rates[index].name,
        "score":score,
        "order":index
      })

    }
    let scoreTmp = _.meanBy(listView, (p:any) => p.score)
    let response = {
      "list":listView,
      "score_avg":scoreTmp,
      "score60":((scoreTmp/100)*60).toFixed(2)
    }
    console.log('[dd]',response)

  }
}
</script>

<style>
.f-white {
  color: white !important;
}
</style>