<template>
<div>
    <v-app-bar app class="bg-nav" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{user.first_name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="!drawer" class="hidden md:flex">
            <v-btn @click="$router.push('/')" text>
                HOME
            </v-btn>
            <v-btn @click="$router.push('/iit/year')" text>
                IIT
            </v-btn>
            <v-btn @click="$router.push('/eit/year')" text>
                EIT
            </v-btn>

        </div>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app fixed class="bg-list"> <br>
        <center>
            <div class="bg-white shadow-xl rounded-full w-4 h-4 md:w-32 md:h-32 p-2 border-8 border-yellow-600 flex justify-center items-center">
                <img class="w-auto  h-24 " src="https://sv1.picz.in.th/images/2020/12/07/jg1o6u.png" alt="">
            </div>
            <h2 class="text-sm md:text-2xl text-purple-800  cv-font">UP-ITA</h2>
            <p class="bg-yellow-700 ml-4 mr-4 p-1 text-white rounded-full">เปิดประตูสู่ความโปร่งใส</p>
        </center>
        <v-list nav dense>
            <h2 class="text-sm font-bold text-purple-800">ทั่วไป</h2>
            <hr>
            <v-list-item-group v-for="item,windex in homeList" :key="windex" class="mt-2">
                <v-list-item @click="$router.push(item.path)" :class="(item.name == $route.name)?'bg-purple-600 ':''">
                    <v-list-item-title>
                        <v-icon style="font-size:18px;">{{item.icon}}</v-icon> <span class="pl-4 text-base" :class="(item.name == $route.name)?'text-white':''">{{item.text}} </span>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
            <br>
            <v-list-item :class="($route.name=='profile')?'bg-purple-600 ':''" @click="$router.push('/profile')">
                <v-list-item-title>
                    <v-icon style="font-size:18px; color:#8080ff;">em em-female-teacher</v-icon>
                    <span :class="($route.name=='profile')?'text-white ':''" class="pl-4  text-base">ข้อมูลผู้ใช้</span>
                </v-list-item-title>
            </v-list-item>
            <br>

            <h2 v-if="user.is_superuser || user.is_staff  || user.is_staff  || user.passing || user.ext_link.oit  && myAgency != publicAgency" class="text-sm font-bold text-purple-800">ผู้ดูแลระบบ</h2>
            <hr v-if="user.is_superuser || user.is_staff  || user.passing || user.ext_link.oit && myAgency != publicAgency">
            <v-list-item-group class="mt-2" v-if="user.is_superuser || user.is_staff || user.passing || user.ext_link.oit && myAgency != publicAgency">
                <v-list-item v-if="user.is_staff" @click="$router.push('/oit/all')">
                    <v-list-item-title>
                        <v-icon style="font-size:28px; color:#8080ff;">mdi-book-edit</v-icon> <span class="pl-4  text-base">ตรวจ OIT </span>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="user.ext_link.oit" @click="$router.push('/eit/user')">
                    <v-list-item-title>
                        <v-icon style="font-size:28px; color:#ff8000;">mdi-account-tie </v-icon> <span class="pl-4  text-base">จัดการข้อมูล EIT </span>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="user.ext_link.oit" @click="$router.push('/agency/count')">
                    <v-list-item-title>
                        <v-icon style="font-size:28px; color:purple;">mdi-file-document-multiple</v-icon> <span class="pl-4  text-base">จำนวนผู้ประเมิน </span>
                    </v-list-item-title>
                </v-list-item>
                <!--                <v-list-item v-if="user.is_superuser" @click="$router.push('/report/home')">-->
                <!--                    <v-list-item-title>-->
                <!--                        <v-icon style="font-size:28px; color:green;">mdi-chart-areaspline </v-icon> <span class="pl-4  text-base">ข้อมูลผลการประเมิน </span>-->
                <!--                    </v-list-item-title>-->
                <!--                </v-list-item>-->
                <v-list-item v-if="user.is_superuser">
                    <v-list-item-title>
                        <v-icon style="font-size:18px; color:green;">em-building_construction </v-icon>
                        <a class="pl-4  text-base" href="https://ita.up.ac.th/super-up-plan-admin/login/?next=/admin/">Super Admin</a>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="user.is_superuser">
                    <v-list-item-title @click="$router.push('/list-user')">
                        <v-icon style="font-size:18px; color:green;">em-lower_left_fountain_pen </v-icon>
                        <span class="pl-4  text-base">ข้อมูลการประเมินแต่ล่ะหน่วยงาน</span>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="user.is_superuser">
                    <v-list-item-title @click="$router.push('/data-analysis-before-show-end-user')">
                        <v-icon style="font-size:18px; color:green;">em em-apple </v-icon>
                        <span class="pl-4  text-base">ผลประเมิน (Preview)</span>
                    </v-list-item-title>
                </v-list-item>

            </v-list-item-group>
            <br v-if="user.is_superuser || user.passing ">

            <h2 v-if="myAgency != publicAgency" class="text-sm font-bold text-purple-800">การประเมิน OIT</h2 v-if="myAgency != publicAgency">
            <hr v-if="myAgency != publicAgency">
            <v-list-item v-if="user.ext_link.oit && myAgency != publicAgency " @click="$router.push('/user/oit-home')" class="mt-2">
                <v-list-item-title>
                    <v-icon style="font-size:18px; color:#8080ff;">em em-clipboard</v-icon> <span class="pl-4  text-base">บันทึกข้อมูล OIT </span>
                </v-list-item-title>
            </v-list-item>
            <v-list-item-group v-for="item,uindex in oitList" :key="uindex" class="mt-2" v-if="myAgency != publicAgency">
                <v-list-item @click="$router.push(item.path)" :class="(item.name == $route.name)?'bg-purple-600':''">
                    <v-list-item-title>
                        <v-icon style="font-size:18px;">{{item.icon}}</v-icon> <span class="pl-4  text-base" :class="(item.name == $route.name)?'text-white':''">{{item.text}}</span>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group><br>

            <h2 v-if="myAgency != publicAgency" class="text-sm font-bold text-purple-800">การประเมิน IIT</h2>
            <hr v-if="myAgency != publicAgency">
            <v-list-item-group v-for="item,xindex in iitList" :key="xindex" class="mt-2" v-if="myAgency != publicAgency">
                <v-list-item @click="$router.push(item.path)" :class="(item.name == $route.name)?'bg-purple-600':''">
                    <v-list-item-title>
                        <v-icon style="font-size:18px;">{{item.icon}}</v-icon> <span class="text-base " :class="(item.name == $route.name)?'text-white':''">{{item.text}} </span>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group><br v-if="myAgency != publicAgency">

            <h2 class="text-sm font-bold text-purple-800">การประเมิน EIT</h2>
            <hr>
            <v-list-item-group v-for="item,iindex in eitList" :key="iindex" class="mt-2">
                <v-list-item @click="$router.push(item.path)" :class="(item.name == $route.name)?'bg-purple-600':''">
                    <v-list-item-title>
                        <v-icon style="font-size:18px;">{{item.icon}}</v-icon> <span class="text-base" :class="(item.name == $route.name)?'text-white':''">{{item.text}}</span>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
            <br>
            <h2 class="text-sm font-bold text-purple-800">การประเมิน คุณธรรม</h2>
            <hr>
            <v-list-item-group  class="mt-2">
                <v-list-item @click="$router.push('/user/mo-home/')"  >
                    <v-list-item-title>
                        <v-icon style="font-size:18px;">em em-writing_hand </v-icon> <span class="text-base"  > ทำแบบประเมิน</span>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
            <br>
            <hr>
            <v-list-item-group><br>
                <v-list-item @click="$router.push('/alert')" :class="($route.name == 'all-alert' )?'bg-purple-600':''">
                    <v-list-item-title>
                        <v-icon style="font-size:18px;">em em-zap</v-icon> <span class="text-base" :class="($route.name == 'all-alert' )?'text-white':''">แจ้งปัญหาการใช้งาน</span>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout()">
                    <v-list-item-title>
                        <v-icon style="font-size:18px;">em em-arrow_right_hook</v-icon> <span class="text-base">ออกจากระบบ</span>
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <br><br><br><br><br><br>
    </v-navigation-drawer>
</div>
</template>

<script lang="ts">
import {
    User
} from "@/store/user";
import {
    Auth
} from "@/store/auth";
import {
    Core
} from "@/store/core";
import {
    userRouter
} from '@/router/user'
import {
    Component,
    Vue,
    Watch
} from "vue-property-decorator";
import _ from 'lodash'
@Component({
    components: {

    },
    computed: {}
})

export default class UserClass extends Vue {
    publicAgency: any = 41
    drawer: any = true
    group: any = 5
    items: any = []
    user: any = null
    homeList: any = []
    oitList: any = []
    iitList: any = []
    eitList: any = []
    myAgency: any = 0

    async created() {

        await this.loadRouter();
        console.log(this.$route)
        this.drawer = !this.$vuetify.breakpoint.mobile
    }

    async loadRouter() {
        this.user = await User.getUser();
        this.myAgency = (this.user.ext_link) ? this.user.ext_link.agency : 0
        console.log(this.user)
        let routerAll: any = _.filter(userRouter, {
            enabled: true
        })
        this.homeList = _.filter(routerAll, {
            group: 'home'
        })
        this.oitList = _.filter(routerAll, {
            group: 'oit'
        })
        this.iitList = _.filter(routerAll, {
            group: 'iit'
        })
        this.eitList = _.filter(routerAll, {
            group: 'eit'
        })
        this.items = routerAll
        console.log(routerAll);
    }

    async logout() {
        let user = await User.getUser();
        console.log(user)
        await Auth.logout();
        if (user.register_type == 'microsoft.com') {
            window.open('https://login.microsoftonline.com/logout.srf', '_blank');
        }
        await this.$router.replace('/')
        await location.reload()
    }

}
</script>

<style>
.bg-list {
    background-color: #8180b2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill-opacity='0.49'%3E%3Cpath fill='%239a98c1' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23b3b1d1' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23cccae0' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23e5e4ef' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23ffffff' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23ffffff' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23ffffff' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23ffffff' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23ffffff' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23ffffff' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.text-white {
    color: white !important;
}
</style>
