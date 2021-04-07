<template>
  <div  >
    <div class="container px-auto">
      <h2 class="text-xl mt-2 leading-tight font-semibold font-heading"> ผลการประเมิน
        <v-btn class="m-1" @click="prePrint()"><i class="em em-printer" aria-role="presentation" aria-label=""></i>Print</v-btn>
      </h2><br>
      <div class="flex ">
        <v-select class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="year" :items="years" item-text="year" item-value="year"></v-select>
       </div>
    </div>
    <div class="container px-auto">
      <div class="flex flex-wrap flex-col md:flex-row" v-if="response">
        <div class="w-full md:w-1/2">
          <h2 class="text-2xl">ผลประเมินภาพรวมของมหาวิทยาลัยพะเยา</h2>
          <h2>คะแนนรวม {{up.all}} คะแนน</h2>  <v-btn small @click="onExport(all)">ส่งออกข้อมูล</v-btn><br> <br>
          <apexchart type="radar" height="450px" :options="chartOptions" :series="series"></apexchart>

          <center>
            <h2>ระดับผลการประเมิน</h2>
            <h2 class="text-5xl">{{up.rate}}</h2>
          </center>
        </div>
        <div class="w-full md:w-1/2">

          <v-tabs>
            <v-tab>A</v-tab>
            <v-tab-item>
              <v-card class="m-2 p-4 elevation-5" v-for="item,index in all" :key="index" v-if="item.rate == 'A'">
                <b>{{item.agency.name}} </b>  ( {{item.all}} คะแนน )
                <v-progress-linear striped height="10" :color="getColor(item.all)" :value="item.all" :buffer-value="100"></v-progress-linear>
                <h2 class="text-xl font-bold" :style="`color : ${getColor(item.all)};`">{{item.rate}}</h2>
              </v-card>
            </v-tab-item>
            <v-tab>B</v-tab>
            <v-tab-item>
              <v-card class="m-2 p-4 elevation-5" v-for="item,index in all" :key="index" v-if="item.rate == 'B'">
                <b>{{item.agency.name}} </b>  ( {{item.all}} คะแนน )
                <v-progress-linear striped height="10" :color="getColor(item.all)" :value="item.all" :buffer-value="100"></v-progress-linear>
                <h2 class="text-xl font-bold" :style="`color : ${getColor(item.all)};`">{{item.rate}}</h2>
              </v-card>
            </v-tab-item>
            <v-tab>C</v-tab>
            <v-tab-item>
              <v-card class="m-2 p-4 elevation-5" v-for="item,index in all" :key="index" v-if="item.rate == 'C'">
                <b>{{item.agency.name}} </b>  ( {{item.all}} คะแนน )
                <v-progress-linear striped height="10" :color="getColor(item.all)" :value="item.all" :buffer-value="100"></v-progress-linear>
                <h2 class="text-xl font-bold" :style="`color : ${getColor(item.all)};`">{{item.rate}}</h2>
              </v-card>
            </v-tab-item>
            <v-tab>D</v-tab>
            <v-tab-item>
              <v-card class="m-2 p-4 elevation-5" v-for="item,index in all" :key="index" v-if="item.rate == 'D'">
                <b>{{item.agency.name}} </b>  ( {{item.all}} คะแนน )
                <v-progress-linear striped height="10" :color="getColor(item.all)" :value="item.all" :buffer-value="100"></v-progress-linear>
                <h2 class="text-xl font-bold" :style="`color : ${getColor(item.all)};`">{{item.rate}}</h2>
              </v-card>
            </v-tab-item>
          </v-tabs>

        </div><br><br>
        <div class="w-full p-6">
          <h2 class="mt-3 text-xl">รายระเอียดผลการประเมิน</h2>   <v-btn @click="onExport(listsData)">ส่งออกข้อมูล</v-btn>
          <v-card class="m-2 p-4 elevation-5"v-for="item,key in listsData" :key="key">
            <b>{{ (key+1)}}.{{item.name}}</b> ({{item.score}})
            <v-progress-linear striped height="10" :color="getColor(item.score)" :value="item.score" :buffer-value="100"></v-progress-linear>

          </v-card>
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
  Core
} from '@/store/core'
import {
  Auth
} from '@/store/auth'
import {
  User
} from '@/store/user'
import {
  Web
} from '@/store/web'
import _ from 'lodash'
import UpIIT from './UpIIT.vue'
import UpEIT from './UpEIT.vue'
import UpOIT from './UpOIT.vue'
import XLSX from 'xlsx'
@Component({
  components: {
    UpIIT,UpEIT,UpOIT
  },
})
export default class Home extends Vue {
  private form: any = {}
  year: any = '2563'
  all:any = null
  lists:any =null
  listsData:any = null
  response:boolean = false
  private years:any = []
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

    await this.loadData();
  }

  up:any = null;
  async loadUp(){
    this.up = await Core.getHttp(`/api/report/v1/reportall-all/64/`)
  }

  async loadData(){
    await Web.switchLoad(true)
    this.years = await Core.getHttp(`/api/ita/v1/year/`)
    await this.loadLists();
    await this.generateGraph();
    await this.loadUp();
    await this.loadAll();
    await Web.switchLoad(false)
  }

  async loadAll(){
    let data =  await Core.getHttp(`/api/report/v1/reportall-all/?year=${this.year}`)
    if(data.length > 0){
      this.all = _.orderBy(data,'all','desc') ;
      for (let i =0; i< this.all.length; i++){
        this.all[i].agency_name= this.all[i].agency.name
        this.all[i].all = Number( (this.all[i].all).toFixed(2))
      }
      this.response = true;
    }else{
      this.response = false;
    }
  }

  async loadLists(){
    let data =  await Core.getHttp(`/api/report/v1/reportdetail/?year=${this.year}`)
    this.lists = _.orderBy(data,'order','asc') ;
  }

  async generateGraph(){
    let raw = _.chain(this.lists)
        // Group the elements of Array based on `color` property
        .groupBy("name")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => ({
          name: key,
          score: Number((_.meanBy(value, (p) => p.score) ).toFixed(2))
        }))
        .value()
    this.listsData = raw
    let categories = _.map(raw, 'name');
    let score = _.map(raw, 'score');
    this.series[0].data = score
    this.chartOptions.xaxis.categories = categories


  }



  prePrint(){
    window.print();
  }
  getColor(score:number){
    if(score <= 60){
      return "#C70039"
    }else if(score <= 77){
      return "#c77e00"
    }else if(score <= 85){
      return "#bac700"
    }else{
      return "#4cc700"
    }
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
