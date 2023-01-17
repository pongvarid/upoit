<template>
<div v-if="response">
    <div class="p-2">
        <h2>จำนวนผู้ทำแบบประเมินในหน่วยงาน</h2>
        <v-select class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="chooseYear" :items="years" item-text="year" item-value="year"></v-select>

    </div>
    <div class="p-2" v-if="iitResponse">
        <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" style="border-color:#ff8040;">
            <v-btn style="margin-right: 10px" color="#ff8040" large fab dark>
                <v-icon>IIT </v-icon>
            </v-btn>
            <div>
                <h2 class="text-xl">ประเมินแล้ว {{countIIT}} คน</h2>
                <h2 class="text-sm text-gray-700 ">จำนวนที่กำหนด {{myAgencyData.iit}} คน</h2>
                <v-chip v-if="countIIT >= myAgencyData.iit" small color="green" dark>
                    <v-icon left>mdi-check</v-icon>ครบตามจำนวนที่กำหนดแล้ว
                </v-chip>
                <v-chip v-else small color="red" dark>
                    <v-icon left>mdi-close</v-icon>ยังไม่ครบตามจำนวนที่กำหนด
                </v-chip>
            </div>
        </div>
    </div>

    <div class="p-2" v-if="eitResponse">
        <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" style="border-color:#8000ff;">
            <v-btn style="margin-right: 10px" color="#8000ff" large fab dark>
                <v-icon>EIT </v-icon>
            </v-btn>
            <div>
                <h2 class="text-xl">ประเมินแล้ว {{countEIT}} คน</h2>
                <h2 class="text-sm text-gray-700 ">จำนวนที่กำหนด {{myAgencyData.eit}} คน</h2>
                <v-chip v-if="countEIT >= myAgencyData.eit" small color="green" dark>
                    <v-icon left>mdi-check</v-icon>ครบตามจำนวนที่กำหนดแล้ว
                </v-chip>
                <v-chip v-else small color="red" dark>
                    <v-icon left>mdi-close</v-icon>ยังไม่ครบตามจำนวนที่กำหนด
                </v-chip>
            </div>
        </div>
    </div>

    <div class="p-2" v-if="OITYEAR">
        <div class="flex items-center p-4  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" style="border-color:#FFC300;">
            <v-btn style="margin-right: 10px" color="#FFC300" large fab dark>
                <v-icon>OIT</v-icon>
            </v-btn>
            <div>
                <h2 class="text-xl">บันทึกข้อมูลแล้ว {{countOIT}} ประเด็น</h2>
                <h2 class="text-sm text-gray-700 ">ประเด็นทั้งหมด {{countAllOIT}} ประเด็น</h2>
                <v-chip v-if="countOIT >= countAllOIT" small color="green" dark>
                    <v-icon left>mdi-check</v-icon>บันทึกข้อมูลครบแล้ว
                </v-chip>
                <v-chip v-else small color="red" dark>
                    <v-icon left>mdi-close</v-icon>ยังบันทึกข้อมูลไม่ครบ
                </v-chip>
            </div>
        </div>

    </div>
    <br>
    <v-tabs color="primary" slider-color="primary">
        <v-tab>
            รายชื่อผู้ประเมิน IIT แล้ว
        </v-tab>
        <v-tab-item class="p-2">
            <h2 class="text-xl font-semibold">รายชื่อผู้ประเมิน IIT แล้ว</h2>
            <!-- <div v-for="list,index in listIIT" :key="index">
                <h2 class="m-2"> {{index+1}}. {{list.fullname}}</h2>
            </div> -->
            <v-card outlined class="mt-4">
                            <v-card-text>
                                <v-text-field filled dense v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                                <v-data-table class="mt-4" :headers="headers" :items="listIIT" :search="search"> 
                                </v-data-table>
                            </v-card-text>
            </v-card>
        </v-tab-item> 
    </v-tabs>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import {
    Core
} from '@/store/core'
import {
    Auth
} from '@/store/auth'
import {
    User
} from '@/store/user'
import _ from 'lodash'
import {
    Web
} from '@/store/web'
import moment from 'moment'
@Component({
    components: {

    },
})

