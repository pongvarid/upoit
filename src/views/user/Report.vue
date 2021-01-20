<template>
<div class="bg-gray-200">
    <svg style="z-index:1;" class="absolute top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#a2d9ff" fill-opacity="1" d="M0,64L13.3,58.7C26.7,53,53,43,80,74.7C106.7,107,133,181,160,197.3C186.7,213,213,171,240,176C266.7,181,293,235,320,256C346.7,277,373,267,400,245.3C426.7,224,453,192,480,192C506.7,192,533,224,560,208C586.7,192,613,128,640,122.7C666.7,117,693,171,720,176C746.7,181,773,139,800,128C826.7,117,853,139,880,122.7C906.7,107,933,53,960,26.7C986.7,0,1013,0,1040,42.7C1066.7,85,1093,171,1120,218.7C1146.7,267,1173,277,1200,266.7C1226.7,256,1253,224,1280,192C1306.7,160,1333,128,1360,128C1386.7,128,1413,160,1427,176L1440,192L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"></path></svg>

  

    <div class="block relative mt-16 pt-16" style="z-index:1;" >
        <div class="container px-4 py-4 mx-auto">
              <h2 class="text-3xl mt-2 leading-tight font-semibold font-heading"> <v-btn @click="$router.go(-1)" flat icon text x-large ><v-icon>mdi-arrow-left-circle-outline</v-icon></v-btn>ผลการประเมิน</h2>
            <v-toolbar flat style="background:transparent;">
                ปีงบประมาณ <vs-select v-model="chooseYear" color="success" placeholder="ปีงบประมาณ">
                    <vs-option label="2563" value="1">
                        2563
                    </vs-option>
                    <vs-option label="2564" value="2">
                        2564
                    </vs-option>
                </vs-select>
                <v-spacer></v-spacer>
                <v-btn @click="prePrint()"><i class="em em-printer" aria-role="presentation" aria-label=""></i>Print</v-btn>
            </v-toolbar>

            <section class="py-8 px-4">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
                        <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-blue-600 ">

                            <div class="flex flex-col p-4">
                                <h2>OIT</h2>
                                <h3 class="text-xl mb-3 font-semibold font-heading font-semibold text-blue-600">26.75</h3>

                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
                        <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-yellow-600">

                            <div class="flex flex-col p-4">
                                <h2>IIT</h2>
                                <h3 class="text-xl mb-3 font-semibold font-heading font-semibold text-yellow-600">20.95</h3>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
                        <div class="h-35 rounded-xl shadow-xl bg-white border-b-4 border-purple-600">

                            <div class="flex flex-col p-4">
                                <h2>EIT</h2>
                                <h3 class="text-xl mb-3 font-semibold font-heading font-semibold text-purple-600">23.85</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <h3 class="block text-xl text-gray-700 font-semibold mb-3"></h3>
            <div class="flex flex-col md:flex-row  m-2">
                <div class="w-full md:w-1/2 ">
                    <div class="rounded-md p-6 bg-white shadow h-full">
                        <div class="mb-2 pb-2">
                            <h3 class="font-semibold text-lg text-gray-600">คะแนนภาพรวม</h3>
                            <p class="text-sm text-gray-500">คะแนนภาพรวมหน่วยงานมหาวิทยาลัยพะเยา : 71.55 คะแนน</p>
                        </div>
                        <apexchart type="radar" height="450px" :options="chartOptions" :series="series"></apexchart>
                        <center>
                            <h2 class="text-green-500 text-xl">ระดับผลการประเมิน </h2>
                            <h2 class="text-green-500 text-5xl">C</h2>

                        </center>
                    </div>
                </div>
                <div class="w-full md:w-1/2 m-2">
                    <div class="rounded-md p-6 bg-white shadow">
                        <div class="mb-2 pb-2">
                            <h3 class="font-semibold text-lg text-gray-600">ลำดับคะแนน</h3>
                            <p class="text-sm text-gray-500">สูงสุด {{scoreTop[0]}} , ต่ำสุด {{scoreDown[0]}}</p>
                        </div>
                        <v-tabs color="#8934eb" slider-color="#8934eb">
                            <v-tab>
                                คะแนนสูงสุด
                            </v-tab>
                            <v-tab-item>
                                <div v-for="data,i in top" :key="i">
                                    <v-toolbar flat style="background:transparent;" v-if="i<10">
                                        {{i+1}}. {{data.name}}
                                        <v-spacer></v-spacer>{{scoreTop[i]}}
                                    </v-toolbar>
                                </div>
                            </v-tab-item>
                            <v-tab>
                                คะแนนต่ำสุด
                            </v-tab>
                            <v-tab-item>
                                <div v-for="data,j in down" :key="j" class="">
                                    <v-toolbar flat style="background:transparent;" v-if="j<10">
                                        {{j+1}}. {{data.name}}
                                        <v-spacer></v-spacer>{{scoreDown[j]}}
                                    </v-toolbar>
                                </div>
                            </v-tab-item>
                        </v-tabs>
                    </div>
                </div>
            </div>

            <div class="flex">
                <div class="w-full p-6 rounded-xl shadow-xl bg-white mt-4 border-b-4 border-green-600 ">
                    <div class="mb-2 pb-2">
                            <h3 class="font-semibold text-lg text-gray-600">รายละเอียดผลการประเมิน</h3>
                            <p class="text-sm text-gray-500">หน่วยงานมหาวิทยาลัยพะเยา : 71.55 คะแนน</p>
                        </div>
                    <div class="flex p-2">
                        <div class="w-6/12">
                            การปฏิบัติหน้าที่	
                        </div>
                        <div class="w-6/12"><center>91.27</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="91.27" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                     <div class="flex p-2">
                        <div class="w-6/12">
                            คุณภาพการดำเนินงาน	
                        </div>
                        <div class="w-6/12"><center>88.23</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="88.23" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                     <div class="flex p-2">
                        <div class="w-6/12">
                            การใช้อำนาจ	
                        </div>
                        <div class="w-6/12"><center>87.48</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="87.48" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                     <div class="flex p-2">
                        <div class="w-6/12">
                            การใช้ทรัพย์สินของราชการ	
                        </div>
                        <div class="w-6/12"><center>82.27</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="82.27" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                     <div class="flex p-2">
                        <div class="w-6/12">
                            การใช้งบประมาณ	
                        </div>
                        <div class="w-6/12"><center>80.64</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="80.64" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                     <div class="flex p-2">
                        <div class="w-6/12">
                            การปรับปรุงระบบการทำงาน	
                        </div>
                        <div class="w-6/12"><center>80.22</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="80.22" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                     <div class="flex p-2">
                        <div class="w-6/12">
                            การแก้ไขปัญหาการทุจริต	
                        </div>
                        <div class="w-6/12"><center>78.98</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="78.98" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                     <div class="flex p-2">
                        <div class="w-6/12">
                            ประสิทธิภาพการสื่อสาร	
                        </div>
                        <div class="w-6/12"><center>78.27</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="78.27" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                     <div class="flex p-2">
                        <div class="w-6/12">
                            การเปิดเผยข้อมูล 	
                        </div>
                        <div class="w-6/12"><center>65.62</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="65.62" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div>
                    
                    <div class="flex p-2">
                        <div class="w-6/12">
                            การป้องกันการทุจริต 	 	
                        </div>
                        <div class="w-6/12"><center>42.56</center> 
                          <v-progress-linear striped height="10" color="#009900" :value="42.56" :buffer-value="100"></v-progress-linear> 
                        </div>
                    </div><br>

                </div>

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
export default class Home extends Vue {
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
    async created() {
        await Auth.reToken();
        this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
        this.top = _.orderBy(this.agency, ['count'], ['desc']);
        this.down = _.orderBy(this.agency, ['count'], ['asc']);
        //     let loader = await this.$loading.show()

        //   await loader.hide()

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
