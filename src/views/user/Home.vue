<template>
<div class="relative md:pt-32 pb-32 pt-12 " v-if="response">
    <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
            <h3 class="  text-2xl text-gray-800">
                <span class="em em-writing_hand text-2xl" aria-role="presentation" aria-label=""></span> เมนูการประเมิน
            </h3>
        </div>

        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <div class="cursor-pointer" v-if="myAgency != publicAgency" @click="$router.push('/iit/year/')">
                <bin-card c="#ff8040" i="em em-bookmark_tabs" t="แบบประเมิน" h="IIT" />
            </div>
            <div class="cursor-pointer" @click="$router.push('/eit/year/')">
                <bin-card c="#8000ff" i="em em-bookmark_tabs" t="แบบประเมิน" h="EIT" />
            </div>

        </div>
        <br>

        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
            <h3 class="  text-2xl text-gray-800">
                <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> ข้อมูลของหน่วยงาน
            </h3>
        </div>

        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <bin-card c="#1d8998" i="mdi-home-city" t="หน่วยงาน" :h="dashboard.agency" />
            <bin-card c="#e47434" i="mdi-account-child-circle" t="หัวหน้าหน่วยงาน" :h="dashboard.agency_passing" />
            <bin-card c="#8080ff" i="mdi-account-circle" t="บุคลากรภายในหน่วยงาน" :h="dashboard.agency_user" />
        </div>
        <br>

        <!--        <Graph v-if="myAgency != publicAgency" />-->

        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="myAgency != publicAgency">
            <h3 class=" text-2xl text-gray-800">
                <i class="em em-computer " aria-role="presentation" aria-label=""></i> ตารางรายชื่อบุคลากรภายในหน่วยงาน
            </h3>
        </div>

        <div class="flex flex-wrap  " v-if="response && myAgency != publicAgency">

            <v-tabs v-model="tab" color="primary" slider-color="primary">
                <v-tab>
                    หัวหน้าหน่วยงาน / แอดมินหน่วยงาน
                </v-tab>
                <v-tab>
                    บุคลากรภายในหน่วยงาน
                </v-tab>
                <v-tab-item>
                    <div v-if="tab == 0">
                        <v-card outlined class="mt-4">
                            <v-card-text>
                                <v-text-field filled dense v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                                <v-data-table class="mt-4" :headers="headers" :items="dashboard.agency_passing_all" :search="search">
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div v-if="tab == 1">
                        <v-card outlined class="mt-4">
                            <v-card-text>
                                <v-text-field filled dense v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                                <v-data-table class="mt-4" :headers="headers" :items="dashboard.agency_user_all" :search="search">
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-tab-item>
            </v-tabs>
            <!-- 
            <div class="w-full overflow-hidden lg:w-1/2 xl:w-1/2  p-4 " style="height:400px!important; overflow-y:scroll!important;">
                <div class="w-full flex mb-4 shadow-xl rounded-xl border-b-4 m-2  p-3  " style="border-color:#66ccff; " v-for="user,uindex in dashboard.agency_passing_all" :key="uindex">
                    <v-avatar v-if="user.user" color="#5e5a98">
                        <span class="text-white headline">{{user.user.first_name[0]}}{{user.user.last_name[0]}}</span>
                    </v-avatar>
                    <div class="flex-grow pl-3">
                        <h6 class="font-bold text-md" v-if="user.user"> {{user.user.first_name}} {{user.user.last_name}}</h6>
                        <p class="text-xs text-gray-600">{{user.register_type}}</p>
                    </div>
                    <div class="w-auto text-right">
                        <v-chip color="#66ccff">หัวหน้าหน่วยงาน</v-chip>
                    </div>
                </div>
            </div>

            <div class="w-full overflow-hidden lg:w-1/2 xl:w-1/2   p-4   " style="height:400px!important; overflow-y:scroll!important;">
                <div class="w-full flex mb-4 shadow-xl rounded-xl border-b-4 m-2  p-3" v-for="user,jindex in dashboard.agency_user_all" :key="jindex" style="border-color:#e0b3ff;">
                    <v-avatar v-if="user.user" color="#5e5a98">
                        <span class="text-white headline">{{user.user.first_name[0]}}{{user.user.last_name[0]}}</span>
                    </v-avatar>
                    <div class="flex-grow pl-3">
                        <h6 class="font-bold text-md" v-if="user.user"> {{user.user.first_name}} {{user.user.last_name}}</h6>
                        <p class="text-xs text-gray-600">{{user.register_type}}</p>
                    </div>
                    <div class="w-auto text-right">
                        <v-chip color="#e0b3ff">บุคลากรภายในหน่วยงาน</v-chip>
                    </div>
                </div>
            </div> -->

        </div>

    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import Graph from '@/components/Pages/Home/Graph.vue'
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
import {
    Web
} from '@/store/web'
@Component({
    components: {
        Graph
    },
})
export default class Home extends Vue {
    publicAgency: any = 41
    myAgency: any = 0
    private dashboard: any = null
    private user: any = {}
    private years: any = []
    private response: boolean = false
    $vs: any
    search: any = ''
    headers: any = [{
            text: 'ที่',
            value: 'index'
        },
        {
            text: 'บัญชีผู้ใช้งาน',
            value: 'fullname'
        },
        {
            text: 'การเข้าสู่ระบบ',
            value: 'register_type'
        },
    ]
    tab: any = 0

    public async created() {
        await Web.switchLoad(true)
        this.response = false
        try {
            this.user = await User.getUser();
            this.myAgency = (this.user.ext_link) ? this.user.ext_link.agency : 0
            await this.getDashboard()
            this.years = await Core.getHttp(`/api/ita/v2/year/`)
            for (let i = 0; i < this.years.length; i++) {
                let res = await Core.getHttp(`/api/ita/v1/rateresult/?rate__year=${this.years[i].id}&agency=${this.user.ext_link.agency}`)
                let rate = await Core.getHttp(`/api/ita/v2/rate/${this.years[i].id}/`)
                this.years[i].result = res.length
                this.years[i].rate = rate.length
            }
            this.$vs.notification({
                color: "#7d33ff",
                icon: '<i class="em em-writing_hand" aria-role="presentation" aria-label="BOOKMARK"></i>',
                title: `กรุณาทำแบบประเมิน ${(this.myAgency != this.publicAgency)?'IIT และ ':''} EIT `,
                text: `หากท่านยังไม่ได้ทำแบบประเมิน`
            })

        } catch (error) {

        }
        await Web.switchLoad(false)
        this.response = true
    }

    public async getDashboard() {
        this.dashboard = await Core.getHttp(`/api/ita/v2/dashboard/${this.user.ext_link.id}/`)
        try {
            this.dashboard.agency_passing_all = _.map(this.dashboard.agency_passing_all, (item: any, index: any) => {
                item.index = index + 1
                if (item.user) {
                    item.fullname = item.user.first_name + ' ' + item.user.last_name
                } else {
                    item.fullname = 'ไม่มีข้อมูล'
                }
                return item
            })
        } catch (error) {

        }
        try {
            this.dashboard.agency_user_all = _.map(this.dashboard.agency_user_all, (item: any, index: any) => {
                item.index = index + 1
                if (item.user) {
                    item.fullname = item.user.first_name + ' ' + item.user.last_name
                } else {
                    item.fullname = 'ไม่มีข้อมูล'
                }
                return item
            })
        } catch (error) {

        }
    }

}
</script>
