<template>
<div>
    <div class="relative flex w-full mt-4 mb-4 max-w-full flex-col md:flex-row flex-1 px-2 py-2 ">
        <h3 class="  text-2xl text-gray-800">
            <span class="em em-chart_with_upwards_trend text-2xl" aria-role="presentation" aria-label=""></span> ผลการประเมิน
        </h3>
        <vs-select class="ml-4 shadow rounded-xl" value="1" placeholder="ประจำปี">
            <vs-option label="2563" value="1">
                2563
            </vs-option>
        </vs-select>
    </div>
    <div class="flex flex-wrap overflow-hidden mt-6">

        <div class="w-full h-full flex flex-col justify-center overflow-hidden lg:w-1/2 xl:w-1/2">

            <h2 class="text-blue-500 text-xl">คะแนนการประเมิน 91.07 คะแนน </h2>
            <h2 class="text-blue-500 text-2xl font-bold">ระดับผลการประเมิน A </h2>

            <div class="flex flex-col items-center">
                <apexchart class="mt-2 items-center" width="500" type="polarArea" :options="chartOptions" :series="series"></apexchart>
                <v-btn text @click="$router.push('/user/ita')">ดูทั้งหมด</v-btn>
            </div>

        </div>

        <div class="w-full flex flex-col justify-centeroverflow-hidden lg:w-1/2 xl:w-1/2 md:p-2" style="height:350px;">
            <bin-card class="m-2" c="#3366cc" i="IIT" t=" คิดเป็น 30%" :h="29.12" />

            <bin-card class="m-2" c="#ff6600" i="EIT" t=" คิดเป็น 40%" :h="38.83" />
            <bin-card class="m-2" c="#4d9900" i="OIT" t=" คิดเป็น 60%" :h="58.24" />

        </div>

    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Auth } from '@/store/auth'
import { Core } from '@/store/core'
import { User } from '@/store/user'
@Component({
    components: {

    },
})
export default class Graph extends Vue {

    series: any = [91.27, 88.23, 87.48, 82.27, 80.64, 80.22, 78.98, 78.27, 65.62, 42.56]
    chartOptions: any = {
        chart: {
            width: 380,
            type: 'polarArea'
        },
        stroke: {
            colors: ['#fff']
        },

        fill: {
            opacity: 0.8
        },
        labels: ['การปฏิบัติหน้าที่', 'คุณภาพการดำเนินงาน', 'การใช้อำนาจ', 'การใช้ทรัพย์สินของราชการ', 'การใช้งบประมาณ', 'การปรับปรุงระบบการทำงาน', 'การแก้ไขปัญหาการทุจริต', 'ประสิทธิภาพการสื่อสาร', 'การเปิดเผยข้อมูล', 'การป้องกันการทุจริต'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 400
                },
            }
        }]
    }
    public async created() {}

}
</script>
