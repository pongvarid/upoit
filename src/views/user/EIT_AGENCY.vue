<template>
  <div class="  md:pt-32 pb-32 pt-12">
    <div class="   flex flex-col min-w-0 break-words w-full mb-6  bg-white rounded shadow-lg ">
      <div class="rounded-t mb-0 px-4 py-3 border-0 ">
        <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
          <h3 class="font-semibold text-xl text-gray-800">
            <i class="em em-blue_book" aria-role="presentation" aria-label="BLUE BOOK"></i>&nbsp;ผลการประเมิน EIT ของหน่วยงานต่างๆ

          </h3>
          <hr class="border-gray-600 border-2 mt-2">
        </div>
        <div class="  w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2" v-if="response">
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
                         <v-card flat class="bgh shadow-xl" @click="$router.push(`/user/eit/report?id=${agency.id}`)">
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

    <vs-dialog prevent-close not-close blur v-model="blockDialog"> 
        <v-card flat>
            <v-card-text>
                 <center><i class="em em-cry text-4xl" s aria-role="presentation" aria-label="CRYING FACE"></i></center><br>
                 <center><h2 class="text-4xl">ขออภัย</h2></center><br>
                 <center><p class="text-xl">ระบบยังไม่เปิดให้ท่านเข้าถึงข้อมูล <b>ผลการประเมิน (EIT)</b> ได้ <br> กรุณาลองใหม่ในภายหลัง</p></center>
            </v-card-text>
            <v-card-actions>
                <v-btn class="w-full" color="primary" large outlined @click="$router.go(-1)">
                    กลับ
                </v-btn>
            </v-card-actions>
        </v-card>
    </vs-dialog>

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
import {
  Web
} from '@/store/web'
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
  private blockDialog:boolean = true;
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
  private async getBlock(){
    let user = await User.getProfile();
    this.blockDialog = (user.is_superuser)?false:true
  }
  private async run(){
    await this.getBlock();
    await Web.switchLoad(true)
    await this.loadTabType()
    await this.loadAgency(this.tabs[0].id)
    this.response = true
    await Web.switchLoad(false)
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