export default class Result extends Vue {
    user: any = null;
    response: boolean = false
    myAgency: any = 0
    myAgencyData: any = null
    years: any = []
    chooseYear: any = '2565'
    IITYEAR: any = null;
    EITYEAR: any = null;
    OITYEAR: any = null;
    countAllOIT: any = 0;
    countOIT: any = 0;
    countIIT: any = 0;
    countEIT: any = 0;
    listIIT: any = [];
    listEIT: any = [];
    search: any = ''
    headers: any = [{
            text: 'ที่',
            value: 'index'
        },
        {
            text: 'บัญชีผู้ใช้งาน',
            value: 'fullname'
        }, 
    ] 
    async getCurrentYear(){
        try {
            this.chooseYear = (Number(moment().format('YYYY')) + 543).toString() 
        } catch (error) {
            this.chooseYear = '2566'
        }
    }
    async created() {
      try {
          await Web.switchLoad(true)
        await this.getCurrentYear();
        this.user = await User.getUser();
        console.log('panel agen number : ',this.user.ext_link.agency);
        this.myAgency = this.user.ext_link.agency
        this.years = await Core.getHttp(`/api/ita/v1/year/`)
        this.myAgencyData = await Core.getHttp(`/api/ita/v1/agency/${this.myAgency}/`)
        await this.getIITYear()
        await this.getEITYear()
        await this.getOITYear()
        await this.getOIT();
        await this.getOITResult()
        await this.getIITRes();
        await this.getEITRes();
        await Web.switchLoad(false)
       this.response = true;
      } catch (error) {
           await Web.switchLoad(false)
           alert('ระบบยังไม่เปิดให้บริการ กรุณาติดต่อผู้ดูแลระบบ')
      }
    }

    iitResponse: boolean = false;
    async getIITYear() {
        try {
            let yearIIT = await Core.getHttp(`/api/iit/v2/year/?year=${this.chooseYear}`)
        if (yearIIT.length > 0) {
            this.IITYEAR = yearIIT[0]
            this.iitResponse = true
        } else {
            this.IITYEAR = null
            this.iitResponse = false
        }
        } catch (error) {
            
        }
    }

    eitResponse: boolean = false;
    async getEITYear() {
        try {
            let yearEIT = await Core.getHttp(`/api/eit/v2/year/?year=${this.chooseYear}`)

        if (yearEIT.length > 0) {
            this.EITYEAR = yearEIT[0]
            this.eitResponse = true;
        } else {
            this.EITYEAR = null
            this.eitResponse = false
        }
        } catch (error) {
            
        }
    }

    async getIITRes() {
        try {
            let data = await Core.getHttp(`/api/iit/v2/ansewer/user/?agency=${this.myAgency}&year=${this.IITYEAR.id}`)
        //console.log(data);
        this.listIIT = data;
        this.listIIT = _.map(this.listIIT, (item, index) => {
            item.index = index + 1
            return item
        })
        this.countIIT = data.length
        } catch (error) {
            
        }
    }

    async getEITRes() {
        try {
            let data = await Core.getHttp(`/api/eit/v2/answersuggestioneit/?agency=${this.myAgency}&year=${this.EITYEAR.id}`)
        this.listEIT = data;
        //console.log(data);
        this.countEIT = data.length 
        } catch (error) {
            
        }
    }

    async loadData() {
        await this.getIITYear();
        await this.getEITYear();
        await this.getIITRes();
        await this.getEITRes();
    }

    private async getOITYear() {
       try {
        let years = await Core.getHttp(`/api/ita/v2/year/`)
        let year: any = await _.filter(years, {
            "year": this.chooseYear
        })
        if (year.length > 0) {
            this.OITYEAR = year[0]
        }
       } catch (error) {
        
       }
    }

    private async getOIT() {
       try {
        //console.log('getOIT', this.OITYEAR)
        let oit = await Core.getHttp(`/api/ita/v2/rate/${this.OITYEAR.id}/`)
        //console.log(oit.length);
        this.countAllOIT = oit.length;
       } catch (error) {
        
       }
    }
    private async getOITResult() {
        try {
            let raw = await Core.getHttp(`/api/ita/v1/rateresult/?agency=${this.myAgency}&rate__year=${this.OITYEAR.id}`);
          
        let result = await _(raw)
            .groupBy('rate')
            .map(function (items, data) {
                return {
                    data: data,
                };
            }).value();
         
        this.countOIT = result.length;
        } catch (error) {
            
        }

    }
}
</script>
