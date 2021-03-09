<template>
  <div  >



    <div class="block relative " style="z-index:1;" >
      <div class="container px-4 py-4 mx-auto">
        <h2 class="text-xl mt-2 leading-tight font-semibold font-heading"> ผลการประเมินแต่ละหน่วยงาน</h2><br>
        <v-toolbar flat style="background:transparent;">

          <v-select v-model="chooseYear" :items="years" item-text="year" item-value="id"></v-select>
          <v-autocomplete v-model="chooseAgency" :items="agency" item-text="name" item-value="id"></v-autocomplete>
          <v-spacer></v-spacer>
          <v-btn @click="prePrint()"><i class="em em-printer" aria-role="presentation" aria-label=""></i>Print</v-btn>
        </v-toolbar>

        <section class="py-8 px-4">
          <div class="flex flex-wrap -mx-4">

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
            <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
              <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-blue-600 ">

                <div class="flex flex-col p-4">
                  <h2>OIT</h2>
                  <h3 class="text-xl mb-3 font-semibold font-heading font-semibold text-blue-600">26.75</h3>

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
          </div>
        </div>
        <br><br>
        <h2 class="text-2xl" >รายละเอียดการประเมิน</h2>
        <v-tabs>
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
import AgencyIIT from './AgencyIIT.vue'
import AgencyOIT from './AgencyOIT.vue'
import AgencyEIT from './AgencyEIT.vue'
@Component({
  components: {
    AgencyIIT,AgencyOIT,AgencyEIT
  },
})
export default class Home extends Vue {

  chooseYear: any = 1
  chooseAgency:any = 1

  private agency: any = null
  private years:any = []
  async created() {

    this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
    this.years = await Core.getHttp(`/api/ita/v1/year/`)


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
