<template>
  <div class="relative md:pt-32 pb-32 pt-12"  style="z-index:1;" v-if="response">

    <v-toolbar>

      <h2 class="text-xl font-bold">ผลการประเมิน OIT ({{agency.name}})</h2>

      <v-spacer></v-spacer>
      <v-icon>mdi-calendar</v-icon>
      {{year.year}}
    </v-toolbar>

    <v-toolbar flat color="transparent"  v-for="(oit,index) in rates"
               :key="index">
      <h2><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
      <v-spacer></v-spacer>
      <h2>{{oit.score}}</h2>
    </v-toolbar>

  </div>
</template>


<script lang="ts">
import {
  Component, Prop,
  Vue
} from 'vue-property-decorator';

import { Web } from "@/store/web";
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
  @Prop({default:7})
  agencyData:any;

  @Prop({default:'2563'})
  yearData:any ;
  private year: any = []
  private rates: any = []
  private response: boolean = false

  private agency:any = {};
  public async created() {

    await this.run()

  }
  result:any = []
  private async run() {
    await Web.switchLoad(true)
    this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.agencyData}/`)
    this.year = await Core.getHttp(`/api/ita/v2/year/`)
    this.year   = await _.find(this.year,{year:this.yearData})
    if(this.year){
      this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.year.id}/`)
      this.result = await Core.getHttp(`/api/oit/v1/evaluateoit/?agency=${this.agencyData}`)

      await this.generateTable()
      await Web.switchLoad(false)
      this.response = true;
    } await Web.switchLoad(false)

  }

  private async generateTable() {
    for (let i = 0; i < this.rates.length; i++) {
      // console.log(this.rates[i].id);
      let result: any = _.filter(this.result, {
        'rate': this.rates[i].id
      })
      //this.rates[i].evaluate  = await this.getEvaluate(this.rates[i].id)

      let score = ((await _.sumBy(result,'score'))/1)*100
      this.rates[i].score = score + "%"

    }
  }


}
</script>

<style>
.f-white {
  color: white !important;
}
</style>