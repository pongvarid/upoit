<template>
<div class="  w-full" v-if="response">

    <v-toolbar>
        <h2 class="text-xl font-bold">ผลการประเมิน OIT </h2>
        <v-spacer></v-spacer>
        <h2><span class="font-bold">ผลรวม</span> {{ ((oitA.score + oitB.score) / 2).toFixed(2)}} คะแนน | <v-btn x-small fab color="blue">40%</v-btn> {{all.oit}} คะแนน</h2>

    </v-toolbar>

    <br>

    <div>

        <v-card>
            <v-card-title class="bg-purple-x text-white shadow-xl">
                <h2 class="text-sm"><span class="font-bold">การเปิดเผยข้อมูล</span> </h2>
            </v-card-title>
            <v-card-text>
                <div v-for="(oit,index) in rates" :key="index" v-if="oit.number < 34">
                    <v-toolbar flat>
                        <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                        <v-spacer></v-spacer>
                        <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                    </v-toolbar>
                     <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>

                </div>
            </v-card-text>
        </v-card>
 
          <v-card>
            <v-card-title class="bg-purple-x text-white shadow-xl">
                <h2 class="text-sm"><span class="font-bold">การป้องกันการทุจริต</span> </h2>
            </v-card-title>
            <v-card-text>
                <div v-for="(oit,index) in rates" :key="index" v-if="oit.number > 34">
                    <v-toolbar flat>
                        <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                        <v-spacer></v-spacer>
                        <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                    </v-toolbar>
                     <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>

                </div>
            </v-card-text>
        </v-card>
    </div>

 
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from 'vue-property-decorator';

import { Web } from "@/store/web";
import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
import _ from 'lodash'

@Component({
    components: {

    },
    props: {
        color: {
            default: "light",
            validator: function (value) {
                // The value must match one of these strings
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    }
})
export default class Home extends Vue {
    @Prop({ default: 7 })
    agencyData: any;

    @Prop({ default: { oit: 0 } })
    all: any;

    @Prop({ default: '2563' })
    yearData: any;

    @Prop({ default: '2563' })
    lists: any;

    private year: any = []
    private rates: any = []
    private response: boolean = false
    private panel: any = [1, 0]
    private agency: any = {};
    private oitA: any = ''
    private oitB: any = ''

    private data: any = [];

    private status: any = []

    public async created() {

        await this.run()

    }
    result: any = []
    appSetting: any = { oit_link: false }
    private async run() {
        await Web.switchLoad(true)
        this.appSetting = await Core.getHttp(`/setting/app/`)
        this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.agencyData}/`)
        this.year = await Core.getHttp(`/api/ita/v2/year/`)
        this.year = await _.find(this.year, { year: this.yearData })
        if (this.year) {
            this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.year.id}/`)
            this.result = await Core.getHttp(`/api/oit/v1/evaluateoit/?agency=${this.agencyData}`)
            this.data = await Core.getHttp(`/api/ita/v1/rateresult/?rate__year=${this.year.id}&agency=${this.agencyData}`)
            this.status = await Core.getHttp(`/api/ita/v1/ratestatus/`)
            console.log(this.data);
            this.oitA = await _.find(this.lists, { name: 'การเปิดเผยข้อมูล' })
            this.oitB = await _.find(this.lists, { name: 'การป้องกันการทุจริต' })
            await this.generateTable()
            await Web.switchLoad(false)
            this.response = true;
        }
        await Web.switchLoad(false)

    }

    private async generateTable() {
        for (let i = 0; i < this.rates.length; i++) {
            // console.log(this.rates[i].id);
            let result: any = _.filter(this.result, {
                'rate': this.rates[i].id
            })
            //this.rates[i].evaluate  = await this.getEvaluate(this.rates[i].id)

            let score = ((await _.sumBy(result, 'score')) / 1) * 100
            this.rates[i].score = score + "%"
            this.rates[i].score_raw = score
            this.rates[i].detail = _.filter(this.data, { rate: this.rates[i].id })

            this.rates[i].comment = (result[0]) ? result[0].comment : ''
            this.rates[i].status = (await _.find(this.status, { id: result[0].rate_status })).name
        }
    }

    private genScore() {

    }
    private openLink(url: string) {
        window.open(url, '_blank');
    }

}
</script>

<style>
.f-white {
    color: white !important;
}
</style>
