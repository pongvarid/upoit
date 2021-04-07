<template>
<div >
    <div class="relative flex w-full mt-4 mb-4 max-w-full flex-col md:flex-row flex-1 px-2 py-2 ">
        <h3 class="  text-2xl text-gray-800">
            <span class="em em-chart_with_upwards_trend text-2xl" aria-role="presentation" aria-label=""></span> ผลการประเมิน
        </h3>
      <div class="pl-4" style="width:220px!important;">
        <v-select  class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="year" :items="years" item-text="year" item-value="year"></v-select>

      </div>


    </div>
    <div class="flex flex-wrap overflow-hidden " v-if="response">

        <div class="w-full h-full flex flex-col justify-center overflow-hidden lg:w-1/2 xl:w-1/2">

            <h2 class="text-blue-500 text-xl">คะแนนการประเมิน {{ (all.all).toFixed(2)}} คะแนน </h2>
            <h2 class="text-blue-500 text-2xl font-bold">ระดับผลการประเมิน {{all.rate}} </h2>

            <div class="flex flex-col items-center">
                <apexchart class="mt-2 items-center" width="500" type="polarArea" :options="chartOptions" :series="series"></apexchart>
             <br><br>
            </div>

        </div>

        <div class="w-full flex flex-col justify-centeroverflow-hidden lg:w-1/2 xl:w-1/2 md:p-2" style="height:350px;">
            <bin-card class="m-2" c="#3366cc" i="IIT" t=" คิดเป็น 30%" :h="all.iit" />

            <bin-card class="m-2" c="#ff6600" i="EIT" t=" คิดเป็น 40%" :h="all.eit" />
            <bin-card class="m-2" c="#4d9900" i="OIT" t=" คิดเป็น 60%" :h="all.oit" />

        </div>

    </div>
    <div v-else>
      <center class="p-6"> ไม่พบข้อมูล</center>
    </div>

</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Auth } from '@/store/auth'
import { Core } from '@/store/core'
import { User } from '@/store/user'
import _ from "lodash";
@Component({
    components: {

    },
})
export default class Graph extends Vue {

  agency:any = 0


  year:any = '2564'
  responseDetail:boolean = false
  lists:any = null
  all:any = null
  response:boolean = false
    series: any = []
    chartOptions: any = {
        chart: {
            width: 380,
            type: 'polarArea'
        },
        stroke: {
            colors: ['#fff']
        },

        fill: {
            opacity: 0.8
        },
        labels: ['การปฏิบัติหน้าที่', 'คุณภาพการดำเนินงาน', 'การใช้อำนาจ', 'การใช้ทรัพย์สินของราชการ', 'การใช้งบประมาณ', 'การปรับปรุงระบบการทำงาน', 'การแก้ไขปัญหาการทุจริต', 'ประสิทธิภาพการสื่อสาร', 'การเปิดเผยข้อมูล', 'การป้องกันการทุจริต'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 400
                },
            }
        }]
    }
    user:any = null
  years:any = null
    public async created() {
      this.user = await User.getUser();
      this.agency = (this.user.ext_link) ? this.user.ext_link.agency : 0
      this.years = await Core.getHttp(`/api/ita/v1/year/`)
      await this.loadAll();
      await this.loadLists();
      await this.generateGraph();
      this.response = true
    }

    async loadData(){
      this.response = false

      await this.loadLists();
      await this.generateGraph();
      this.response = true
      await this.loadAll();
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
    this.series = score
    this.chartOptions.labels = categories

    console.log('[DATA GRAPH]',categories,score)

  }

}
</script>
