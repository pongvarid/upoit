<template>
<div class="relative md:pt-32 pb-32 pt-12  "  style="z-index:1;" >
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 " v-if="response">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800">
                    <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> รายงาน IIT
                </h3>
                <!--            <hr class="border-gray-600 border-1 mt-2">-->
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
import {
    Iit
} from '@/store/iit'
import _ from "lodash"

@Component({
    components: {
         
    }, 
})
export default class Home extends Vue {

    private user!: any;
    private yearData!: any;
    private agency: any = null
    private response: any = false;

    public async created() {
        await this.run();

        this.response = true
    }

    private async run() {
        this.user = await User.getUser();
        this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
      //  await this.generateReport()
        // this.yearData = await Core.getHttp(`/api/iit/v2/year/${this.$route.query.year}/`) 
    }

    private async generateReport() {
        for (let i = 0; i < this.agency.length; i++) {
            let score = await this.IITGenerate(this.agency[i])
            console.log(score);
        }
    }

    /**************IIT ZONE ************/

    private async IITGenerate(agency: any) {
        let assessmentData = await Core.getHttp(`/api/iit/v2/assessmentissues/?&year=1`)
        for (let i = 0; i < assessmentData.length; i++) {
            let raw = await Core.getHttp(`/api/iit/v2/answerissue-report/?agency=${agency.id}&assessmentIssues=${assessmentData[i].id}`)
            let user = await Core.groupBy(raw, 'user')
            let userDone = user.length
            let issueGroup = await Iit.groupIssueRaw(raw, userDone, agency.count);
            let count = 0;
            let sumOutAvg = 0;
            let choice = 0;
            for (let j = 0; j < issueGroup.length; j++) {
                let sumAvg = this.sumScore(issueGroup[j].value)
                sumOutAvg += Number(sumAvg)
                choice++;
            }
            let score30 = Number(((sumOutAvg / choice) * 0.3).toFixed(2))
            if (isNaN(score30)) {
                score30 = 0.00
            }
            return score30 
        }

        //   let count = 0;
        // let sumOutAvg = 0;
        // let choice = 0;
        // for (let i=0; i < assessmentData.length ; i++){
        //     let raw = await Core.getHttp(`/api/iit/v2/answerissue-report/?agency=${this.$route.query.agency}&assessmentIssues=${this.assessmentData[i].id}`)
        //     let issueGroup = await Iit.groupIssueRaw(raw, this.userDone, this.agency.count);
        //     for(let j=0; j < issueGroup.length; j++){
        //        let sumAvg =  this.sumScore(issueGroup[j].value)  
        //        sumOutAvg += Number(sumAvg)
        //        choice++;

        //     }

        // }
        // this.score100 = Number((sumOutAvg/choice).toFixed(2))
        // this.score30 =  Number(((sumOutAvg/choice)*0.3).toFixed(2))
        // if(isNaN(this.score30)  ){
        //     this.score30 = 0.00
        // }

    }
    toFixed2(num: number) {
        return num.toFixed(2);
    }
    sumScore(arr: any) {
        //console.log(arr);
        let numberArr = arr.length;
        let sumAvg = _.sumBy(arr, 'avg');
        let score = (sumAvg / arr.length);
        return score.toFixed(2);
    }

}
</script>
