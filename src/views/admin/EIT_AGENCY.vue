<template>
  <div class="relative md:pt-32 pb-32 pt-12">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
      <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class="font-semibold text-xl text-gray-800">
            <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ผลการประเมิน EIT ของหน่วยงานต่างๆ

          </h3>
          <hr class="border-gray-600 border-2 mt-2">
        </div>
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
          <div class="flex flex-wrap">
            <div class="block w-full overflow-x-auto">
              <v-tabs v-model="tab">
                <v-tab  v-for="tab,i in tabs" :key="i">{{tab.name}}</v-tab>

                <v-tab-item v-for="tab,i in tabs" :key="i" >
                  <div class="p-3">
                    <form  @submit.prevent="loadAgency(tab.id)">
                      <v-text-field v-model="search" filled label="ค้นหา"></v-text-field>
                    </form>
                    <div class="flex flex-wrap">
                      <div class="w-full md:w-4/12 p-2" v-for="agency,i in agencyies" :key="i">
                        <card-stats
                            :statRoute="`/admin/eit/report?id=${agency.id}`"
                            :statSubtitle="tab.name"
                            :statTitle="agency.name"
                            statArrow="up"
                            statPercent="12"
                            statPercentColor="text-purple-800"
                            statDescripiron="Since last month"
                            :statIconName="seticon()"
                            statIconColor="bg-purple-800"
                        />
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
  Vue,Watch
} from 'vue-property-decorator';
import CardStats from "@/components/Cards/CardStatWithBtnUser.vue";

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

  private agencyies : any = []
  private response : boolean = false
  private tabs:any = []
  private tab:number = 0
  private search:string = ''
  public async created() {

    await this.run()

  }

  seticon(){
    let tab = this.tab
    if (tab == 0){
      return 'mdi mdi-account-group'
    }else if(tab == 1){
      return 'mdi mdi-human-queue'
    }else{
      return 'mdi mdi-account-tie-outline'
    }
  }

  private async run(){
    let loader = await this.$loading.show()
    await this.loadTabType()
    await this.loadAgency(this.tabs[0].id)
    this.response = true
    await loader.hide()
  }

  private async loadTabType(){
    this.tabs = await Core.getHttp(`/api/ita/v1/agencytype/`)
    // await this.agencyies = Core.getHttp(`/api/agency`)
  }

  @Watch ('tab')
  private async changeTab(val:any){
    await this.loadAgency(this.tabs[val].id)
  }
  private async loadAgency(id:number){
    this.agencyies = await Core.getHttp(`/api/ita/v2/agencys/?agency_type=${id}&search=${this.search}`)
  }

}
</script>

<style>
.f-white {
  color: white !important;
}
</style>