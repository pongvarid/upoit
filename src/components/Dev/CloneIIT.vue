<template>
  <div class="md:pt-6 pb-32 pt-44"  >
    <form  @submit.prevent="searchYear()">
      <v-select v-model="currentYears"  :items="years" item-value="id" item-text="year" label="ปีงบประมาณเดิม" outlined></v-select>
      <v-btn type="submit">ค้นหา</v-btn>
    </form>
    <pre>{{assessmentissues}}</pre>
  
 




  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Core/Navbar.vue";
import Loading from "@/components/Web/Loading.vue";
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Web } from "@/store/web";
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import _ from 'lodash'
import XLSX from 'xlsx' // import xlsx
 
@Component({
  components: {
    Navbar,
    Loading,
  },
  computed: {}
})

export default class TestDevClass extends Vue {

    years:any = []
    currentYears:any = {}
 

  async created(){
    await Web.switchLoad(true)
    this.years = await Core.getHttp(`/api/iit/v2/year/`)
    await Web.switchLoad(false) 
  }

assessmentissues:any = []
  async searchYear(){
      this.assessmentissues = await Core.getHttp(`/api/iit/v2/assessmentissues/?year=${this.currentYears}`)
  }
 

   
  $vs:any
  async openNotification(position:any = null, color:any, icon:any,title:string,text:string) {

    const noti = this.$vs.notification({
      icon,
      color,
      position,
      title: title,
      text: text}) }
  percentage(partialValue:any, totalValue:any) {
    return Number(((100 * partialValue) / totalValue).toFixed(0))
  }

}
</script>

