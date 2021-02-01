<template>
<div class="relative md:pt-32 pb-32 pt-12">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6    rounded   ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="font-semibold text-xl text-gray-800">
                    <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ผลการประเมิน IIT ของหน่วยงานต่างๆ

                </h3>
                <hr class="border-gray-600 border-2 mt-2">
            </div>
            <div class="  w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
                <div class="flex flex-wrap">
                    <div class="block w-full overflow-x-auto">
                        <v-tabs v-model="tab">
                            <v-tab v-for="tab,i in tabs" :key="i">{{tab.name}}</v-tab>
                            <v-tab-item v-for="tab,i in tabs" :key="i">
                                <div class="p-3">
                                    <form @submit.prevent="loadAgency(tab.id)">
                                        <v-text-field v-model="search" filled label="ค้นหา"></v-text-field>
                                    </form>
                                    <div class="flex flex-wrap">
                                        <div class="w-full md:w-4/12 p-2" v-for="agency,i in agencyies" :key="i">
                                            <v-card flat class="bgh shadow-xl" @click="$router.push(`/user/iit/report?id=${agency.id}`)">
                                                <div class="flex h-20 items-center elevation-6">
                                                    <v-icon class="p-4 ml-4">em em-classical_building</v-icon> 
                                                    <div class="p-4">
                                                        <h2 class="text-base">{{agency.name}}</h2>
                                                    </div> 
                                                </div>
                                            </v-card>
                       
                                        </div>  
                                    </div>
                                </div> 
                            </v-tab-item>
                        </v-tabs>
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
    Vue,
    Watch
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
    props: {
        color: {
            default: "light",
            validator: function (value) {
                // The value must match one of these strings
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    }
})
export default class AdminHome extends Vue {

    private agencyies: any = []
    private response: boolean = false
    private tabs: any = []
    private tab: number = 0
    private search: string = ''
    public async created() {

        await this.run()

    }

    seticon() {
        let tab = this.tab
        if (tab == 0) {
            return 'mdi mdi-account-group'
        } else if (tab == 1) {
            return 'mdi mdi-human-queue'
        } else {
            return 'mdi mdi-account-tie-outline'
        }
    }

    private async run() {
        let loader = await this.$loading.show()
        await this.loadTabType()
        await this.loadAgency(this.tabs[0].id)
        this.response = true
        await loader.hide()
    }

    private async loadTabType() {
        this.tabs = await Core.getHttp(`/api/ita/v1/agencytype/`)
        // await this.agencyies = Core.getHttp(`/api/agency`)
    }

    @Watch('tab')
    private async changeTab(val: any) {
        await this.loadAgency(this.tabs[val].id)
    }
    private async loadAgency(id: number) {
        this.agencyies = await Core.getHttp(`/api/ita/v2/agencys/?agency_type=${id}&search=${this.search}`)
    }

}
</script>

<style>
.f-white {
    color: white !important;
}

.bgh {
    background-color: #bf9bbf;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%23bf9bbf' width='11' height='11'/%3E%3Crect fill='%23c09cc0' x='10' width='11' height='11'/%3E%3Crect fill='%23c19ec1' y='10' width='11' height='11'/%3E%3Crect fill='%23c19fc1' x='20' width='11' height='11'/%3E%3Crect fill='%23c2a1c2' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23c3a2c3' y='20' width='11' height='11'/%3E%3Crect fill='%23c4a3c4' x='30' width='11' height='11'/%3E%3Crect fill='%23c5a5c5' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23c5a6c5' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23c6a7c6' y='30' width='11' height='11'/%3E%3Crect fill='%23c7a9c7' x='40' width='11' height='11'/%3E%3Crect fill='%23c8aac8' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23c9acc8' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23caadc9' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23caaeca' y='40' width='11' height='11'/%3E%3Crect fill='%23cbb0cb' x='50' width='11' height='11'/%3E%3Crect fill='%23ccb1cc' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23cdb3cc' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23ceb4cd' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23ceb5ce' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23cfb7cf' y='50' width='11' height='11'/%3E%3Crect fill='%23d0b8d0' x='60' width='11' height='11'/%3E%3Crect fill='%23d1b9d0' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23d2bbd1' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23d2bcd2' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23d3bed3' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23d4bfd4' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23d5c0d4' x='70' width='11' height='11'/%3E%3Crect fill='%23d6c2d5' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23d6c3d6' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23d7c5d7' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23d8c6d8' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23d9c8d8' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23dac9d9' x='80' width='11' height='11'/%3E%3Crect fill='%23dacada' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23dbccdb' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23dccddc' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23ddcfdc' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23ddd0dd' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23ded1de' x='90' width='11' height='11'/%3E%3Crect fill='%23dfd3df' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23e0d4e0' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23e1d6e0' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23e1d7e1' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23e2d9e2' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23e3dae3' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23e4dbe4' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%23e5dde4' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23e5dee5' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%23e6e0e6' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23e7e1e7' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%23e8e3e8' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%23e9e4e8' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%23e9e5e9' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%23eae7ea' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%23ebe8eb' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%23eceaec' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%23ecebec' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%23ededed' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23eeeeee' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
