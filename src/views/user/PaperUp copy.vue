<template>
  <div class="relative md:pt-32 pb-32 pt-12">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
      <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class="font-semibold text-xl text-gray-800">
            <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ข้อมูลประจำปี
            {{ year.year }} (มหาวิทยาลัยพะเยา)
          </h3>
          <hr class="border-gray-600 border-2 mt-2">
        </div>
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
          <div class="flex flex-wrap">

            <div class="block w-full overflow-x-auto">




              <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                <tr>
                  <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" >
                    ลำดับ
                  </th>
                  <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" >
                    ชื่อ
                  </th>
                  <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" >
                    รายละเอียด
                  </th>
                  <th class="px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" >
                    รายละเอียด
                  </th>
                  <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left" >
                    จัดการ
                  </th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="rate,index in rates" :key="index" :class="(index%2 != 0)?`bg-gray-200`:``" >
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
                    <h2>
                      <v-icon v-if="rate.result.length > 0" style="color:green;">mdi-check-circle</v-icon>
                      <v-icon v-else style="color:red;">mdi-clock-time-eight</v-icon>
                      การบันทึกข้อมูล (จำนวน Url {{rate.result.length}} )
                    </h2>

                    <h2>
                      <v-icon v-if="passingAllCheckTrue(rate.result)" style="color:green;">mdi-check-circle</v-icon>
                      <v-icon v-else  style="color:red;">mdi-clock-time-eight</v-icon>
                      การยืนยันจากหัวหน้าหน่วยงาน
                    </h2>
                    <hr class="mt-2 mb-2" >
                    <h2><v-icon   style="color:red;">mdi-clock-time-eight</v-icon> การตรวจและการให้คะแนน</h2>



                    <!--                                      <h2><v-icon style="color:orange;">mdi-check-circle</v-icon>  <v-icon style="color:green;">mdi-check-circle</v-icon> การยืนยันจากหัวหน้าหน่วยงาน </h2>-->
                    <!--                                      <h2>การตรวจและการให้คะแแนน</h2>-->

                    <!--                                      <pre>{{rate.result}}}</pre>-->
                    <!--                                           <h2 class="p-2 text-xl " :class="(rate.result.length)?`text-green-600`:`text-orange-600`">-->
                    <!--                                             <v-icon v-if="rate.result.length" color="success">mdi-check-underline-circle</v-icon>-->
                    <!--                                             <v-icon v-else color="error">mdi-information</v-icon>-->
                    <!--                                             ส่งแล้ว {{rate.result.length}}-->
                    <!--                                           </h2><br>-->
                    <!--                                            <div class="border-2 border-green-600 rounded shadow-xl p-2 bg-white" v-if="rate.result">-->
                    <!--                                              <h2>ตรวจแล้ว {{getPassingTest(rate.result,)}} / {{rate.result.length}}</h2><br>-->
                    <!--&lt;!&ndash;                                              <h2>ผ่านแล้ว {{getTest(rate.result)}} / {{rate.result.length}}</h2>&ndash;&gt;-->
                    <!--                                            </div>-->
                    <!--                                            <div v-else>-->
                    <!--                                                <div class="p-2 flex justify-center ">-->
                    <!--                                                    <div class="p-2 flex flex-col justify-center items-center ">-->
                    <!--                                                        <v-icon style="font-size:36px; color:#71b064;">mdi-clock-time-two</v-icon>-->
                    <!--                                                        <h2 class="text-tiny" style="color:#71b064;">รอตรวจสอบ</h2>-->
                    <!--                                                    </div>-->
                    <!--                                                </div>-->
                    <!--                                            </div>-->

                  </td>

                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div class="flex items-center">
                      <v-btn @click="openDialog(rate)" color="#5e5a98" dark v-if="(rate.result).length <= 0">
                        <v-icon>mdi-book-plus</v-icon>เพิ่มข้อมูล
                      </v-btn>
                      <v-btn @click="openDialog(rate)" color="#2e9837" dark v-else>
                        <v-icon>mdi-eye</v-icon>ดูข้อมูล
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

    <v-app v-if="dialog" style="z-index:9999;">
      <v-dialog v-model="dialog" persistent max-width="1000px">
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


              <v-expansion-panels>
                <v-expansion-panel v-if="passingDisableAdd(rateDatas)" >
                  <v-expansion-panel-header>
                    <h2>
                      <v-icon>mdi-plus-box</v-icon> เพิ่มข้อมูล
                    </h2>

                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <form @submit.prevent="saveData()">
                      <v-text-field required v-model="form.name" placeholder="ข้อความ" label="หัวข้อ" filled></v-text-field>
                      <v-select required :items="['เสร็จสิ้น','อยู่ระหว่างการปรับปรุง','ไม่มีข้อมูล']" v-model="form.register_type" filled placeholder="ยังไม่มีข้อมูล" label="สถานะ	"></v-select>

                      <v-text-field v-model="form.urls" placeholder="Url" label="Url" filled></v-text-field>
                      <v-textarea v-model="form.ref" placeholder="ระบุคำอธิบาย" label="คำอธิบายเพิ่มเติม" filled></v-textarea>
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
                    </form>

                  </v-expansion-panel-content>
                </v-expansion-panel><br>
                <v-divider></v-divider><br>
                <v-expansion-panel v-if="resultResponse" v-for="result,index in rateDatas" :key="index">

                  <v-expansion-panel-header>
                    <v-toolbar flat color="transparent">
                      <h2>{{result.name}}</h2>
                      <v-spacer></v-spacer>
                      <span v-if="!result.passing" class="bg-orange-400 p-2 rounded">
                                            <v-icon>mdi-information</v-icon>ยังไม่ได้ยืนยันจากหัวหน้าหน่วยงาน
                                        </span>
                      <span v-if="result.passing" class="bg-green-400 p-2 rounded ">
                                            <v-icon>mdi-check</v-icon>ยืนยันจากหัวหน้าหน่วยงานแล้ว
                                        </span>
                      <span v-if="result.tester" class="m-2 bg-blue-200 p-2 rounded">
                                            <v-icon>mdi-account-check</v-icon> มีการตรวจแล้ว
                                        </span>
                      <span v-if="result.rate_status == 4" class="m-2 bg-green-600 text-white p-2 rounded">
                                            <v-icon>mdi-check</v-icon> ข้อมูลครบถ้วนแล้ว ( {{result.score}} คะแนน )
                                        </span>
                    </v-toolbar>

                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-alert v-if="result.passing" type="success">
                      ได้รับการยืนยันจากหัวหน้าหน่วยงานแล้ว
                    </v-alert>
                    <v-alert v-if="!result.passing && form.id" type="info">
                      เนื้อหานี้จะยังไม่สามารถให้ผู้ตรวจ ตรวจได้เนื่องจากยังไม่ได้รับการยืนยัน จากหัวหน้าหน่วยงาน
                    </v-alert>
                    <form @submit.prevent="updateData(result)">
                      <v-text-field required v-model="result.name" placeholder="ข้อความ" label="หัวข้อ" filled></v-text-field>
                      <v-select required :items="['เสร็จสิ้น','อยู่ระหว่างการปรับปรุง','ไม่มีข้อมูล']" v-model="result.register_type" filled placeholder="ยังไม่มีข้อมูล" label="สถานะ	"></v-select>

                      <v-text-field v-model="result.urls" placeholder="Url" label="Url" filled></v-text-field>
                      <v-textarea v-model="result.ref" placeholder="ระบุคำอธิบาย" label="คำอธิบายเพิ่มเติม" filled></v-textarea>
                      <center>
                        <v-btn v-if="result.urls" color="#49bcff" @click="openLink(result.urls)" dark>
                          <v-icon>mdi-play</v-icon> เปิดลิ้ง
                        </v-btn> &nbsp;
                        <v-btn v-if="!result.id && !result.passing" type="submit" color="#2cb830" dark click="saveData()">
                          <v-icon>mdi-content-save</v-icon>
                          บันทึก
                        </v-btn>&nbsp;
                        <v-btn v-if="result.id && !result.passing" type="submit" color="#ff9f32" dark>
                          <v-icon>mdi-pen</v-icon> แก้ไข
                        </v-btn>&nbsp;
                        <v-btn v-if="result.id && !result.passing" color="red" dark @click="removeData(result)">
                          <v-icon>mdi-delete</v-icon> ลบ
                        </v-btn>
                      </center>
                    </form>

                    <div v-if="result.tester" class="mt-4">
                      <h2 class="text-xl">สถานะการตรวจสอบ</h2>
                      <br>
                      <v-alert v-if="result.rate_status == 4" type="success"  outlined>
                        ข้อมูลครบถ้วนแล้ว
                      </v-alert>
                      <v-alert v-else type="warning"  outlined>
                        ยังไม่สมบูรณ์
                      </v-alert>

                      <v-select  readonly v-model="result.rate_status" label="สถานะการตรวจสอบ" placeholder="ระบุสถานะ" :items="rateStatus" item-text="name" item-value="id" filled></v-select>
                      <v-text-field  readonly v-model="result.score" label="คะแนน" placeholder="ระบุตัวเลข" filled type="number"></v-text-field>
                      <v-textarea  readonly v-model="result.comment" placeholder="ข้อความ" label="ความคิดเห็น" filled></v-textarea>
                    </div>


                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <br> <br>
              <v-btn class="w-full" v-if="user.passing && passingAllCheck(rateDatas)"  @click="passingAllStore(rateDatas)"  x-large outlined color="deep-purple accent-4" dark  >
                <v-icon>mdi-bookmark-check</v-icon><b> ยืนยันการส่ง</b>
              </v-btn>
              <!--                      <v-btn @click="removePassingAllStore(rateDatas)">ยกเลิก</v-btn>-->


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
  private CURRNT_AGENGY:number = 0;
  private user: any = {}
  private year: any = []
  private rates: any = []
  private dialog: boolean = false
  private rate: any = {}
  private result: any = null
  private form: any = {}
  private formUpdate: any = null

  private urlList: any = null
  private urlResponse: boolean = true
  private url: any = []
  private urlForm: any = {}

  private rateDatas: any = []
  private response: boolean = false
  private resultResponse: boolean = false

  public async created() {

    await this.run()

  }
  rateStatus: any = []
  private async run() {
    let loader = await this.$loading.show()
    this.response = false;
    this.user = await User.getUser();
    this.CURRNT_AGENGY = 21
    this.year = await Core.getHttp(`/api/ita/v2/year/${this.$route.query.year}/`)
    this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.$route.query.year}/`)
    this.result = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.CURRNT_AGENGY}`)
    this.rateStatus = await Core.getHttp(`/api/ita/v1/ratestatus/`)
    await this.generateTable();
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

  private async updateData(data: any) {
    let update = await Core.putHttp(`/api/ita/v1/rateresult/${data.id}/`, data)
    if (update.id) {
      alert('แก้ไขข้อมูลสำเร็จแล้ว')
      await this.loadRateData(this.rate)
    }
  }

  private async removeData(data: any) {
    let check = confirm("คุณแน่ใจใช่ไหมที่จะลบรายการนี้")
    if (check) {
      let remove = await Core.deleteHttp(`/api/ita/v1/rateresult/${data.id}/`)
    }
    this.resultResponse = false;
    await this.loadRateData(this.rate)
    this.resultResponse = true;

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

  private async passingAllStore(datas:any[]){
    let check = confirm("คุณแน่ใจใช่ไหมที่จะส่งเนื้อหานี้ให้กับผู้ตรวจ")
    if(check){
      for(let i=0; i < datas.length; i++){
        await this.passingStore(datas[i])
      }
      await this.loadRateData(this.rate)
    }
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

  private async removePassingAllStore(datas:any[]){
    let check = confirm("คุณแน่ใจใช่ไหมที่จะยกเลิกส่งเนื้อหานี้ให้กับผู้ตรวจ")
    if(check){
      for(let i=0; i < datas.length; i++){
        await this.removePassingStore(datas[i])
      }
      await this.loadRateData(this.rate)
    }
  }

  private passingDisableAdd(datas:any[]){
    if(datas.length > 0){
      let passed = _.filter(datas,{passing:false})
      console.log(passed);
      return (passed.length >0) ? true:false;
    }else{
      return true;
    }
  }

  private passingAllCheck(datas:any[]){

    if(datas.length > 0){
      let passed = _.filter(datas,{passing:false})
      console.log(passed);
      return (passed.length >0) ? true:false;
    }else{
      return false;
    }

  }

  private passingAllCheckTrue(datas:any[]){

    if(datas.length > 0){
      let passed = _.filter(datas,{passing:true})
      //console.log(passed.length , datas);
      return (passed.length >0) ? true:false;
    }else{
      return false;
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
