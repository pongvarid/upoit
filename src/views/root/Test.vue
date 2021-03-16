<template>
  <div v-if="response">
  <h2>sdsd</h2>
<pre>{{rawDetail}}</pre>
<!--      <div v-for="xx,i in rawDetail" :key="i">-->
<!--        <v-toolbar>{{xx.xagency.name}} <v-spacer></v-spacer> {{xx.name}}</v-toolbar>-->
<!--      </div>-->

<!--    <v-btn @click="store2563()">Save</v-btn>-->
    <v-btn @click="store2563()">Save</v-btn>
    <v-btn @click="storeAll365()">SaveALL</v-btn>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";
import dd from '@/tmp/result.json'
import detail from '@/tmp/detail2563.json'
import all from '@/tmp/all2563.json'
import agency from '@/tmp/agency.json'
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import {
    User
} from "@/store/user";
import {
    Auth
} from "@/store/auth";
import _ from 'lodash'
import {
  Core
} from "@/store/core";
@Component({
    components: {

    },
    computed: {}
}) 

export default class Test extends Vue {
    page: any = ''
    response: boolean = false
    raw:any = dd.Sheet1
    rawDetail:any = detail.data
    rawAll:any = all.data
    agencies:any =  agency

    rawx:any = null

    async created()   {
      //this.agencies = await Core.getHttp(`/api/agency/v1/`)
      await this.genLoop();
      await this.genLoop2();
      this.response = true
    //  console.log(this.rawAll.length)
      // await this.genLoop()
    }

    async storeAll365(){
      for (let i=0; i< this.rawAll.length; i++){
         await Core.postHttp(`/api/report/v1/reportall/`,this.rawx[i])
      }
    }

    async store2563(){
      for (let i=0; i< this.rawDetail.length; i++){
      //  console.log(form)
        console.log(i,this.rawDetail[i]['name'],'---------------------------------------------------------------')
        for (let j=0; j< this.rawDetail[i].data.length; j++){
          console.log(j,this.rawDetail[i].data[j]['name'])
          let form = {
            "year": "2563",
            "name": this.rawDetail[i].data[j]['name'],
            "score": this.rawDetail[i].data[j]['score'],
            "order": this.rawDetail[i].data[j]['order'],
            "agency": this.rawDetail[i].agency
          }

        await Core.postHttp(`/api/report/v1/reportdetail/`,form)

        }

      }
    }
    async genLoop(){
      let y =0;
      let agencies:any = []
      for (let i =0; i < this.raw.length; i++){


        if(this.raw[i]['คณะ/หน่วย']){
          agencies[y] = {
           // name:this.raw[i]['คณะ/หน่วย'] ,
            'rate' : this.raw[i]['ระดับ'],
            "year" : '2563',
            'all' : this.raw[i]['ผลสรุปการประเมิน'],
             agency:  this.getAgency(this.raw[i]['คณะ/หน่วย']),
            }
          y++;
        }
        if(agencies[(y-1)]){
          if(this.raw[i]['แบบ/ค่าน้ำหนัก (ร้อยละ)']){
            let namex:any = this.raw[i]['แบบ/ค่าน้ำหนัก (ร้อยละ)']
            agencies[(y-1)][namex.toLowerCase()] = this.raw[i]['ผลสรุปการประเมิน']



            // console.log(this.raw[i]['คณะ/หน่วย'] );
            // console.log(`{${this.raw[i]['แบบ/ค่าน้ำหนัก (ร้อยละ)']} : ${this.raw[i]['ผลสรุปการประเมิน']}}`)
          }

          // if(this.raw[i]['ตัวชี้วัด']){
          //   agencies[(y-1)].data.push({
          //     "name":this.raw[i]['ตัวชี้วัด'],
          //     "score":this.raw[i]['ผลประเมิน Pre-Assessment'],
          //     "order":this.raw[i]['อันดับ']
          //   })
          // }
        }

      }
      this.rawx = agencies
      //console.log(agencies)
    //  console.log(JSON.stringify(agencies))
    }
    async genLoop2(){
      for (let i=0; i < this.rawDetail.length; i++){
       this.rawDetail[i].agency =   this.getAgency(this.rawDetail[i].name );
      }
    }
    async foundAgency(name:string){
      let ag = await Core.getHttp(`/api/ita/v1/agency/?name=${name}`)
      if(ag.length>= 1){
        return ag[0].id
      }else{
        return null;
      }
    }

      getAgency(name:string){
      let data =   _.find(this.agencies,{name:name})
      return data.id
    }
}
</script>
