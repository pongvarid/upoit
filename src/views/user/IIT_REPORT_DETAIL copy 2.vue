<template>
<div class="relative md:pt-32 pb-32 pt-12  ">
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 " v-if="response">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800">
                    <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> ผลการประเมิน IIT
                </h3>
                <!--            <hr class="border-gray-600 border-1 mt-2">-->
            </div>
            <div>
                {{assessmentTab}}
                <v-tabs v-model="assessmentTab" color="#C594C5" slider-color="#C594C5">
                    <v-tab v-for="assessment,index in assessmentData" :key="index">
                        {{assessment.name}}
                    </v-tab>
                    <v-tab-item v-for="assessment,index in assessmentData" :key="index">
                        <div v-if="assessment.name != 'ข้อเสนอเเนะ'">

                            <!-- <pre v-if="issueData">{{issueData}}</pre> -->

                            <div v-for="issue,i_index in issueData" :key="i_index" class="p-2">

                                <v-card >
                                    <v-card-title    class="bg-purple-x text-white shadow-xl" >
                                        <h2 class="text-sm">{{issue.group}} {{issue.name}}</h2>
                                    </v-card-title>
                                    <v-card-text>
                                         
                                    </v-card-text>
                                    <v-card-actions> 
                                    </v-card-actions>
                                </v-card>
                                <pre>{{issue}}</pre>
                                <h2>-------------------------------------------------------------------------------------------------------</h2>
                            </div>

                        </div>
                        <div v-else>

                        </div>
                    </v-tab-item>

                </v-tabs>
            </div>

        </div>

    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch
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
import _ from "lodash"

@Component({
    components: {
     
    },
})
export default class Home extends Vue {

    private user!: any;
    private yearData!: any;

    private assessmentTab: number = 0
    private assessmentData!: any;

    private issueRaw: any = [];
    private issueData: any = null;
    private response: boolean = false;

    public async created() {
        await this.run();
        await this.getAssessment();
        this.response = true
    }

    private async run() {
        this.user = await User.getUser();
        this.yearData = await Core.getHttp(`/api/iit/v2/year/${this.$route.query.year}/`)
    }

    private async getAssessment() {
        this.assessmentData = await Core.getHttp(`/api/iit/v2/assessmentissues/?&year=${this.yearData.id}`)
        this.assessmentTab = 0 
        await this.getRawIssue(this.assessmentData[0].id)
    }

    @Watch('assessmentTab')
    private async switchTab(newIndex: number,oldIndex: number) {
        let assessmentData = this.assessmentData[newIndex]
        console.log(newIndex,assessmentData.id)
        await this.getRawIssue(assessmentData.id)
    }

    private async getRawIssue(assignId: number) {
        this.issueRaw = await Core.getHttp(`/api/iit/v2/answerissue-report/?agency=${this.user.ext_link.agency}&assessmentIssues=${assignId}`)
        let issueGroup = await this.groupIssueRaw();
        this.issueData = issueGroup
     
    }

    private async groupIssueRaw() {
        let issueGroup: any = this.issueRaw
        issueGroup = await _.chain(issueGroup)
            .groupBy('issue')
            .map( (value: any, key: any) => ({
                name:value[0].issue_name,
                group: key,
                value: this.getDataIssue(value) 
            }))
            .value();  
            return issueGroup 
    }
  

    

    private    getDataIssue(arr: []) {
        let ans: any = _(arr)
            .groupBy('issueDetail')
            .map((platform, id) => ({
                id: id,
                val: platform
            }))
            .value()
        let answer: any = []
        console.log('[DATA]',ans)
        for (let index = 0; index < ans.length; index++) {
             let data = {
                 "name": ans[index].val[0].issueDetail_name,
                'issue_type': ans[index].val[0].issue_type,
                'choiceTypeData':ans[index].val[0].choiceTypeData,
                'length':ans[index].val.length,
                'default_val': ans[index].val[0].value,
                "notting": this.sumChoice(ans[index].val, 'น้อยที่สุดหรือไม่มีเลย',ans[index].val.length) ,
                "low": this.sumChoice(ans[index].val, 'น้อย',ans[index].val.length),
                "very": this.sumChoice(ans[index].val, 'มาก',ans[index].val.length),
                "many": this.sumChoice(ans[index].val, 'มากที่สุด',ans[index].val.length),
                "have": this.sumChoice(ans[index].val, 'มี',ans[index].val.length),
                "nohave": this.sumChoice(ans[index].val, 'ไม่มี',ans[index].val.length),
                'avg':0.00
             }
             if(ans[index].val[0].issue_type == 'ระดับ'){
                if(data.choiceTypeData == 'เชิงบวก'){
                    data.avg = (((data.notting * 1)+(data.low * 2)+(data.very * 3)+(data.many * 4) / 3)/4)*100
                }else{
                    data.avg = (((data.notting * 4)+(data.low * 3)+(data.very * 2)+(data.many * 1) / 3)/4)*100
                }
                 data.avg = (data.low * 1)
             }else{
               if(data.choiceTypeData == 'เชิงบวก'){

                }else{
                    
                }
             }
            answer.push(data)
        } 
        return answer
    }

    public sumChoice(arr: any, group_by: any,lengthNumber:number) {
        let result: any = _.filter(arr, { value_by: group_by }); 
        return (result.length / lengthNumber)*100
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
