<template>
  <div class="relative md:pt-32 pb-32 pt-12 "  style="z-index:1;" >
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
            <div class="w-full md:w-4/12 p-2" v-for="year,i in years" :key="i">

              <div  @click="$router.push(`/admin/paper?year=${year.id}&id=${$route.query.id}`)"  class="flex cursor-pointer	 items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" style="border-color:#FFC300;">
                <v-btn style="margin-right: 10px" color="#FFC300" large fab dark>
                  <v-icon>OIT</v-icon>
                </v-btn>
                <div>
                  <h2 class="text-xl">{{year.year}}</h2>
                  <h2 class="text-sm text-gray-700 ">ประเด็นที่บันทึก {{year.result}} / {{year.rate}}   </h2>
                  <v-chip v-if="year.result >= year.rate" small color="green" dark ><v-icon left>mdi-check</v-icon>บันทึกข้อมูลครบแล้ว</v-chip>
                  <v-chip v-else small color="red" dark ><v-icon left>mdi-close</v-icon>ยังบันทึกข้อมูลไม่ครบ</v-chip>
                </div>
              </div>



<!--              <v-card flat class="bgh shadow-xl" @click="$router.push(`/admin/paper?year=${year.id}&id=${$route.query.id}`)">-->
<!--                                                <div class="flex h-20 items-center elevation-6">-->
<!--                                                    <v-icon class="p-4 ml-4">em em-classical_building</v-icon> -->
<!--                                                    <div class="p-4">-->
<!--                                                        <h2 class="text-base">{{`การให้ข้อมูล ( ${year.result} / ${year.rate} )`}}</h2>-->
<!--                                                    </div> -->
<!--                                                </div>-->
<!--                                            </v-card>-->
 
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
import _ from "lodash";
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
      this.years[i].result =  await this.getOITResult(res)
      this.years[i].rate = rate.length
    }
    this.response = true
    console.log(this.years)
  }


  private async getOITResult(raw:any){
    let result = await _(raw)
        .groupBy('rate')
        .map(function(items, data) {
          return {
            data: data,
          };
        }).value();
    return result.length;

  }

}
</script>
