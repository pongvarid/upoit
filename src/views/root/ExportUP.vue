<template>
<div class="p-6">
      <v-btn v-if="!printing" @click="print()" outline>Print</v-btn>
    <center>
        <img class="h-24" src="https://upload.wikimedia.org/wikipedia/th/d/d7/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%9E%E0%B8%B0%E0%B9%80%E0%B8%A2%E0%B8%B2.png" alt="">
        <h2 class="font-bold mt-2 ">รายงานผลการประเมิน UP ITA  </h2>
        <h2>ประจำปีงบประมาณ {{currentYear}}</h2> 
    </center>
    <br>
    <All :year="currentYear" />
  
   
  
</div>
</template>

<script>
import { Report } from '@/store/report'
import { Core } from '@/store/core'
import All from '@/components/ReportUp/ExportAll.vue'

export default {
    components:{All},
    data() {
        return ({
            currentYear: this.$route.query.year,
         
            appSetting:{},
            printing:false
        })
    },
    async created() {
     
        this.appSetting = await Core.getHttp(`/setting/app/`)
    },
    methods: {
        
        async changeStatePrint(state){
            this.printing = state
        },
        async print(){
            await this.changeStatePrint(true)
            await window.print()
            await this.changeStatePrint(false)
        }
    }

}
</script>

<style>

</style>
