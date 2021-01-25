<template>
  <div  >
    <div class="block relative"   >
      <div class="container px-4 py-4 mx-auto">
        <h2 class="text-3xl mt-2 leading-tight font-semibold font-heading">
         ผลการประเมิน
        </h2>
        <v-toolbar flat style="background:transparent;">
          ปีงบประมาณ <vs-select v-model="chooseYear" color="success" placeholder="ปีงบประมาณ">
          <vs-option label="2563" value="1">
            2563
          </vs-option>
          <vs-option label="2564" value="2">
            2564
          </vs-option>
        </vs-select>
          <v-spacer></v-spacer>
          <v-btn @click="prePrint()"><i class="em em-printer" aria-role="presentation" aria-label=""></i>Print</v-btn>
        </v-toolbar>

        <section class="py-8 px-4">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
              <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-blue-600 ">

                <div class="flex flex-col p-4">
                  <h2>OIT</h2>
                  <h3 class="text-xl mb-3 font-semibold font-heading font-semibold text-blue-600">26.75</h3>

                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
              <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-yellow-600">

                <div class="flex flex-col p-4">
                  <h2>IIT</h2>
                  <h3 class="text-xl mb-3 font-semibold font-heading font-semibold text-yellow-600">20.95</h3>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
              <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-purple-600">

                <div class="flex flex-col p-4">
                  <h2>EIT</h2>
                  <h3 class="text-xl mb-3 font-semibold font-heading font-semibold text-purple-600">23.85</h3>
                </div>
              </div>
            </div>

          </div>
        </section>

        <h3 class="block text-xl text-gray-700 font-semibold mb-3"></h3>
        <div class="flex flex-col md:flex-row  m-2">
          <div class="w-full md:w-1/2 ">
            <div class="rounded-md p-6 bg-white shadow h-full">
              <div class="mb-2 pb-2">
                <h3 class="font-semibold text-lg text-gray-600">คะแนนภาพรวม</h3>
                <p class="text-sm text-gray-500">คะแนนภาพรวมหน่วยงานมหาวิทยาลัยพะเยา : 71.55 คะแนน</p>
              </div>
              <apexchart type="radar" height="450px" :options="chartOptions" :series="series"></apexchart>
              <center>
                <h2 class="text-green-500 text-xl">ระดับผลการประเมิน </h2>
                <h2 class="text-green-500 text-5xl">C</h2>

              </center>
            </div>
          </div>
          <div class="w-full md:w-1/2 m-2">
            <div class="rounded-md p-6 bg-white shadow">
              <div class="mb-2 pb-2">
                <h3 class="font-semibold text-lg text-gray-600">ลำดับคะแนน</h3>
                <p class="text-sm text-gray-500">สูงสุด {{scoreTop[0]}} , ต่ำสุด {{scoreDown[0]}}</p>
              </div>
              <v-tabs color="#8934eb" slider-color="#8934eb">
                <v-tab>
                  คะแนนสูงสุด
                </v-tab>
                <v-tab-item>
                  <div v-for="data,i in top" :key="i">
                    <v-toolbar flat style="background:transparent;" v-if="i<10">
                      {{i+1}}. {{data.name}}
                      <v-spacer></v-spacer>{{scoreTop[i]}}
                    </v-toolbar>
                  </div>
                </v-tab-item>
                <v-tab>
                  คะแนนต่ำสุด
                </v-tab>
                <v-tab-item>
                  <div v-for="data,j in down" :key="j" class="">
                    <v-toolbar flat style="background:transparent;" v-if="j<10">
                      {{j+1}}. {{data.name}}
                      <v-spacer></v-spacer>{{scoreDown[j]}}
                    </v-toolbar>
                  </div>
                </v-tab-item>
              </v-tabs>
            </div>
          </div>
        </div>

        <div class="flex">
          <div class="w-full p-6 rounded-xl shadow-xl bg-white mt-4 border-b-4 border-green-600 ">
            <div class="mb-2 pb-2">
              <h3 class="font-semibold text-lg text-gray-600">รายละเอียดผลการประเมิน</h3>
              <p class="text-sm text-gray-500">หน่วยงานมหาวิทยาลัยพะเยา : 71.55 คะแนน</p>
            </div>
            <div class="flex p-2">
              <div class="w-6/12">
                การปฏิบัติหน้าที่
              </div>
              <div class="w-6/12"><center>91.27</center>
                <v-progress-linear striped height="10" color="#009900" :value="91.27" :buffer-value="100"></v-progress-linear>
              </div>
            </div>
            <div class="flex p-2">
              <div class="w-6/12">
                คุณภาพการดำเนินงาน
              </div>
              <div class="w-6/12"><center>88.23</center>
                <v-progress-linear striped height="10" color="#009900" :value="88.23" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                การใช้อำนาจ
              </div>
              <div class="w-6/12"><center>87.48</center>
                <v-progress-linear striped height="10" color="#009900" :value="87.48" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                การใช้ทรัพย์สินของราชการ
              </div>
              <div class="w-6/12"><center>82.27</center>
                <v-progress-linear striped height="10" color="#009900" :value="82.27" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                การใช้งบประมาณ
              </div>
              <div class="w-6/12"><center>80.64</center>
                <v-progress-linear striped height="10" color="#009900" :value="80.64" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                การปรับปรุงระบบการทำงาน
              </div>
              <div class="w-6/12"><center>80.22</center>
                <v-progress-linear striped height="10" color="#009900" :value="80.22" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                การแก้ไขปัญหาการทุจริต
              </div>
              <div class="w-6/12"><center>78.98</center>
                <v-progress-linear striped height="10" color="#009900" :value="78.98" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                ประสิทธิภาพการสื่อสาร
              </div>
              <div class="w-6/12"><center>78.27</center>
                <v-progress-linear striped height="10" color="#009900" :value="78.27" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                การเปิดเผยข้อมูล
              </div>
              <div class="w-6/12"><center>65.62</center>
                <v-progress-linear striped height="10" color="#009900" :value="65.62" :buffer-value="100"></v-progress-linear>
              </div>
            </div>

            <div class="flex p-2">
              <div class="w-6/12">
                การป้องกันการทุจริต
              </div>
              <div class="w-6/12"><center>42.56</center>
                <v-progress-linear striped height="10" color="#009900" :value="42.56" :buffer-value="100"></v-progress-linear>
              </div>
            </div><br>

          </div>

        </div>
        <br><br>
        <h2 class="text-2xl" >รายระเอียดการประเมิน</h2>
        <v-tabs>
          <v-tab>IIT</v-tab>
          <v-tab-item>
              <UpIIT />
          </v-tab-item>
          <v-tab>EIT</v-tab>
          <v-tab-item>
            <UpEIT></UpEIT>
          </v-tab-item>
          <v-tab>OIT</v-tab>
          <v-tab-item>
              <UpOIT></UpOIT>
          </v-tab-item>
        </v-tabs>

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
import _ from 'lodash'
import UpIIT from './UpIIT.vue'
import UpEIT from './UpEIT.vue'
import UpOIT from './UpOIT.vue'
@Component({
  components: {
    UpIIT,UpEIT,UpOIT
  },
})
export default class Home extends Vue {
  private form: any = {}
  chooseYear: any = '1'
  series: any = [{
    name: 'data',
    data: [91.27, 88.23, 87.48, 82.27, 80.64, 80.22, 78.98, 78.27, 65.62, 42.56],
  }]

