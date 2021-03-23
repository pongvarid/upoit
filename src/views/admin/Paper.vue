<template>
  <div class="relative md:pt-32 pb-32 pt-12"  style="z-index:1;" >
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
      <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class="font-semibold text-xl text-gray-800">
            <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ข้อมูลประจำปี
            {{ year.year }}  <span class="text-base" v-if="AGENCY_DATA">({{AGENCY_DATA.name}})</span>
          </h3>
          <hr class="border-gray-600 border-2 mt-2">
        </div>
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
          <div class="flex flex-wrap">

            <div class="block w-full overflow-x-auto bg-gray-100">


              <v-expansion-panels>
                <v-expansion-panel
                    v-for="(oit,index) in rates"
                    :key="index"
                >
                  <v-expansion-panel-header>

                      <h2 class="text-base font-bold" style="width:450px;">

                        {{oit.name}}


                      </h2>

                    <v-chip  v-if="passingAllCheckTrue(oit.result)" class="mr-4" color="primary" small  style="width:50px!important;"  >
                      <v-icon left> mdi-check-network</v-icon> หัวหน้าหน่วยงานยืนยันแล้ว  </v-chip>
                    <v-chip  v-else class="mr-4"  small  style="width:50px!important;"  >  <v-icon left> mdi-close-network </v-icon>  หัวหน้าหน่วยงานไม่ได้ยืนยัน </v-chip>

                    <v-chip small style="width:10px!important;"   v-if="oit.evaluate.score || oit.evaluate.score == 0" small    color="success"     text-color="white"  >  <v-icon left>  mdi-marker-check </v-icon>  ตรวจแล้ว  </v-chip>
                    <v-chip small style="width:10px!important;"   v-else small    >  <v-icon left>mdi-do-not-disturb-off</v-icon> ยังไม่ได้ตรวจ </v-chip>


                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p class="text-sm" v-html="oit.detail"></p>
                    <div class="flex flex-col md:flex-row">
                      <div class="w-full md:w-2/3">
                        <v-timeline align-top dense>
                          <v-timeline-item v-for="result,i in oit.result" :key="i" color="purple" small>
                            <h2 class="font-bold text-base">{{result.name}}</h2>
                            <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                            <p class="text-sm">{{result.ref}}</p>
                            <v-btn @click="openLink(result.urls)" dark color="purple" small><v-icon>mdi-play</v-icon>เปิดลิ้ง</v-btn>
                          </v-timeline-item>
                        </v-timeline>

                      </div>
                      <div class="w-full md:w-1/3">
                        <form v-if="passingAllCheckTrue(oit.result)"  @submit.prevent="(oit.evaluate.id)?updateEvaluate(oit):storeEvaluate(oit)" class="shadow-2xl md:border-t-2 md:border-b-2 md:border-purple-500 rounded-xl md:m-2 md:p-6 p-2" >
                          <h2 class="p-2 text-xl font-bold text-purple-800">การให้คะแนน</h2>
                          <v-select  required v-model="oit.evaluate.rate_status" label="สถานะการตรวจสอบ" placeholder="ระบุสถานะ"
                                    :items="rateStatus" item-text="name" item-value="id" filled></v-select>
                          <v-textarea  v-model="oit.evaluate.comment" label="ความคิดเห็น" placeholder="ข้อความ" outlined></v-textarea>
                          <input required v-model="oit.evaluate.score" type="radio" id="score0" name="score" :value="0">
                          <label class="p-2 text-base font-bold" for="score0">คะแนน 0</label><br>
                          <input required v-model="oit.evaluate.score" type="radio" id="score05" name="score" :value="0.5">
                          <label class="p-2  text-base font-bold"  for="score05">คะแนน 0.5</label><br>
                          <input required v-model="oit.evaluate.score" type="radio" id="score1" name="score" :value="1">
                          <label class="p-2  text-base font-bold"  for="score1">คะแนน 1</label>
                                  <br>
                          <center v-if="(oit.evaluate.id)" class="mt-6 mb-4"><v-btn type="submit" color="orange" dark large>แก้ไขการให้คะแนน</v-btn></center>
                          <center v-else class="mt-6 mb-4"><v-btn type="submit" color="success" dark large>บันทึกการให้คะแนน</v-btn></center>
                        </form>
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>






            </div>
          </div>

        </div>


      </div>

    </div>


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
  private AGENCY_DATA:any = null;
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
    this.AGENCY_DATA = await Core.getHttp(`api/ita/v2/agency/${this.currentId}/`)
    await this.generateTable()
    await this.generateScore();
    this.response = true;
    await loader.hide()
  }

  private async generateTable() {
    for (let i = 0; i < this.rates.length; i++) {
      // console.log(this.rates[i].id);
      let result: any = _.filter(this.result, {
        'rate': this.rates[i].id
      })
      this.rates[i].evaluate  = await this.getEvaluate(this.rates[i].id)
      this.rates[i].result = result

    }
  }

  private async getEvaluate(rateId:number){
    let data = await Core.getHttp(`/api/oit/v1/evaluateoit/?rate=${rateId}&agency=${this.currentId}`);
    return (data.length > 0)?data[0]:{}
  }
  private  async storeEvaluate(oit:any){
    if(oit.evaluate.rate_status){
      let form = {
        "score": oit.evaluate.score,
        "comment": (oit.evaluate.comment)?oit.evaluate.comment:'',
        "rate": oit.id,
        "rate_status": oit.evaluate.rate_status,
        "tester":  this.user.pk,
        "agency": Number(this.currentId)
      }
      let store = await Core.postHttp(`/api/oit/v1/evaluateoit/`,form)
      if(store.id){
        alert('ให้คะแนนสำเร็จแล้ว')
        location.reload()
      }
    }else{
      alert('กรุณาระบุสถานะการตรวจสอบ')
    }

  }
  private  async updateEvaluate(oit:any){
    if(oit.evaluate.rate_status){
      let form = {
        "id":oit.evaluate.id,
        "score": oit.evaluate.score,
        "comment": (oit.evaluate.comment)?oit.evaluate.comment:'',
        "rate": oit.id,
        "rate_status": oit.evaluate.rate_status,
        "tester":  this.user.pk,
        "agency": Number(this.currentId)
      }
      let store = await Core.putHttp(`/api/oit/v1/evaluateoit/${oit.evaluate.id}/`,form)
      if(store.id){
        alert('ให้คะแนนสำเร็จแล้ว')
        location.reload()
      }
    }else{
      alert('กรุณาระบุสถานะการตรวจสอบ')
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