<template>
  <div  >
     <h2><b>คะแนนภาพรวมหน่วยงานภายในมหาวิทยาลัยพะเยา</b> :  {{(all.all).toFixed(2)}} คะแนน</h2> 
      <h2><b>ระดับผลการประเมิน </b> : {{all.rate}} </h2> 
          <div class="flex flex-wrap">
          <bin-card class="m-2" c="rgb(51, 102, 204)" :h="all.iit" t="คะแนน" i="IIT"></bin-card>
          <bin-card class="m-2" c="rgb(255, 102, 0)"  :h="all.eit"  t="คะแนน" i="EIT"></bin-card>
          <bin-card class="m-2" c="rgb(77, 153, 0)"  :h="all.oit"  t="คะแนน" i="OIT"></bin-card>
        </div><br>
        
    <div class="flex flex-wrap flex-col md:flex-row" v-if="response"> 
   
      <div class="w-full"  > 

        <apexchart type="radar" height="450px" :options="chartOptions" :series="series"></apexchart>
       
      </div>
      <div class="w-full  " > 
        <h2 class="font-bold">รายละเอียดการประเมิน</h2>
        <v-card class="m-2 p-4 elevation-5" v-for="item,index in lists" :key="index">
          <b>{{item.order}}.{{item.name}}</b> ({{item.score}})
          <v-progress-linear striped height="10" :color="getColor(item.score)" :value="item.score" :buffer-value="100"></v-progress-linear>
        </v-card>
      </div>
    <div class="w-full mt-4">
 
           <AgencyIIT  :yearData="year" :agencyData="agency" :all="all" />
           <AgencyEIT   :yearData="year" :agencyData="agency" :all="all" />
           <AgencyOIT   :yearData="year" :agencyData="agency" :all="all" :lists="lists" ></AgencyOIT>
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
    AgencyIIT,AgencyOIT,AgencyEIT 
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
