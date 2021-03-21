<template>
  <div class="relative md:pt-32 pb-32 pt-12 h-screen">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
      <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class="  text-2xl text-blue-800 font-bold">
            การประเมิน EIT

          </h3>
          <!--            <hr class="border-gray-600 border-1 mt-2">-->
        </div>

        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

          <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  cursor-pointer	"
               style="border-color:#7837B1; " v-for="year,index in years" :key="index" @click="openEit(year.id,year.status)" >
            <v-btn style="margin-right: 10px" color="#7837B1" large fab dark>
              <v-icon>mdi mdi-calendar-cursor</v-icon>
            </v-btn>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                ปีงบประมาณ
              </p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {{ year.year }}
              </p>
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
  private dashboard: any = null
  private user: any = {}
  private years: any = []
  private response: boolean = false
  $vs:any
  public async created() {
    this.user = await User.getUser(); 
    this.years = await Core.getHttp(`/api/eit/v1/year`) 
    this.response = true
  }

  public async openEit(yearId:any,status:boolean){

    if(!status){
      if(this.user.ext_link.in_up){
        let userInAnswer = await Core.getHttp(`/api/iit/v2/ansewer/user/?user=${this.user.pk}&year=${yearId}`)
        if(userInAnswer.length > 0){
          await this.$router.push(`/eit/detail?year=${yearId}`)
        }else{
          alert('กรุณาประเมิน IIT ก่อน')
        }
      }else{
        await this.$router.push(`/eit/detail?year=${yearId}`)
      }
    } else {
      await this.openNotification('top-right', '#D65B6D', `<i class="em em-lock" aria-role="presentation" aria-label="LOCK"></i>`,'ปิดการให้ประเมิน','ไม่สามารถประเมินได้ เนื่องจากระบบปิดการให้ประเมินแล้ว กรุณาติดต่อผู้ดูแลระบบ')
    }



    console.log(this.user.ext_link.in_up);
     
  }

  async openNotification(position:any = null, color:any, icon:any,title:string,text:string) {

    const noti = this.$vs.notification({
      icon,
      color,
      position,
      title: title,
      text: text
    })
  }

}
</script>
