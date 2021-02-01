<template>
  <div class="relative md:pt-32 pb-32 pt-12 ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
      <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class="font-semibold text-3xl text-gray-800">
            <i class="em em-lower_left_ballpoint_pen" aria-role="presentation" aria-label=""></i> ข้อมูลของหน่วยงาน
          </h3>
          <hr class="border-gray-600 border-2 mt-2">
        </div>
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
          <div class="flex flex-wrap">
            <div class="w-full md:w-3/12 p-2" v-for="year,i in years" :key="i">
                <v-card flat class="bgh shadow-xl" @click="$router.push(`/user/all/result?year=${year.id}&id=${$route.query.id}`)">
                                                <div class="flex h-20 items-center elevation-6">
                                                    <v-icon class="p-4 ml-4">em em-classical_building</v-icon> 
                                                    <div class="p-4">
                                                      <h2 class="text-xl">{{year.year}}</h2>
                                                        <h2 class="text-base">{{`การให้ข้อมูล ( ${year.result} / ${year.rate} )`}}</h2>
                                                    </div> 
                                                </div>
                                            </v-card>
           
            </div>

          </div>

        </div>



      </div>

    </div>
    <br><br><br><br> <br> <br> <br><br><br><br><br> <br> <br> <br><br>
  </div>
</template>


<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
 

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
     
  },
})
export default class Home extends Vue {

  private user:any = {}
  private years:any = []
  private response:boolean = false
  public async created(){
    this.user = await User.getUser();
    this.years = await Core.getHttp(`/api/ita/v2/year/`)
    for (let i =0 ;i < this.years.length;i++){
      let res = await Core.getHttp(`/api/ita/v1/rateresult/?rate__year=${this.years[i].id}&agency=${this.$route.query.id}`)
      let rate = await Core.getHttp(`/api/ita/v2/rate/${this.years[i].id}/`)
      this.years[i].result = res.length
      this.years[i].rate = rate.length
    }
    this.response = true
    console.log(this.years)
  }

}
</script>
