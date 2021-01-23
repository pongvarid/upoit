import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"

@Module({generateMutationSetters: true})
class WebModule extends VuexModule {
    public loading: boolean =  false;
    public async switchLoad(load:boolean){
        this.loading = load
    }


}

import store from "@/store"
export const Web = new WebModule({store, name: "Web"})
