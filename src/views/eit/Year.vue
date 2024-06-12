<template>
<div>
    <v-toolbar color="ttbarx" fixed  style="z-index:1;">
        <v-btn color="white" depressed fab>
            <span class="text-orange-500 font-semibold ">EIT</span>
        </v-btn>
        <div class="pl-2" v-if="!$vuetify.breakpoint.mobile">
            <h2 class="text-white font-semibold">แบบประเมินการรับรู้ของผู้มีส่วนได้ส่วนเสียภายนอก</h2>
            <h2 class="text-white text-xs">External Integrity and Transparency Assessment : EIT</h2>
        </div>     
        <v-spacer></v-spacer>
        <img class="h-10 w-auto" src="https://upload.wikimedia.org/wikipedia/th/thumb/0/00/University_of_Phayao_Logo.svg/1200px-University_of_Phayao_Logo.svg.png" alt="">
        <img class="h-8 w-auto ml-2" src="https://univer2017.files.wordpress.com/2017/09/e0b8a1e0b8abe0b8b2e0b8a7e0b8b4e0b897e0b8a2e0b8b2e0b8a5e0b8b1e0b8a2e0b89ee0b8b0e0b980e0b8a2e0b8b21.png?w=1000&h=208" alt="">
    </v-toolbar> 
    <div class="relative h-screen" style="z-index:1;">
        <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
            <div class="rounded-t mb-0 px-4 py-3 border-0 ">
                <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                    <h3 class="  text-2xl text-blue-800 font-bold">
                        การประเมิน EIT

                    </h3>
                    <!--            <hr class="border-gray-600 border-1 mt-2">-->
                </div>

                <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

                    <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  cursor-pointer	" style="border-color:#7837B1; " v-for="year,index in years" :key="index" @click="openEit(year.id,year.status)" v-if="!year.status">
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
                <div v-if="!isOpen"  class="bg-purple-200 p-4 rounded-xl">
                    <center style="font-size:80px;">🔒</center>
                    <center><h2 class="text-xl"> ระบบยังไม่เปิดให้ประเมิน ในขณะนี้</h2>
                        <h2>กรุณาลองใหม่อีกครั้งในภายหลัง</h2>
                    </center>
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
import _ from 'lodash'
@Component({
    components: {

    },
})
export default class Home extends Vue {
    private dashboard: any = null
    private user: any = {}
    private years: any = []
    private response: boolean = false
    private isOpen: boolean = false
    $vs: any
    public async created() { 
        this.years = await Core.getHttp(`/api/eit/v1/year`)
        // await this.autoGoToCheck()
        this.isOpen = _.find(this.years, ['status', false]) ? true : false
        this.response = true
    }

   

    public async openEit(yearId: any, status: boolean) {

        // if (!status) {
        //     if (this.user.ext_link.in_up) {
        //         let userInAnswer = await Core.getHttp(`/api/iit/v2/ansewer/user/?user=${this.user.pk}&year=${yearId}`)
        //         if (userInAnswer.length > 0) {
        //             await this.$router.push(`/eit/detail?year=${yearId}`)
        //         } else {
        //             alert('กรุณาประเมิน IIT ก่อน')
        //         }
        //     } else {
        //         await this.$router.push(`/eit/detail?year=${yearId}`)
        //     }
        // } else {
        //     await this.openNotification('top-right', '#D65B6D', `<i class="em em-lock" aria-role="presentation" aria-label="LOCK"></i>`, 'ปิดการให้ประเมิน', 'ไม่สามารถประเมินได้ เนื่องจากระบบปิดการให้ประเมินแล้ว กรุณาติดต่อผู้ดูแลระบบ')
        // }

        // console.log(this.user.ext_link.in_up);

        await this.$router.push(`/public/eit/detail?year=${yearId}`)

    }

    async openNotification(position: any = null, color: any, icon: any, title: string, text: string) {

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

<style>
.ttbarx{
    background: rgb(255,155,51);
background: linear-gradient(90deg, rgba(255,155,51,1) 0%, rgba(119,43,255,1) 58%, rgba(255,255,255,1) 100%);
}
</style>