  chartOptions: any = {
    chart: {
      height: 350,
      type: 'radar',
    },
    title: {},
    xaxis: {
      categories: ['การปฏิบัติหน้าที่', 'คุณภาพการดำเนินงาน', 'การใช้อำนาจ', 'การใช้ทรัพย์สินของราชการ', 'การใช้งบประมาณ', 'การปรับปรุงระบบการทำงาน', 'การแก้ไขปัญหาการทุจริต', 'ประสิทธิภาพการสื่อสาร', 'การเปิดเผยข้อมูล', 'การป้องกันการทุจริต']
    }
  }
  private agency: any = null
  private top: any = [];
  private down: any = []
  private scoreTop: any = [95.67, 85.45, 75.44, 74.55, 73.22, 73.11, 73.05, 72.95, 72.11, 71.99]
  private scoreDown: any = [71.99, 72.11, 72.95, 73.05, 73.11, 73.22, 74.55, 75.44, 85.45, 95.67]
  async created() {
    //  await Auth.reToken();
    this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
    this.top = _.orderBy(this.agency, ['count'], ['desc']);
    this.down = _.orderBy(this.agency, ['count'], ['asc']);
    //     let loader = await this.$loading.show()

    //   await loader.hide()

  }

  prePrint(){
    window.print();
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
