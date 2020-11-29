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

          <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  "
               style="border-color:#1d8998; ">
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
          <div
              class="flex items-center p-4 bg-white rounded-lg border-b-4 border-orange-500 shadow-xl dark:bg-gray-800">
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
          <div
              class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 border-purple-500">
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
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class=" text-2xl text-gray-800">
            <i class="em em-lower_left_ballpoint_pen" aria-role="presentation" aria-label=""></i> การให้ข้อมูล OIT
          </h3>
          <!--              <hr class="border-gray-600 border-1 mt-2">-->
        </div>
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
          <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
            <div class="w-full   " v-for="year,i in years" :key="i">
              <card-stats
                  :statRoute="`/user/paper?year=${year.id}`"
                  :statSubtitle="`การให้ข้อมูล ( ${year.result} / ${year.rate} )`"
                  :statTitle="year.year"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-green-500"
                  statDescripiron="Since last month"
                  statIconName="mdi mdi-file-document-multiple"
                  statIconColor="bg-green-500"
              />
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
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
          <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">

            <div class="  w-full   rounded-lg overflow-hidden">
              <table class="w-full leading-normal">
                <thead>
                <tr>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ชื่อ
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    สกุล
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    การเข้าสู่ระบบ
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    สถานะผู้ใช้
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user,uindex in dashboard.agency_passing_all" :key="uindex">
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <v-avatar v-if="user.user"color="#5e5a98">
                          <span class="text-white headline">{{user.user.first_name[0]}}{{user.user.last_name[0]}}</span>
                        </v-avatar>
                      </div>
                      <div class="ml-4">
                        <p v-if="user.user"  class="text-gray-900 whitespace-no-wrap">
                          {{user.user.first_name}}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p v-if="user.user" class="text-gray-900 whitespace-no-wrap">{{user.user.last_name}}</p>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {{user.register_type}}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                     <v-chip color="#f5c6f6">หัวหน้าหน่วยงาน</v-chip>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="  w-full   rounded-lg overflow-hidden">
              <table class="w-full leading-normal">
                <thead>
                <tr>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ชื่อ
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    สกุล
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    การเข้าสู่ระบบ
                  </th>
                  <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    สถานะผู้ใช้
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user,jindex in dashboard.agency_user_all" :key="jindex">
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <v-avatar v-if="user.user"color="#5e5a98">
                          <span class="text-white headline">{{user.user.first_name[0]}}{{user.user.last_name[0]}}</span>
                        </v-avatar>
                      </div>
                      <div class="ml-4">
                        <p v-if="user.user"  class="text-gray-900 whitespace-no-wrap">
                          {{user.user.first_name}}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p v-if="user.user" class="text-gray-900 whitespace-no-wrap">{{user.user.last_name}}</p>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {{user.register_type}}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <v-chip color="#aaf6b2">บุคคลากรภายใน</v-chip>
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
    this.response = true
  }

}
</script>
