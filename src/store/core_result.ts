import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "@/store/core";
import _ from "lodash"
import {Result} from '@/store/result'
@Module({ generateMutationSetters: true })
class CoreResultClass extends VuexModule {
    issues:any = []
    agency:number = 0
    urlResult:string = ''
    score:number = 0;
    public async getIssueIIT(year:number,agency:number){
        this.agency = agency;
        this.urlResult =  `/api/iit/v2/answerissue/?agency=${this.agency}&issueDetail=`
        this.issues = await Core.getHttp(`/api/iit/v2/issue-all/?assessment__year=${year}`)
        await this.generateCount()
        return this.issues
    }

    public async getIssueEIT(year:number,agency:number){
        this.agency = agency;
        this.urlResult =  `/api/eit/v2/answerissueeit/?agency=${this.agency}&issueDetail=`
        this.issues = await Core.getHttp(`/api/eit/v2/issue-all/?assessment__year=${year}`)
        await this.generateCount()
        return this.issues
    }


    private async generateCount(){
        for (let i =0; i < this.issues.length ; i++){

            for (let j=0; j < this.issues[i].choice_type.length ; j++){
                //console.log(this.issues[i].choice_type[j].choice.type);
                let choice = this.issues[i].choice_type[j].choice.name;
                console.log(choice);
                let rawData = await this.getDataAnswer(this.issues[i].choice_type[j].id,this.issues[i].choice_type[j].choice.type,choice);
                let raw_score = await Result.getData(this.issues[i].choice_type[j].choice,rawData)
                let raw_score_all = await _.sumBy(raw_score,function(data:any) { return data.score_all; })
                let users = await _.sumBy(rawData,function(data:any) { return data.users; })
                this.issues[i].choice_type[j].data = raw_score
                this.issues[i].choice_type[j].score_raw  = raw_score_all
                this.issues[i].choice_type[j].score_result = Number((((raw_score_all/users)*100)/4).toFixed(2))
            }
            let all_choice  = (this.issues[i].choice_type).length *100
            let sum_score = await _.sumBy(this.issues[i].choice_type,function(data:any) { return data.score_result; })
            let score = (sum_score/all_choice)*100
            this.issues[i].score = Number(score.toFixed(2))

        }
    }

    private async getDataAnswer(id:number,type:number,choice:string){
        let data =  await Core.getHttp(`${this.urlResult}${id}`)

        let scores:any =  await Result.generateScoreGroup(data,type,choice);
        let all_user = await _.sumBy(scores,function(data:any) { return data.users; })

        for(let i=0; i < scores.length; i++){
            let users = scores[i].users
            let user_percent = (users/all_user)*100
            let score = await  Result.generateCurrentScore(scores[i].value,type);
            scores[i].score = score
            scores[i].score_all = score*users
            scores[i].user_percent = Number(user_percent.toFixed(2))
        }



        return scores
    }

    public async getScrollAll(){
        let data = await _.filter(this.issues,function(data:any) { return data.name != "ข้อเสนอแนะ"; })
        let all = await _.sumBy(data,function(data:any) { return data.score; })
        let score = (all/(data).length).toFixed(2)
        this.score = Number(score);
        return Number(score)
    }

    public async getScoreIIT(){
        let result = (this.score*0.3).toFixed(2)
        return Number(result)
    }
    public async getScoreEIT(){
        let result = (this.score*0.3).toFixed(2)
        return Number(result)
    }
}

import store from "@/store"

export const CoreResult = new CoreResultClass({ store, name: "CoreResult" })
