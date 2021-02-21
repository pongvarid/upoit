<template>
  <div  >
    <div class="flex flex-wrap flex-col md:flex-row" v-if="response">
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl">ผลประเมินภาพรวม</h2>
        <h2>คะแนนภาพรวมหน่วยงาน {{all.all}} คะแนน</h2>
        <div class="flex flex-wrap">
          <bin-card class="m-2" c="rgb(51, 102, 204)" :h="all.iit" t="คะแนน" i="IIT"></bin-card>
          <bin-card class="m-2" c="rgb(255, 102, 0)"  :h="all.eit"  t="คะแนน" i="EIT"></bin-card>
          <bin-card class="m-2" c="rgb(77, 153, 0)"  :h="all.oit"  t="คะแนน" i="OIT"></bin-card>
        </div>

        <apexchart type="radar" height="450px" :options="chartOptions" :series="series"></apexchart>
        <center>
          <h2>ระดับผลการประเมิน</h2>
          <h2 class="text-5xl">{{all.rate}}</h2>
        </center>
      </div>
      <div class="w-full md:w-1/2" >
        <v-card class="m-2 p-4 elevation-5" v-for="item,index in lists" :key="index">
          <b>{{item.order}}.{{item.name}}</b> ({{item.score}})
          <v-progress-linear striped height="10" :color="getColor(item.score)" :value="item.score" :buffer-value="100"></v-progress-linear>
        </v-card>
      </div>

      <br><br><br><br>
      <h2 class="text-2xl" >รายละเอียดการประเมิน</h2>
      <v-tabs v-if="responseDetail">
        <v-tab>IIT</v-tab>
        <v-tab-item>
          <AgencyIIT />
        </v-tab-item>
        <v-tab>EIT</v-tab>
        <v-tab-item>
          <AgencyEIT></AgencyEIT>
        </v-tab-item>
        <v-tab>OIT</v-tab>
        <v-tab-item>
          <AgencyOIT></AgencyOIT>
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
  responseDetail:boolean = false
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
