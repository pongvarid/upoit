<template>
  <div v-if="response" >
    <div class="p-2">
      <h2>จำนวนผู้ทำแบบประเมินในหน่วยงาน</h2>
      <v-select class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="chooseYear" :items="years" item-text="year" item-value="year"></v-select>

    </div>
   <div class="p-2" v-if="iitResponse">
     <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" style="border-color:#ff8040;">
       <v-btn style="margin-right: 10px" color="#ff8040" large fab dark>
         <v-icon>IIT </v-icon>
       </v-btn>
       <div>
         <h2 class="text-xl">ประเมินแล้ว {{countIIT}} คน</h2>
         <h2 class="text-sm text-gray-700 ">จำนวนที่กำหนด {{myAgencyData.iit}} คน</h2>
         <v-chip v-if="countIIT >= myAgencyData.iit" small color="green" dark ><v-icon left>mdi-check</v-icon>ครบตามจำนวนที่กำหนดแล้ว</v-chip>
         <v-chip v-else small color="red" dark ><v-icon left>mdi-close</v-icon>ยังไม่ครบตามจำนวนที่กำหนด</v-chip>
       </div>
    </div>
   </div>

    <div class="p-2" v-if="eitResponse">
      <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" style="border-color:#8000ff;">
        <v-btn style="margin-right: 10px" color="#8000ff" large fab dark>
          <v-icon>EIT </v-icon>
        </v-btn>
        <div>
          <h2 class="text-xl">ประเมินแล้ว {{countEIT}} คน</h2>
          <h2 class="text-sm text-gray-700 ">จำนวนที่กำหนด {{myAgencyData.eit}} คน</h2>
          <v-chip v-if="countEIT >= myAgencyData.eit" small color="green" dark ><v-icon left>mdi-check</v-icon>ครบตามจำนวนที่กำหนดแล้ว</v-chip>
          <v-chip v-else small color="red" dark ><v-icon left>mdi-close</v-icon>ยังไม่ครบตามจำนวนที่กำหนด</v-chip>
        </div>
      </div>
    </div>

    <div class="p-2" v-if="OITYEAR">
      <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" style="border-color:#FFC300;">
        <v-btn style="margin-right: 10px" color="#FFC300" large fab dark>
          <v-icon>OIT</v-icon>
        </v-btn>
        <div>
          <h2 class="text-xl">บันทึกข้อมูลแล้ว {{countOIT}} ประเด็น</h2>
          <h2 class="text-sm text-gray-700 ">ประเด็นทั้งหมด {{countAllOIT}} ประเด็น</h2>
          <v-chip v-if="countOIT >= countAllOIT" small color="green" dark ><v-icon left>mdi-check</v-icon>บันทึกข้อมูลครบแล้ว</v-chip>
          <v-chip v-else small color="red" dark ><v-icon left>mdi-close</v-icon>ยังบันทึกข้อมูลไม่ครบ</v-chip>
        </div>
      </div>

    </div>



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
import _ from 'lodash'
@Component({
  components: {

  },
})
export default class Result extends Vue {
    user:any =null;
    response:boolean = false
    myAgency:any = 0
    myAgencyData:any = null
    years:any = []
    chooseYear:any = '2564'
    IITYEAR:any = null;
    EITYEAR:any = null;
    OITYEAR:any = null;
    countAllOIT:any = 0;
    countOIT:any = 0;
    countIIT:any = 0;
    countEIT:any = 0;
    async created() {
      this.user = await User.getUser();
      this.myAgency = this.user.ext_link.agency
      this.years = await Core.getHttp(`/api/ita/v1/year/`)
      this.myAgencyData = await Core.getHttp(`/api/ita/v1/agency/${this.myAgency}/`)

      await this.getIITYear()
      await this.getEITYear()
      await this.getOITYear()
      await this.getOIT();
      await this.getOITResult()
      await this.getIITRes();
      await this.getEITRes();
      this.response = true;
    }

    iitResponse:boolean = false;
    async getIITYear(){
      let yearIIT = await Core.getHttp(`/api/iit/v2/year/?year=${this.chooseYear}`)
      if(yearIIT.length > 0){
        this.IITYEAR = yearIIT[0]
        this.iitResponse = true
      }else{
        this.IITYEAR = null
        this.iitResponse = false
      }
    }

  eitResponse:boolean = false;
  async getEITYear(){
    let yearEIT = await Core.getHttp(`/api/eit/v2/year/?year=${this.chooseYear}`)

    if(yearEIT.length > 0){
      this.EITYEAR = yearEIT[0]
      this.eitResponse = true;
    }else{
      this.EITYEAR = null
      this.eitResponse = false
    }
  }


    async getIITRes(){
      let data = await Core.getHttp(`/api/iit/v2/ansewer/user/?agency=${this.myAgency}&year=${this.IITYEAR.id}`)
      this.countIIT = data.length
    }

  async getEITRes(){
    let data = await Core.getHttp(`/api/eit/v2/answersuggestioneit/?agency=${this.myAgency}&year=${this.EITYEAR.id}`)
    this.countEIT = data.length
  }

  async loadData(){
    await this.getIITYear();
    await this.getEITYear();
    await this.getIITRes();
    await this.getEITRes();
  }

  private async getOITYear(){
    let years = await Core.getHttp(`/api/ita/v2/year/`)
    let year:any = await _.filter(years,{"year":this.chooseYear})
    if(year.length > 0){
      this.OITYEAR = year[0]
    }
  }

  private async getOIT(){
    let oit = await Core.getHttp(`/api/ita/v2/rate/3/`)
    console.log(oit.length);
    this.countAllOIT = oit.length;
  }
  private async getOITResult(){
    let raw = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.myAgency}`);

    let result = await _(raw)
        .groupBy('rate')
        .map(function(items, data) {
          return {
            data: data,
          };
        }).value();
    this.countOIT = result.length;

  }
}
</script>