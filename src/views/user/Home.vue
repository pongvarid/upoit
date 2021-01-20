<template>
<div class="relative md:pt-32 pb-32 pt-12 ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  " v-if="response">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800">
                    <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> ข้อมูลของหน่วยงาน
                </h3>
                <!--            <hr class="border-gray-600 border-1 mt-2">-->
            </div>

            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

                <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  " style="border-color:#1d8998; ">
                    <v-btn style="margin-right: 10px" color="#1d8998" large fab dark>
                        <v-icon>mdi mdi-home-city</v-icon>
                    </v-btn>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            หน่วยงาน
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {{ dashboard.agency }}
                        </p>
                    </div>
                </div>

                <!-- Card -->
                <div class="flex items-center p-4 bg-white rounded-lg border-b-4 border-orange-500 shadow-xl dark:bg-gray-800">
                    <v-btn style="margin-right: 10px" color="#e47434" large fab dark>
                        <v-icon>mdi mdi-account-child-circle</v-icon>
                    </v-btn>

                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            หัวหน้าหน่วยงาน
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {{ dashboard.agency_passing }} คน
                        </p>
                    </div>
                </div>
                <!-- Card -->
                <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 border-purple-500">
                    <v-btn style="margin-right: 10px" color="#5e5a98" large fab dark>
                        <v-icon>mdi mdi-account-supervisor-circle</v-icon>
                    </v-btn>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            ผู้ใช้งาน
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {{ dashboard.agency_user }} คน
                        </p>
                    </div>
                </div>

            </div>
            <br>
            <div class="relative flex w-full mt-4 mb-4 max-w-full flex-col md:flex-row flex-1 px-2 py-2 ">
                <h3 class="  text-2xl text-gray-800">
                    <span class="em em-chart_with_upwards_trend text-2xl" aria-role="presentation" aria-label=""></span> ผลการประเมิน
                </h3>
                <vs-select class="ml-4 shadow rounded-xl" value="1" placeholder="ประจำปี">
                    <vs-option label="2563" value="1">
                        2563
                    </vs-option>
                </vs-select>
            </div>

            <div class="flex flex-wrap overflow-hidden mt-6">

                <div class="w-full h-full flex flex-col justify-center overflow-hidden lg:w-1/2 xl:w-1/2">

                    <h2 class="text-blue-500 text-xl">คะแนนการประเมิน 91.07 คะแนน </h2>
                    <h2 class="text-blue-500 text-2xl font-bold">ระดับผลการประเมิน A </h2>

                    <div class="flex flex-col items-center">
                        <apexchart class="mt-2 items-center" width="500" type="polarArea" :options="chartOptions" :series="series"></apexchart>
     <v-btn text @click="$router.push('/user/ita')" >ดูทั้งหมด</v-btn>
                    </div>

                </div>

                <div class="w-full flex flex-col justify-centeroverflow-hidden lg:w-1/2 xl:w-1/2 md:p-2" style="height:350px;">
                    <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  m-2" style="border-color:#3366cc; ">
                        <v-btn style="margin-right: 10px; font-size:26px;" color="#3366cc" large fab dark>
                            IIT
                        </v-btn>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                คิดเป็น 30%
                            </p>
                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                29.12
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  m-2" style="border-color:#ff6600; ">
                        <v-btn style="margin-right: 10px; font-size:26px;" color="#ff6600" large fab dark>
                            EIT
                        </v-btn>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                คิดเป็น 40%
                            </p>
                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                38.83
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  m-2" style="border-color:#4d9900; ">
                        <v-btn style="margin-right: 10px; font-size:26px;" color="#4d9900" large fab dark>
                            OIT
                        </v-btn>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                คิดเป็น 60%
                            </p>
                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                58.24
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <br>
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="user.ext_link.oit">
                <h3 class=" text-2xl text-gray-800">
                    <i class="em em-lower_left_ballpoint_pen" aria-role="presentation" aria-label=""></i> การให้ข้อมูล OIT
                </h3>
                <!--              <hr class="border-gray-600 border-1 mt-2">-->
            </div>
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response && user.ext_link.oit">
                <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                    <div class="w-full   " v-for="year,i in years" :key="i">
                        <card-stats :statRoute="`/user/paper?year=${year.id}`" :statSubtitle="`การให้ข้อมูล ( ${year.result} / ${year.rate} )`" :statTitle="year.year" statArrow="up" statPercent="12" statPercentColor="text-green-500" statDescripiron="Since last month" statIconName="mdi mdi-file-document-multiple" statIconColor="bg-green-500" />
                    </div>
                </div>
            </div>
            <br>

          <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="user.ext_link.oit_up">
            <h3 class=" text-2xl text-gray-800">
              <i class="em em-lower_left_ballpoint_pen" aria-role="presentation" aria-label=""></i> การให้ข้อมูล OIT ของ มหาวิทยาลัย
            </h3>
            <!--              <hr class="border-gray-600 border-1 mt-2">-->
          </div>
          <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response && user.ext_link.oit_up">
            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
              <div class="w-full   " v-for="year,i in years" :key="i">
                <card-stats :statRoute="`/user/paperup?year=${year.id}`" :statSubtitle="`การให้ข้อมูล ( ${year.result} / ${year.rate} )`" :statTitle="year.year" statArrow="up" statPercent="12" statPercentColor="text-green-500" statDescripiron="Since last month" statIconName="mdi mdi-file-document-multiple" statIconColor="bg-green-500" />
              </div>
            </div>
          </div>
          <br>



          <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class=" text-2xl text-gray-800">
                    <i class="em em-computer " aria-role="presentation" aria-label=""></i> ตารางผู้ใช้งาน
                </h3>
                <!--              <hr class="border-gray-600 border-1 mt-2">-->
            </div>

            <div class="flex flex-wrap  " v-if="response">
                <div class="w-full overflow-hidden lg:w-1/2 xl:w-1/2  p-4 "   >
                    <div class="w-full flex mb-4 shadow-xl rounded-xl border-b-4 m-2  p-3  " style="border-color:#66ccff; " v-for="user,uindex in dashboard.agency_passing_all" :key="uindex"  >
                              <v-avatar v-if="user.user" color="#5e5a98">
                            <span class="text-white headline">{{user.user.first_name[0]}}{{user.user.last_name[0]}}</span>
                        </v-avatar>
                        <div class="flex-grow pl-3">
                            <h6 class="font-bold text-md" v-if="user.user" > {{user.user.first_name}} {{user.user.last_name}}</h6>
                            <p class="text-xs text-gray-600">{{user.register_type}}</p>
                        </div>
                        <div class="w-auto text-right">
                           <v-chip color="#66ccff">หัวหน้าหน่วยงาน</v-chip>
                        </div>
                    </div>
                </div>

                <div class="w-full overflow-hidden lg:w-1/2 xl:w-1/2   p-4  ">
                    <div class="w-full flex mb-4 shadow-xl rounded-xl border-b-4 m-2  p-3" v-for="user,jindex in dashboard.agency_user_all" :key="jindex"  style="border-color:#e0b3ff;"  >
                              <v-avatar v-if="user.user" color="#5e5a98">
                            <span class="text-white headline">{{user.user.first_name[0]}}{{user.user.last_name[0]}}</span>
                        </v-avatar>
                        <div class="flex-grow pl-3">
                            <h6 class="font-bold text-md" v-if="user.user" > {{user.user.first_name}} {{user.user.last_name}}</h6>
                            <p class="text-xs text-gray-600">{{user.register_type}}</p>
                        </div>
                        <div class="w-auto text-right">
                           <v-chip color="#e0b3ff">ผู้ใช้งานทั่วไป</v-chip>
                        </div>
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
import CardStats from "@/components/Cards/CardStatWithBtn.vue";

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
        CardStats
    },
})
export default class Home extends Vue {
    private dashboard: any = null
    private user: any = {}
    private years: any = []
    private response: boolean = false
  $vs: any
    series: any = [91.27, 88.23, 87.48, 82.27, 80.64, 80.22, 78.98, 78.27, 65.62, 42.56]
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
                // legend: {
                //     position: 'bottom'
                // }
            }
        }]
    }

    public async created() {
        this.user = await User.getUser();
        this.dashboard = await Core.getHttp(`/api/ita/v2/dashboard/${this.user.ext_link.id}/`)
        this.years = await Core.getHttp(`/api/ita/v2/year/`)
        for (let i = 0; i < this.years.length; i++) {
            let res = await Core.getHttp(`/api/ita/v1/rateresult/?rate__year=${this.years[i].id}&agency=${this.user.ext_link.agency}`)
            let rate = await Core.getHttp(`/api/ita/v2/rate/${this.years[i].id}/`)
            this.years[i].result = res.length
            this.years[i].rate = rate.length
        }
        this.$vs.notification({
          color:"#7d33ff",
        title: 'อย่าลืมให้ข้อมูล IIT และ EIT ล่ะ !!!',
        text: ``
      })
        this.response = true
    }

}
</script>
