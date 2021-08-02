<template>
  <div class="block relative container mx-auto" style="z-index:1;" >
    <h2 class="text-3xl mt-2 leading-tight font-semibold font-heading"> <v-btn @click="$router.go(-1)" flat icon text x-large ><v-icon>mdi-arrow-left-circle-outline</v-icon></v-btn>ผลการประเมิน</h2>

  

    <v-tabs  >
      <v-tab>
        ผลประเมินภาพรวมระดับมหาวิทยาลัย
      </v-tab>
      <v-tab-item>
        <AllUp></AllUp>
      </v-tab-item>
      <v-tab>
        ผลประเมินระดับหน่วยงาน
      </v-tab>
      <v-tab-item>
        <AgencyUp></AgencyUp>
      </v-tab-item>
    </v-tabs>



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
  Auth
} from '@/store/auth'
import {
  User
} from '@/store/user'
import  AllUp from '@/components/Report/AllUp.vue'
import  AgencyUp from '@/components/Report/AgencyUp.vue'
import _ from 'lodash'
@Component({
  components: {
    AllUp,AgencyUp
  },
})
export default class Home extends Vue {
  dialogPause:boolean = false
  private form: any = {}
  chooseYear: any = '1'
  series: any = [{
    name: 'data',
    data: [91.27, 88.23, 87.48, 82.27, 80.64, 80.22, 78.98, 78.27, 65.62, 42.56],
  }]

  chartOptions: any = {
    chart: {
      height: 350,
      type: 'radar',
    },
    title: {},
    xaxis: {
      categories: ['การปฏิบัติหน้าที่', 'คุณภาพการดำเนินงาน', 'การใช้อำนาจ', 'การใช้ทรัพย์สินของราชการ', 'การใช้งบประมาณ', 'การปรับปรุงระบบการทำงาน', 'การแก้ไขปัญหาการทุจริต', 'ประสิทธิภาพการสื่อสาร', 'การเปิดเผยข้อมูล', 'การป้องกันการทุจริต']
    }
  }
  private agency: any = null
  private top: any = [];
  private down: any = []
  private scoreTop: any = [95.67, 85.45, 75.44, 74.55, 73.22, 73.11, 73.05, 72.95, 72.11, 71.99]
  private scoreDown: any = [71.99, 72.11, 72.95, 73.05, 73.11, 73.22, 74.55, 75.44, 85.45, 95.67]
  private setting:any
  async created() {
    //  await Auth.reToken();
    this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
    this.top = _.orderBy(this.agency, ['count'], ['desc']);
    this.down = _.orderBy(this.agency, ['count'], ['asc']);
    //     let loader = await this.$loading.show()

    //   await loader.hide()\

    let web = await Core.getHttp(`/setting/app/`)
    this.setting = web
    if(web.result){
      this.dialogPause = web.result;
    }

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
