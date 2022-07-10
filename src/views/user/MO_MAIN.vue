<template>
<div class="relative md:pt-32 pb-32 pt-12 h-screen">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
                <h3 class="text-blue-800  font-bold text-2xl  ">
                    แบบประเมินตนเองตามกระบวนการส่งเสริมและพัฒนา “องค์กรคุณธรรม”
                </h3>
                <div class="mt-8">
                    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4"> 
                        <div class="flex items-center cursor-pointer	 " style="border-color:#7837B1; " v-for="year,index in years" :key="index" @click="checkYear(year.id)"  >

                            <bin-card c="#800080" i='mdi-calendar' t="ปีงบประมาณ" :h="year.name"></bin-card>

                        </div> 
                    </div> 
                </div>
            </div>

        </div>

    </div>

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
        async checkYear(id){
            let check = await Core.getHttp(`/api/moral_organization/main_exercise/?agency=${this.user.ext_link.agency}&year=${id}`)
            if(check.length == 0){
                await this.$router.push(`/user/mo-exercise/?year=${id}`)
            }else{
                alert('คุณได้ทำการประเมินเรียบร้อยแล้ว')
            }
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
