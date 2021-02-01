<template>
<div class="pt-20">
    <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="user.ext_link.oit">
        <h3 class=" text-2xl text-gray-800">
            <i class="em em-lower_left_ballpoint_pen" aria-role="presentation" aria-label=""></i>ข้อมูล OIT ของหน่วยงาน
        </h3>
    </div>
    <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response && user.ext_link.oit">
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <div class="w-full   " v-for="year,i in years" :key="i">
                <div @click="$router.push(`/user/paper?year=${year.id}`)">
                    <bin-card c="#519edd" i='mdi-calendar' t="ปีงบประมาณ" :h="year.year"></bin-card>
                </div>

            </div>
        </div>
    </div>
    <br>
    <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="user.ext_link.oit_up">
        <h3 class=" text-2xl text-gray-800">
            <i class="em em-lower_left_ballpoint_pen" aria-role="presentation" aria-label=""></i> ข้อมูล OIT ของ มหาวิทยาลัย
        </h3>
    </div>
    <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response && user.ext_link.oit_up">
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <div class="w-full   " v-for="year,i in years" :key="i">
                <div @click="$router.push(`/user/paperup?year=${year.id}`)">
                    <bin-card c="#8000ff" i='mdi-calendar' t="ปีงบประมาณ" :h="year.year"></bin-card>
                </div>

            </div>
        </div>
    </div>
    <br>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
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
export default class OitMain extends Vue {
    private years: any = null
    private user: any = {}
    private response: boolean = false

    public async created() {
        this.user = await User.getUser();
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

<style>

</style>
