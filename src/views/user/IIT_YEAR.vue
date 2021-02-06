<template>
<div class="relative md:pt-32 pb-32 pt-12 h-screen">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="text-blue-800  font-bold text-2xl  ">
                    การประเมิน IIT
                </h3>
                <h2 class="text-blue-800  ">{{dashboard.agency}}</h2>

            </div>

            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

                <div class="flex items-center cursor-pointer	 " style="border-color:#7837B1; " v-for="year,index in years" :key="index" @click="getIssue(year.id,year.status)" v-if="!year.status">
                   
                    <bin-card c="#800080" i='mdi-calendar' t="ปีงบประมาณ" :h="year.year"></bin-card>
            
                  
                   
                   
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
        this.dashboard = await Core.getHttp(`/api/ita/v2/dashboard/${this.user.ext_link.id}/`)
        this.years = await Core.getHttp(`/api/iit/v1/year`)
        this.response = true
    }

    public async getIssue(yearId: number, status: boolean) {
        //this.$router.push(`detail?year=${yearId}`)
        if (!status) {
            let userInAnswer = await Core.getHttp(`/api/iit/v2/ansewer/user/?user=${this.user.pk}&year=${yearId}`) 
            console.log(userInAnswer);
            if (userInAnswer.length > 0) {
                await this.openNotification('top-right', 'primary', `<i class="em em-female-teacher" aria-role="presentation" aria-label=""></i>`,'คุณได้ทำการประเมินแล้ว','ระบบอนุญาตให้ประเมินได้ครั้งเดียว')
            } else {
                await this.$router.push(`/iit/detail?year=${yearId}`)
            }
          //   await this.$router.push(`detail?year=${yearId}`)
        } else {
          await this.openNotification('top-right', '#D65B6D', `<i class="em em-lock" aria-role="presentation" aria-label="LOCK"></i>`,'ปิดการให้ประเมิน','ไม่สามารถประเมินได้ เนื่องจากระบบปิดการให้ประเมินแล้ว กรุณาติดต่อผู้ดูแลระบบ')
        } 
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
