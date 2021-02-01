import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "@/store/core";
import _ from "lodash"
@Module({ generateMutationSetters: true })
class ReportClass extends VuexModule {
    async getYearIIT(yeartxt:any){
        let year = await Core.getHttp(`/api/iit/v2/year/?year=${yeartxt}`)
        if(year.length > 0){
            return year[0]
        }else{
            return null
        }
    }
    async getYearEIT(yeartxt:any){
        let year = await Core.getHttp(`/api/eit/v2/year/?year=${yeartxt}`)
        if(year.length > 0){
            return year[0]
        }else{
            return null
        }
    }
    async getYearOIT(yeartxt:any){
        let year = await Core.getHttp(`/api/ita/v1/year/?year=${yeartxt}`)
        if(year.length > 0){
            return year[0]
        }else{
            return null
        }
    }

    public async getIIT(){
        
    }
 
}

import store from "@/store"

export const Report = new ReportClass({ store, name: "Report" })
