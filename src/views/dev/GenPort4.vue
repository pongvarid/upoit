<template>
<div>
    <br><br><br>
    <div class="flex">
        <v-text-field dense outlined label="ปีงบประมาณ" v-model="year"></v-text-field>
        <v-btn @click="getData()" class="ml-4" color="success">สร้างรายงาน</v-btn>
    </div>
    <div>
        <v-btn @click="exportData()" color="success">Export</v-btn>

        <table ref="tblToExcl" id="my-table">
            <tr>
                <th>คณะ/หน่วยงาน</th>
                <th>รายการตัวชี้วัด</th>
                <th>คะแนน</th>
            </tr>
            <tr v-for="data,i in rawData" :key="i">
                <td>{{data.key}}</td>
                <td style="border:0;">
            <tr v-for="inData,j in data.data" :key="j">
                <td style="border-left:0;border-right:0;border-top:0">{{j+1}}</td>
                <td style="border-right:0;border-top:0">{{inData.name}}</td>
                <td style="border-right:0;border-top:0">{{inData.score}}</td>

            </tr>
            </td>
            <td>
                <table style="height:100%">

                    <tr>
                        <td>IIT</td>
                        <td v-if="data.score">{{data.score.iit}}</td>
                        <td v-if="data.score">ร้อยละ 30 </td>
                    </tr>
                    <tr>
                        <td>EIT</td>
                        <td v-if="data.score">{{data.score.eit}}</td>
                        <td v-if="data.score">ร้อยละ 30 </td>
                    </tr>
                    <tr>
                        <td>OIT</td>
                        <td v-if="data.score">{{data.score.oit}}</td>
                        <td v-if="data.score">ร้อยละ 40 </td>
                    </tr>
                    <tr>
                        <td>รวม</td>
                        <td v-if="data.score">{{data.score.all}}  
                        </td>
                        <td v-if=" data.score">
                            (IIT={{data.score.iit_100}}  EIT={{data.score.eit_100}}  OIT={{data.score.oit_100}})
                        </td>
                    </tr>
                    <tr>
                        <td>ผล</td>
                        <td v-if="data.score">{{data.score.rate}}</td>
                    </tr>
                    <tr>
                        <td>ระดับการประเมิน</td>
                        <td v-if="data.score">{{data.score.rate_new}}</td>
                    </tr>
                </table>
            </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
import XLSX from 'xlsx' // import xlsx
import {
    Core
} from '@/store/core'
import _ from 'lodash'
import $ from 'jquery';
import 'tableexport';
import 'tableexport/dist/css/tableexport.min.css';
import 'xlsx/dist/xlsx.core.min.js'
import TableExport from 'tableexport'
export default {
    data() {
        return {
            year: '2567',
            rawData: [],
            rawDataAll: [],
        }
    },
    async created() {

    },
    methods: {
        get100Percent(score, max) {
            return Number(((score / max) * 100).toFixed(2))
        },
        inRange(x, min, max) {
                return ((x - min) * (x - max) <= 0);
            },
        getRateNew(i,o,e, rate) {
            if((rate >= 95.00) && (i >= 95.00 && o >= 95.00 && e >= 95.00)  ){
                return 'ผ่านดีเยี่ยม'
            }else if((rate >= 85.00 && rate <= 100) && (i >= 85.00 && o >= 85.00 && e >= 85.00) ){
                return 'ผ่านดี'
            }else if (this.inRange(rate, 85.00, 100)) {
                return 'ผ่าน'
            }
            else if (this.inRange(rate, 70.00, 84.99)) {
                return 'ต้องปรับปรุง'
            }
            else if (this.inRange(rate, 0, 69.99)) {
                return 'ต้องปรับปรุงโดยด่วน'
            }  else {
                return 'ไม่ทราบค่า'
            }
        },
        async getData() {
            await this.loadDataAll()
            await this.loadData()
        },
        async loadData() {
            let data = await Core.getHttp(`/api/report/v1/reportdetail-all/?year=${this.year}`)
            let dataConvert = _.map(data, (r) => {
                r.agency_name = (r.agency) ? r.agency.name : ''
                r.agency_id = (r.agency) ? r.agency.id : ''
                return r
            })
            dataConvert = _.groupBy(dataConvert, 'agency_name')

            dataConvert = Object.keys(dataConvert).map((key) => ({
                key: key,
                score: _.find(this.rawDataAll, {
                    agency_name: key
                }),
                data: _.orderBy(dataConvert[key], ['order'], ['asc'])
            }));
            console.log("BBBB", dataConvert)
            dataConvert = _.sortBy(dataConvert, (r) => {

                try {
                    return r.score.all
                } catch (e) {
                    return 0
                }

            }).reverse()
            this.rawData = dataConvert
            console.log(dataConvert)
        },
        async loadDataAll() {
            let data = await Core.getHttp(`/api/report/v1/reportall-all/?year=${this.year}`)
            let dataConvert = _.map(data, (r) => {
                r.agency_name = (r.agency) ? r.agency.name : ''
                r.agency_id = (r.agency) ? r.agency.id : ''
                delete r.agency
                r.iit_100 = this.get100Percent(r.iit, 30)
                r.eit_100 = this.get100Percent(r.eit, 30)
                r.oit_100 = this.get100Percent(r.oit, 40)
                r.rate_new = this.getRateNew(r.iit_100, r.oit_100, r.eit_100, r.all)
                return r
            })
            console.log("dataConvert", dataConvert)
            this.rawDataAll = dataConvert

        },
        async exportData(type = "xlsx") {
            var data = this.$refs.tblToExcl;
            // var excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
            // XLSX.write(excelFile, { bookType: type, bookSST: true, type: 'base64' });
            // XLSX.writeFile(excelFile, 'ExportedFile:HTMLTableToExcel.' + type); 

            const worksheet = XLSX.utils.table_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            let remove = 2
            for (let i = 1; i < 700; i++) {
                if (i == 2) {
                    delete worksheet[`B${i}`]
                    delete worksheet[`C${i}`]
                    console.log(`B${i}`)
                    console.log(`C${i}`)
                    remove = i + 17
                } else {
                    if (i == remove) {
                        delete worksheet[`B${i}`]
                        delete worksheet[`C${i}`]
                        remove = i + 17
                    }
                }

            }
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            XLSX.writeFile(workbook, 'table.xlsx');

        }
    }
}
</script>

<style>
th,
td {
    border: 1px solid black;
    width: 100px;
    height: 50px;
}

table {
    width: 100%;
}
</style>
