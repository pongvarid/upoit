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

                <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  " style="border-color:#7837B1; " v-for="year,index in years" :key="index" @click="getIssue(year.id,year.status)">
                    <v-btn style="margin-right: 10px" color="#7837B1" large fab dark>
                        <v-icon>mdi mdi-calendar-cursor</v-icon>
                    </v-btn>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            ปีงบประมาณ
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {{ year.year }}
                        </p> <span v-if="year.status" class="text-red-600" style="font-size:12px;">(ปิดการประเมินแล้ว)</span>
                        <span v-else class="text-green-600" style="font-size:12px;">(เปิดให้ประเมิน)</span>
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
        this.years = await Core.getHttp(`/api/iit/v1/year`)
        this.response = true
    }

    public async getIssue(yearId: number, status: boolean) {
        //$router.push(`detail?year=${year.id}`)
        if (!status) {
            let userInAnswer = await Core.getHttp(`/api/iit/v2/ansewer/user/?user=${this.user.pk}&year=${yearId}`) 
            if (userInAnswer.length > 0) {
                alert('ss')
            } else {
                await this.$router.push(`detail?year=${yearId}`)
            }
        } else {
          alert('ปิดการให้ประเมินแล้ว')
        }

    }

}
</script>
