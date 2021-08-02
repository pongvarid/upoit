<template>
<div class="p-6">
      <v-btn v-if="!printing" @click="print()" outline>Print</v-btn>
    <center>
        <img class="h-24" src="https://upload.wikimedia.org/wikipedia/th/d/d7/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%9E%E0%B8%B0%E0%B9%80%E0%B8%A2%E0%B8%B2.png" alt="">
        <h2 class="font-bold mt-2 ">รายงานผลการประเมิน UP ITA  </h2>
        <h2>ประจำปีงบประมาณ {{currentYear}}</h2>
        <h2>หน่วยงาน : {{agency.name}}</h2> 
    </center>
    <br>
    <All :agency="currentAgency" :year="currentYear" />
   <TableUser />
  
</div>
</template>

<script>
import { Report } from '@/store/report'
import { Core } from '@/store/core'
import All from '@/components/ReportUp/ExportAgency.vue'
import TableUser from '@/components/ReportUp/TableUser.vue'

export default {
    components:{All,TableUser},
    data() {
        return ({
            currentYear: this.$route.query.year,
            yearIIT: {},
            yearEIT: {},
            yearOIT: {},
            appSetting:{},
            printing:false,
            currentAgency : this.$route.query.agency,
            agency:{}
        })
    },
    async created() {
        await this.getYear();
        this.agency = await Core.getHttp(`/api/ita/v2/agency/${this.currentAgency}/`)
        this.appSetting = await Core.getHttp(`/setting/app/`)
    },
    methods: {
        async getYear() {
            this.yearIIT = await Report.getYearIIT(this.currentYear)
            this.yearEIT = await Report.getYearEIT(this.currentYear)
            this.yearOIT = await Report.getYearOIT(this.currentYear)
        },
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
