<template>
  <div  >
    <div class="container px-auto">
      <h2 class="text-xl mt-2 leading-tight font-semibold font-heading"> ผลการประเมิน
        <v-btn class="m-1" @click="$router.push(`/export/up?year=${year}`)"><i class="em em-printer" aria-role="presentation" aria-label=""></i>Export</v-btn>
      </h2><br>
      <div class="flex ">
        <v-select class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="year" :items="years" item-text="year" item-value="year"></v-select>
       </div>
    </div>
    <div class="container px-auto w-full">
      <div class="flex flex-col" v-if="response == true">
        <All :year="year" />
        <Agency :year="year"  />
      </div>

      <div class="flex flex-wrap flex-col md:flex-row justify-center" v-else>
        <center>
          <div>
            <v-icon  style="font-size:79px; color:#3182ce;">mdi-information</v-icon><br><br>
            <h2  class="text-2xl text-blue-600">ยังไม่เปิดให้เข้าถึงข้อมูล</h2>
          </div>
        </center>
      </div >
    </div>


  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,Prop
} from 'vue-property-decorator';
import {
  Core
} from '@/store/core'
import {
  Auth
} from '@/store/auth'
import {
  User
} from '@/store/user'
import {
  Web
} from '@/store/web'
import All from '@/components/ReportUp/All.vue'
import Agency from '@/components/ReportUp/Agency.vue'
import _ from 'lodash'
// import UpIIT from './UpIIT.vue'
// import UpEIT from './UpEIT.vue'
// import UpOIT from './UpOIT.vue'
import XLSX from 'xlsx'
@Component({
  components: {
    All,Agency //UpIIT,UpEIT,UpOIT,
  },
})
export default class Home extends Vue {

  @Prop({default:false})
  private debug:any;

  appSetting:any = {}
  year: any = '2563'
  response:boolean = false
  private years:any = []

  async created() {

    this.appSetting = await Core.getHttp(`/setting/app/`)
    if(!this.debug){
      this.years = await _.filter(this.appSetting.year_result,{open:true})
    }else{
      this.years = this.appSetting.year_result
    }

    if(this.years[0]){
      this.year = this.years[this.years.length-1].year
    }
    await this.loadData();

  }


  async loadData(){
    this.response = false
    await Web.switchLoad(true)
    this.response = true;
    await Web.switchLoad(false)
  }





  prePrint(){
    window.print();
  }




}
</script>

<style>
.md\:w-74 {
  width: 26rem;
}

.f-white {
  color: white;
}
</style>
