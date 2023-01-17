<template>
<div class="relative md:pt-32  pt-12 ">
    <br><br>
    <h2 class="text-2xl">ข้อมูลการประเมินแต่ละหน่วยงาน</h2><br>
    <v-select class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="chooseYear" :items="years" item-text="year" item-value="year"></v-select>

    <v-card>
        <v-card-title>
            รายการ
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table v-if="response" :headers="headers" :items="agencies" :items-per-page="20" :search="search">
            <template v-slot:item.data.oit_passing="{ item }">
                <v-chip :color="(item.data.oit_passing)?'success':'red'" dark>
                    <v-icon v-if="(item.data.oit_passing)">mdi-checkbox-marked-circle</v-icon>
                    <v-icon v-else>mdi-close-circle</v-icon>

                    {{ (item.data.oit_passing)?'อนุมัติครบทุกประด็นแล้ว' : 'ยังอนุมัติไม่ครบทุกประด็น' }}
                </v-chip>
            </template>

            <template v-slot:item.data.rate="{ item }">
                <v-chip :color="(item.data.rate)?'success':'red'" dark>
                    <v-icon v-if="(item.data.rate)">mdi-checkbox-marked-circle</v-icon>
                    <v-icon v-else>mdi-close-circle</v-icon>

                    {{ (item.data.rate)?'ผ่านเกณฑ์' : 'ไม่ผ่านเกณฑ์' }}

                </v-chip>
            </template>

        </v-data-table>
    </v-card>
    <br><br>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';

import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
import _ from "lodash";
import {
    Web
} from '@/store/web'
@Component({
    components: {

    },
})
export default class Home extends Vue {
    private dashboard: any = null
    private user: any = {}
    private response: boolean = false
    private agencies: any = null
    private years: any = []
    chooseYear: any = '2566'
    IITYEAR: any = null;
    EITYEAR: any = null;
    OITYEAR: any = null;

    search: string = '';
    headers: any = [{
            text: 'ชื่อหน่วยงาน',
            value: 'name'
        },
        {
            text: 'IIT',
            value: 'data.iit'
        },
        {
            text: 'EIT',
            value: 'data.eit'
        },
        {
            text: 'OIT',
            value: 'data.oit'
        },
        {
            text: 'อนุมัติจากหัวหน้าหน่วยงาน (OIT)',
            value: 'data.oit_passing'
        },
        {
            text: 'ข้อมูลครบถ้วนตามเกณฑ์',
            value: 'data.rate'
        }
    ]

    public async created() {

        this.user = await User.getUser();
        this.years = await Core.getHttp(`/api/ita/v1/year/`)
        await this.loadData();

        this.response = true
    }

    private async getAgency() {
        this.agencies = await Core.getHttp(`/api/ita/v1/agency/`)
        this.agencies = _.sortBy(this.agencies, 'number')
        if (this.agencies.length > 0) {
            for (let i = 0; i < this.agencies.length; i++) {
                this.agencies[i]['oit'] = this.OIT_COUNT
                let iit_done = (await _.filter(this.IIT_ALL, {
                    agency: this.agencies[i].id
                })).length
                let iit_set = this.agencies[i]['iit'];
                let eit_done = (await _.filter(this.EIT_ALL, {
                    agency: this.agencies[i].id
                })).length
                let eit_set = this.agencies[i]['eit']
                this.agencies[i]['data'] = {
                    "iit": iit_done + '/' + iit_set, // (await _.filter(this.IIT_ALL,{agency:this.agencies[i].id})).length + '/' + this.agencies[i]['iit'],
                    "eit": eit_done + '/' + eit_set, //(await _.filter(this.EIT_ALL,{agency:this.agencies[i].id})).length + '/' + this.agencies[i]['eit'],
                    "oit": await this.getOITResult(this.agencies[i].id, false) + '/' + this.OIT_COUNT, // await this.getOITResult(this.agencies[i].id)
                    "oit_passing": await this.getOITResult(this.agencies[i].id, true),
                    "rate": ((iit_done >= iit_set) && (eit_done >= eit_set)) ? true : false
                }
            }
        }
    }

    async loadData() {
        this.response = false
        await Web.switchLoad(true);
        await this.getIITYear();
        await this.getEITYear();
        await this.getOITYear();
        await this.getOIT();
        await this.getResultAll();
        await this.getAgency();
        this.response = true
        await Web.switchLoad(false);

    }

    private IIT_ALL: any = null
    private OIT_ALL: any = null
    private EIT_ALL: any = null
    private OIT_COUNT: any = 0
    async getOIT() {
        let oit = await Core.getHttp(`/api/ita/v2/rate/${this.OITYEAR.id}/`)
        console.log(oit.length);
        this.OIT_COUNT = oit.length;
    }
    async getResultAll() {
        this.IIT_ALL = await Core.getHttp(`/api/iit/v2/ansewer/user/?year=${this.IITYEAR.id}`)
        this.EIT_ALL = await Core.getHttp(`/api/eit/v2/answersuggestioneit/?year=${this.EITYEAR.id}`)
        this.OIT_ALL = await Core.getHttp(`/api/ita/v1/rateresult/?rate__year=${this.OITYEAR.id}`);
    }
    async getEITYear() {
        let yearEIT = await Core.getHttp(`/api/eit/v2/year/?year=${this.chooseYear}`)
        if (yearEIT.length > 0) {
            this.EITYEAR = yearEIT[0]
        } else {
            this.EITYEAR = {
                id: 0
            }
        }
    }
    async getIITYear() {
        let yearIIT = await Core.getHttp(`/api/iit/v2/year/?year=${this.chooseYear}`)
        if (yearIIT.length > 0) {
            this.IITYEAR = yearIIT[0]
        } else {
            this.IITYEAR = {
                id: 0
            }
        }
    }
    async getOITYear() {
        let years = await Core.getHttp(`/api/ita/v1/year/`)
        let year: any = await _.filter(years, {
            "year": this.chooseYear
        })
        if (year.length > 0) {
            this.OITYEAR = year[0]
        } else {
            this.OITYEAR = {
                id: 0
            }
        }
    }

    private async getOITResult(agency: number, passing: boolean) {
        let raw = await _.filter(this.OIT_ALL, {
            agency: agency
        })

        let result = await _(raw)
            .groupBy('rate')
            .map((items, data) => {
                return {
                    passing: this.getPassing(items),
                    data: data,
                };
            }).value();

        // console.log(result)

        return (passing) ? this.getPassing(result) : result.length;

    }

    private getPassing(data: any) {
      if(data.length > 0){
        let dd = _.filter(data, {
            passing: false
        })
        //console.log('check',(dd.length > 0) ? false : true);
        return (dd.length > 0) ? false : true
      }else{
        return false
      }
   
    }
}
</script>
