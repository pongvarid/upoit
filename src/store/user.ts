import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import {Core} from "@/store/core";

@Module({generateMutationSetters: true})
class UserClass extends VuexModule {
    public user:object | null = null
    public permission :object|null = null
    public routeUser : string = '/'
    public async autoCreateProfile(from:any): Promise<any>{
        return Core.postHttp('/api/profile/create/',from)
    }

    public async loadUser(){
            let user = await Core.getHttp(`/api/ita/v2/user/`)
            if(!user.pk){
                await alert('เซสชั่นหมดอายุ กรุณา เข้าสู่ระบบอีกครั้ง')
                await window.location.replace("/"); 
            }
            this.user = user;
            this.permission = user.is_staff
        if(user.is_staff == true || user.is_staff == false){
            this.routeUser = (user.is_staff)?'/admin/':'/user/'
        }else{
            this.routeUser = '/'
        }
 
    }

    public async getUser(){
        return await Core.getHttp(`/api/ita/v2/user/`)
    }

    public async getProfile(){
        let user = await Core.getHttp(`/api/ita/v2/user/`)
        return user;
    }



}

import store from "@/store"

export const User = new UserClass({store, name: "User"})
