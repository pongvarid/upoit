import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"

@Module({generateMutationSetters: true})
class CoreModule extends VuexModule {
    //state
    private token: string | null = null;
    public Hi:String | null = null;


    async getHttp(url:string):Promise<any>{
        return  await axios.get(url).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

    async postHttp(url:string,form:object):Promise<any>{
        return  await axios.post(url,form).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

    async putHttp(url:string,form:object):Promise<any>{
        return  await axios.put(url,form).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

    async deleteHttp(url:string):Promise<any>{
        return  await axios.delete(url).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

    async getChoice(name:string):Promise<any>{
        return await this.getHttp(`/api/choice/?name=${name}`)
    }

    async getGeo():Promise<any>{
        return await this.getHttp('/api/geo/')
    }

    async getBase64(file:any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    public async groupBy(raw:any,by:string){
        let group: any = raw
        group =  await _.chain(group)
            .groupBy(by)
            .map((value: any, key: any) => ({ 
                key: key,
                value: value
            }))
            .value();
        return group
    }

    public async sumBy(raw:any,by:string){
       return await  _.sumBy(raw, 'n');  
    }

}

import store from "@/store"
export const Core = new CoreModule({store, name: "Core"})
