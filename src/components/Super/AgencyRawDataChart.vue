<template>
  <div  >
    <div class="flex flex-wrap flex-col md:flex-row" v-if="response">

      <h2 class="text-2xl"   >รายละเอียดการประเมิน</h2>
      <v-tabs v-model="tab" v-if="responseDetail">
        <v-tab>IIT</v-tab>
        <v-tab-item>
          <AgencyIIT v-if="tab==0" :yearData="year" :agencyData="agency" />
        </v-tab-item>
        <v-tab>EIT</v-tab>
        <v-tab-item>
          <AgencyEIT v-if="tab==1"  :yearData="year" :agencyData="agency"></AgencyEIT>
        </v-tab-item>
        <v-tab>OIT</v-tab>
        <v-tab-item>
          <AgencyOIT v-if="tab==2"  :yearData="year" :agencyData="agency" ></AgencyOIT>
        </v-tab-item>
      </v-tabs>
      <div v-else>
        <center  ><br><br><br>
          <i class="em em-golf text-4xl" aria-role="presentation" aria-label="FLAG IN HOLE"></i>
          <h2 class="p-4">ไม่มีข้้อมูลรายระเอียดการประเมิน</h2>
        </center>
      </div>


    </div>
    <div v-else>
      <center>
      <v-icon  style="font-size:62px;">mdi-information</v-icon>
      <h2>ไม่พบข้อมูลการประเมิน</h2>
      </center>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,Prop,
  Vue
} from 'vue-property-decorator';
import {
  Core
} from '@/store/core'
import {
  Auth
} from '@/store/auth'
import {
  User
} from '@/store/user'
import AgencyIIT from './AgencyIIT.vue'
import AgencyOIT from './AgencyOIT.vue'
import AgencyEIT from './AgencyEIT.vue'
import _ from 'lodash'
import XLSX from 'xlsx'
@Component({
  components: {
    AgencyIIT,AgencyOIT,AgencyEIT,
  },
})
export default class Home extends Vue {

  @Prop({default:7})
  agency:any;

  @Prop({default:'2563'})
  year:any ;

  tab:number = 0
  responseDetail:boolean = true
  lists:any = null
  all:any = null
  response:boolean = false
  series: any = [{
    name: 'คะแนน',
    data: [],
  }]
  chartOptions: any = {
    chart: {
      height: 350,
      type: 'radar',
    },
    title: {},
    xaxis: {
      categories:[]
     }
  }
  async created() {
    await this.loadAll();
    await this.loadLists();
    await this.generateGraph();
    this.response = true
  }

  async loadAll(){
    let data =  await Core.getHttp(`/api/report/v1/reportall/?year=${this.year}&agency=${this.agency}`)
    if(data.length > 0){
      this.all = data[0]
    }else{
      this.response = false;
    }
  }

  async loadLists(){
    let data =  await Core.getHttp(`/api/report/v1/reportdetail/?year=${this.year}&agency=${this.agency}`)
    this.lists = _.orderBy(data,'order','asc') ;
  }

  async generateGraph(){
      let categories = _.map(this.lists, 'name');
      let score = _.map(this.lists, 'score');
      this.series[0].data = score
      this.chartOptions.xaxis.categories = categories

      console.log('[DATA GRAPH]',categories,score)

  }

  prePrint(){
    window.print();
  }

  getColor(score:number){
    if(score <= 20){
      return "#C70039"
    }else if(score <= 50){
      return "#c77e00"
    }else if(score <= 75){
      return "#bac700"
    }else{
      return "#4cc700"
    }
  }

  async genData(dataA:any,dataB:any){
    await this.onExport(dataA)
    await this.onExport(dataB)
  }

  async onExport(data:any) {
    const dataWS = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, dataWS)
    XLSX.writeFile(wb,'export.xlsx')
  }


}
</script>

<style>
.md\:w-74 {
  width: 26rem;
}

.f-white {
  color: white;
}
</style>
