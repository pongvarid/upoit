<template>
  <div class="relative md:pt-32 pb-32 pt-12">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
      <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class="font-semibold text-xl text-gray-800">
            <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ข้อมูลของหน่วยงานอื่นๆ

          </h3>
          <hr class="border-gray-600 border-2 mt-2">
        </div>
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
          <div v-if="appSetting.oit" class="flex flex-wrap">
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

                          <v-card flat class="bgh shadow-xl" @click="$router.push(`/user/list/?id=${agency.id}`)">
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
          <div v-else>
            <h2 class="text-xl"><i class="em em-disappointed_relieved" aria-role="presentation" aria-label="DISAPPOINTED BUT RELIEVED FACE"></i> ยังไม่เปิดให้ดูข้อมูล</h2>
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
  appSetting:any = {oit:false}
  private async run(){
    let loader = await this.$loading.show()
    this.appSetting = await Core.getHttp(`/setting/app/`)

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