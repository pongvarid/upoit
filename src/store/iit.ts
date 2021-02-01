import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "@/store/core";
import _ from "lodash"
@Module({ generateMutationSetters: true })
class IitClass extends VuexModule {

    private doingUser: number = 0
    private asignUser: number = 0
    public async groupIssueRaw(raw: any, doingUser: number, asignUser: number) {
        this.doingUser = doingUser
        this.asignUser = asignUser
        let issueGroup: any = raw
        issueGroup = await _.chain(issueGroup)
            .groupBy('issue')
            .map((value: any, key: any) => ({
                name: value[0].issue_name,
                group: key,
                value: Iit.getDataIssue(value)
            }))
            .value();

        return issueGroup
    }

    public getDataIssue(arr: []) {
        let ans: any = _(arr)
            .groupBy('issueDetail')
            .map((platform, id) => ({
                id: id,
                val: platform
            }))
            .value()
        let answer: any = []
        //console.log('[DATA]', ans)
        for (let index = 0; index < ans.length; index++) {
            let data: any = {
                "name": ans[index].val[0].issueDetail_name,
                'issue_type': ans[index].val[0].issue_type,
                'choiceTypeData': ans[index].val[0].choiceTypeData,
                'length': ans[index].val.length,
                'default_val': ans[index].val[0].value,
                "notting": this.sumChoice(ans[index].val, 'น้อยที่สุดหรือไม่มีเลย', ans[index].val.length),
                "low": this.sumChoice(ans[index].val, 'น้อย', ans[index].val.length),
                "very": this.sumChoice(ans[index].val, 'มาก', ans[index].val.length),
                "many": this.sumChoice(ans[index].val, 'มากที่สุด', ans[index].val.length),
                "have": this.sumChoice(ans[index].val, 'มี', ans[index].val.length),
                "nohave": this.sumChoice(ans[index].val, 'ไม่มี', ans[index].val.length),
                'avg': 0.00
            }
            if (ans[index].val[0].issue_type == 'ระดับ') {
                let tmp = 0
                if (data.choiceTypeData == 'เชิงบวก') {
                    tmp = ((data.notting.raw * 1) + (data.low.raw * 2) + (data.very.raw * 3) + (data.many.raw * 4)) / this.doingUser
                } else {
                    tmp = ((data.notting.raw * 4) + (data.low.raw * 1) + (data.very.raw * 2) + (data.many.raw * 3)) / this.doingUser
                }
                let rawScore = (tmp / this.doingUser)
                data.avg = (rawScore > 1) ? (100 * rawScore) / 2 : (100 * rawScore)
            } else {
                if (data.choiceTypeData == 'เชิงบวก') {
                    let tmp = ((data.nohave.raw * 1) + (data.have.raw * 2))
                    let rawScore = (tmp / this.doingUser)
                    data.avg = (rawScore > 1) ? (100 * rawScore) / 2 : (100 * rawScore)
                } else {
                    let tmp = ((data.nohave.raw * 2) + (data.have.raw * 1))
                    let rawScore = (tmp / this.doingUser)
                    data.avg = (rawScore > 1) ? (100 * rawScore) / 2 : (100 * rawScore)


                }
            }
            // data.avg = data.avg.toFixed(2)
            answer.push(data)
        }
        return answer
    }

    public sumChoice(arr: any, group_by: any, lengthNumber: number) {
        let result: any = _.filter(arr, {
            value_by: group_by
        });
        ////console.log('[USERLENGTH]',this.doingUser);
        return {
            "percent": ((result.length / this.doingUser) * 100).toFixed(2),
            "raw": result.length
        }
    }

}

import store from "@/store"

export const Iit = new IitClass({ store, name: "Iit" })
