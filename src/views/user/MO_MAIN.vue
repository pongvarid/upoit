<template>
<div class="relative md:pt-32 pb-32 pt-12 h-screen">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 "  v-if="user.ext_link.oit ||user.ext_link.passing || user.is_superuser">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
                <h3 class="text-blue-800  font-bold text-2xl  ">
                    แบบประเมินตนเองตามกระบวนการส่งเสริมและพัฒนา “องค์กรคุณธรรม”
                </h3>
                <div class="mt-8">
                    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                        <div class="flex items-center cursor-pointer	 " style="border-color:#7837B1; " v-for="year,index in years" :key="index" @click="(currentYearId = year.id) && (menu = true)">
                            <bin-card c="#800080" i='mdi-calendar' t="ปีงบประมาณ" :h="year.name"></bin-card>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
         <div v-else>

            <h2 class="mt-8 text-red-600">คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้ </h2>

        </div>
    </div>
   

    <v-bottom-sheet v-model="menu">
        <v-list dense>
            <v-list-item @click="checkYear(currentYearId)">
                <v-list-item-title v-if="currentYearId != null">ประเมินองค์กรคุณธรรม</v-list-item-title>
            </v-list-item> 
            <v-list-item @click="$router.push(`/user/mo-result/?year=${currentYearId}`)">
                <v-list-item-title>แผนส่งเสริมคุณธรรม</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-bottom-sheet> 

</div>
</template>

<script>
import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
export default {
    ///api/moral_organization/year/
    data: () => {
        return ({
            response: false,
            years: [],
            agency: null,
            menu: false,
            currentYearId: null,
        })
    },
    async created() {
        await this.init();
        this.response = true;
    },
    methods: {
        async init() {
            this.years = await Core.getHttp(`/api/moral_organization/year/`)
        },
        async checkYear(id) {
            let check = await Core.getHttp(`/api/moral_organization/main_exercise/?agency=${this.user.ext_link.agency}&year=${id}`)
            if (check.length == 0) {
                await this.$router.push(`/user/mo-exercise/?year=${id}`)
            } else {
                alert('คุณได้ทำการประเมินเรียบร้อยแล้ว')
            }
        },
        async openLinkDjango() {
            let url = `${this.$backend}/baseplan?agency=${this.user.ext_link.agency}&year=${this.currentYearId}`
            let newwindow = window.open(url, 'testWindow', 'height=800,width=600');
            if (window.focus) {
                newwindow.focus()
            }
            return false;
        }

    },
    computed: {
        user() {
            return User.user
        }
    }
}
</script>

<style>

</style>
