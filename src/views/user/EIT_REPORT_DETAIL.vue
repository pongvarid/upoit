<template>
<div class="relative md:pt-32 pb-32 pt-12  ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 ">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800">
                    <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> ข้อมูลของหน่วยงาน
                </h3>
                <!--            <hr class="border-gray-600 border-1 mt-2">-->
            </div>

            <div class="w-full ">
                <div class="flex flex-wrap justify-center">
                    <button @click="getDataIssue(assign.id)" v-for="assign,index in assessment" :key="index" :class="`bg-green-600 p-2 rounded shadow-lg m-1 text-white`">{{assign.name}}</button>

                </div>
            </div>
            <div>
                <div v-if="!suggestion">
                    <v-card v-for="issue,is_index in data" :key="is_index" class="m-2">
                        <v-card-title primary-title>
                            <h2 class="text-sm font-bold">
                                <v-avatar class="bg-teal-500 text-white" size="36"> i{{issue.value[0].issue.order}} </v-avatar>
                                {{issue.value[0].issue.name}}
                            </h2>
                        </v-card-title>
                        <v-card-text>
                      
                               <div class="flex  p-2 " v-for="val,val_index in getValue(issue.value)" :index="val_index">
                                  
                                {{val.name}}

                                <v-spacer></v-spacer> {{val.notting}} / {{val.low}} / {{val.many}} /{{val.very}}
                            </div>
                            <!-- <div class="  p-2 " v-for="val,val_index in issue.value" :index="val_index">
                                {{val.issueDetail.sub_name}}

                                <v-spacer></v-spacer> {{val.value}} / {{val.value_type}} / {{val.value_by}}
                            </div> -->
                        </v-card-text>
                    </v-card>
                </div>
                <v-card v-else class="m-2">
                    <v-card-title primary-title>
                        <h2 class="text-sm font-bold ">ข้อเสนอแนะ</h2>
                    </v-card-title>
                    <v-card-text>
                        <div v-for="sug,sug_index in suggestion" :key="sug_index" class="flex p-2 ">
                            {{sug.suggestion}}
                        </div>
                    </v-card-text>
                </v-card>

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
import CardStats from "@/components/Cards/CardStatWithBtn.vue";

import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
import _ from "lodash"

@Component({
    components: {
        CardStats
    },
})
export default class Home extends Vue {
    private assessment: any = null
    private raw: any = null
    private suggestion: any = null
    private data: any = null
    private user: any = {}
    private years: any = null
    private response: boolean = false

    public getValue(arr: any) {
        let ans: any = _(arr)
            .groupBy('issueDetail_pk')
            .map((platform, id) => ({
                type: id,
                val: platform,
            }))
            .value()
        let answer: any = []
        for (let index = 0; index < ans.length; index++) { 

            answer.push({
                "name": ans[index].val[0].issueDetail.sub_name,
                "notting":this.sumChoice(ans[index].val,'notting'),
                "low":this.sumChoice(ans[index].val,'low'),
                "very":this.sumChoice(ans[index].val,'very'),
                "many":this.sumChoice(ans[index].val,'many'),
                "have":this.sumChoice(ans[index].val,'have'),
                "nohave":this.sumChoice(ans[index].val,'nohave'),
                
            })
        }
        console.log(answer)
        return answer
    }

    public sumChoice(arr: any,group_by:any){
        let result:any = _.filter(arr, {value_by: group_by});
        let sum:any = _.sumBy(['value'], _.partial(_.sumBy, result));
        return sum/100
    }

    public async created() {
        this.user = await User.getUser();
        this.years = await Core.getHttp(`/api/eit/v2/year/${this.$route.query.year}/`)
        this.assessment = await Core.getHttp(`/api/eit/v2/assessmentissues/?&year=${this.years.id}`)
        await this.getDataIssue(this.assessment[0].id)
        // this.raw = await Core.getHttp(`/api/iit/v2/answerissue/?agency=${this.user.ext_link.agency}&year=${this.years.id}`)
        // if(this.raw){
        //     await this.convertData()
        //   //  await this.convertDataAssign()
        // }

        this.response = true
    }

    private async getDataIssue(assignId: number) {
        this.raw = await Core.getHttp(`/api/eit/v2/answerissueeit-report/?agency=${this.user.ext_link.agency}&assessmentIssues=${assignId}`)
        if (this.raw.length > 0) {
            await this.convertData()
            this.suggestion = null
        } else {
            this.suggestion = await Core.getHttp(`/api/eit/v2/answersuggestioneit/?agency=${this.user.ext_link.agency}&year=${this.years.id}`)
        }

    }

    private async convertData() {
        let xx: any = this.raw
        xx = await _.chain(xx)
            .groupBy('issue_pk')
            .map((value: any, key: any) => ({
                group: key,
                value: value
            }))
            .value();
        this.data = xx
    }
    private async convertDataAssign() {
        let xx: any = this.raw
        xx = await _.chain(xx)
            .groupBy('issue_pk')
            .map((value: any, key: any) => ({ group: key, value: value }))
            .value();
        this.data = xx
    }

}
</script>

<style>
table {

    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;

}

tr:nth-child(even) {}
</style>
