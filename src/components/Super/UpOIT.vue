<template>
  <div class="relative   pb-32  ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
      <div class="rounded-t mb-0 px-4   border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">

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
                    คะแนน
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="rate,index in rates" :key="index" :class="(index % 2!=0)?`bg-gray-200`:``">
                  <th class="font-bold text-gray-700" style="width:20px!important;">

                    {{ rate.number }}

                  </th>
                  <td class="font-bold text-gray-700"  >

                    {{ rate.name }}

                  </td>
                  <td   class="p-2">

                    {{getRandomInt(100)}}

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

  private async run() {
    let loader = await this.$loading.show()
    this.response = false;
    this.currentId = 27
    this.user = await User.getUser();
    this.year = await Core.getHttp(`/api/ita/v2/year/${3}/`)
    this.rates = await Core.getHttp(`/api/ita/v2/rate/${3}/`)
    this.rateStatus = await Core.getHttp(`/api/ita/v1/ratestatus/`)
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

  getRandomInt(max:any) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
</script>

<style>
.f-white {
  color: white !important;
}
</style>
