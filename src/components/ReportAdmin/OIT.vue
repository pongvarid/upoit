<template>
  <div class="relative  pb-32  "  style="z-index:1;" >
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
                <tr v-for="rate,index in rates" :key="index" :class="(index % 2!=0)?`bg-gray-200`:``">
                  <th class="font-bold text-gray-700" style="width:20px!important;">

                    {{ rate.number }}

                  </th>
                  <td class="font-bold text-gray-700" >

                    {{ rate.name }}

                  </td>
                  <td  style="width:300px;" class="p-2">
                    <h2> {{getScoreAll(rate.result)}}</h2>

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
</template>


<script lang="ts">
import {
  Component, Prop,
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
  @Prop({default: null})
  public currentAgency!: any
  @Prop({default: null})
  public currentYear!: any
  
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
    this.year = await Core.getHttp(`/api/ita/v2/year/${this.currentYear.id}/`)
    this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.currentYear.id}/`)
    this.result = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.currentAgency.id}`)
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
    this.rateDatas = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.currentAgency.id}&rate=${this.rate.id}`)
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
    return score
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
    this.$emit('data',response)
  }
}
</script>

<style>
.f-white {
  color: white !important;
}
</style>