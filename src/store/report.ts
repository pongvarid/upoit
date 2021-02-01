import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "@/store/core";
import _ from "lodash"
@Module({ generateMutationSetters: true })
class ReportClass extends VuexModule {


    public async getIIT(){
        
    }
 
}

import store from "@/store"

export const Report = new ReportClass({ store, name: "Report" })
