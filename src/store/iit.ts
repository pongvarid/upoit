import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import {Core} from "@/store/core";

@Module({generateMutationSetters: true})
class IitClass extends VuexModule {


  

public async getIssueRaw(){

}


}

import store from "@/store"

export const Iit = new IitClass({store, name: "Iit"})
