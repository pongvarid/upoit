import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Core } from "@/store/core";
import _ from "lodash"
@Module({ generateMutationSetters: true })
class ResultClass extends VuexModule {


    async getData(typeChoice:any,rawData:any){
        return rawData
    }


    async generateScoreGroup(data:any,type:number,choice:string){
        let type_val = this.checkType(type)
        let group:any =  await _.chain(data)
            // Group the elements of Array based on `color` property
            .groupBy("value_by")
            // `key` is group's name (color), `value` is the array of objects
            .map( (value, key) => ({ value: key,order:  this.getOrder(key), users: value.length ,type:type,choice:choice , type_val :type_val  }))
            .value()
        //console.log(_.find(group,{"value": "มากที่สุด"}))
        if(!_.find(group,{value:'มากที่สุด'})){
            group.push({
                order:  this.getOrder('มากที่สุด'),
                choice:'ระดับ',
                type_val :type_val,
                type:type,
                users:0,
                value:'มากที่สุด'
            })
        } if(!_.find(group,{value:'มาก'})){
            group.push({
                order: this.getOrder('มาก'),
                choice:'ระดับ',
                type_val :type_val,
                type:type,
                users:0,
                value:'มาก'
            })
        } if(!_.find(group,{value:'น้อย'})){
            group.push({
                order: this.getOrder('น้อย'),
                choice:'ระดับ',
                type_val :type_val,
                type:type,
                users:0,
                value:'น้อย'
            })
        } if(!_.find(group,{value:'น้อยที่สุดหรือไม่มีเลย'})){
            group.push({
                order: this.getOrder('น้อยที่สุดหรือไม่มีเลย'),
                choice:'ระดับ',
                type_val :type_val,
                type:type,
                users:0,
                value:'น้อยที่สุดหรือไม่มีเลย'
            })
        } if(!_.find(group,{value:'มี'})){
            group.push({
                order: this.getOrder('มี'),
                choice:'มี/ไม่มี',
                type_val :type_val,
                type:type,
                users:0,
                value:'มี'
            })
        } if(!_.find(group,{value:'ไม่มี'})){
            group.push({
                order: this.getOrder('ไม่มี'),
                choice:'มี/ไม่มี',
                type_val :type_val,
                type:type,
                users:0,
                value:'ไม่มี'
            })
        }




        return _.sortBy(group,'order').reverse()
    }


      getOrder(key:string){
        if(key== 'มากที่สุด'){
            return 1
        }else if(key == 'มาก'){
            return 2
        }else if(key == 'น้อย'){
            return 3
        }else if(key == 'น้อยที่สุดหรือไม่มีเลย'){
            return 4
        }else if(key == 'มี'){
            return 1
        }else if(key == 'ไม่มี'){
            return 2
        }
    }

    async generateCurrentScore(value:string ,type:any){
        if(value == 'มากที่สุด' ){
            return ((type == 1) && (type != 3))?4:1;
        }else if(value == 'มาก' ){
            return ((type == 1) && (type != 3))?3:2;
        }else if(value == 'น้อย' ){
            return ((type == 1) && (type != 3))?2:3;
        }else if(value == 'น้อยที่สุดหรือไม่มีเลย' ){
            return ((type == 1) && (type != 3))?1:4;
        }else if(value == 'มี' ){
            return ((type == 1) && (type != 3))?4:1;
        }else if(value == 'ไม่มี' ) {
            return ((type == 1) && (type != 3)) ? 1 : 4;
        }else{
            return 1;
        }
    }

    checkType(type:number){
        if(type == 1){
            return 'เชิงบวก'
        }else if(type == 0){
            return 'เชิงลบ'
        }else {
            return 'ทั่วไป'
        }
    }


}

import store from "@/store"

export const Result = new ResultClass({ store, name: "Result" })
