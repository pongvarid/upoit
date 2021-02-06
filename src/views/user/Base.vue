<template>
<div>

    <!--    <UserSidebar/>-->
    <v-app id="inspire">

        <Loading />
        <Navbar />

        <v-main>

            <svg style="z-index:1;" class="absolute top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#a2d9ff" fill-opacity="1" d="M0,64L13.3,58.7C26.7,53,53,43,80,74.7C106.7,107,133,181,160,197.3C186.7,213,213,171,240,176C266.7,181,293,235,320,256C346.7,277,373,267,400,245.3C426.7,224,453,192,480,192C506.7,192,533,224,560,208C586.7,192,613,128,640,122.7C666.7,117,693,171,720,176C746.7,181,773,139,800,128C826.7,117,853,139,880,122.7C906.7,107,933,53,960,26.7C986.7,0,1013,0,1040,42.7C1066.7,85,1093,171,1120,218.7C1146.7,267,1173,277,1200,266.7C1226.7,256,1253,224,1280,192C1306.7,160,1333,128,1360,128C1386.7,128,1413,160,1427,176L1440,192L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"></path>
            </svg>

            <div class="relative  mt-10 md:mt-2" style="z-index:1;">
                <div class="px-4 md:px-10 mx-auto w-full  -m-24">
                    <router-view v-if="!userDialog" />
                    <footer-admin />
                </div>
            </div>
        </v-main>

        <v-dialog v-if="userDialog" max-width="500px" v-model="userDialog" persistent>
            <v-card>
                <v-card-title>ยินดีต้อนรับผู้ใช้ใหม่</v-card-title>
                <v-card-text>
                    <form @submit.prevent="saveProfile()">
                        <v-alert v-if="form.in_up" color="#7e4d9e" border="left" dense elevation="2" colored-border>
                            <div class="flex"><img class="h-8 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/e/e6/UPLogo.png" alt="">
                                <h2 style="color:#7e4d9e;" class="p-1 pl-2 font-bold">เป็นรายละเอียดากรของมหาวิทยาลัยพะเยา</h2>
                            </div>

                        </v-alert>
                        <v-text-field disabled v-model="form.register_type" filled label="เข้าสู่ระบบโดย"></v-text-field>
                        <v-autocomplete v-model="chooseAgencyType" :items="agencyType" item-text="name" item-value="id" filled label="ประเภทหน่วยงาน / บุคคล"></v-autocomplete>
                        <v-autocomplete v-model="form.agency" :items="agencies" item-text="name" item-value="id" filled label="หน่วยงาน"></v-autocomplete>
                        <v-checkbox    v-model="form.in_up"></v-checkbox>
                        <center>
                            <v-btn type="submit" large dark color="#298aff">
                                <v-icon>mdi-account-child-circle</v-icon>ยืนยันตัวตน
                            </v-btn>
                        </center>
                    </form>
                </v-card-text>
                <v-card-actions>
                    <div class="w-full">
                        <v-divider></v-divider>
                        <center>
                            <v-btn @click="logout()" class="w-full" small text>ออกจากระบบ</v-btn>
                        </center>
                    </div>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</div>
</template>

<script lang="ts">
import Navbar from "@/components/Core/Navbar.vue";
import Loading from "@/components/Web/Loading.vue";
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Web } from "@/store/web";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
    components: {
        Navbar,
        Loading,
    },
    computed: {}
})

export default class UserClass extends Vue {

    drawer: any = true
    group: any = null

    private userDialog: boolean = false

    private form: any = {}
    private agencyType: any = []
    private chooseAgencyType: number | null = null
    private agencies: any = []

    async created() {

        await Auth.checkToken();
        await User.loadUser();

        // if(User.routeUser == '/' || User.routeUser == '/admin/'){
        //   await this.$router.replace('/user' )
        // }
        let user = await User.getUser();

        if (!user.register_type) {
            await Web.switchLoad(false);
            this.form.user = user.pk
            this.agencyType = await Core.getHttp(`/api/ita/v1/agencytype/`)
            this.form.register_type = ((user.username).split("@__@"))[1]
            console.log(((user.email).split("@"))[1])
            let in_up = ((user.email).split("@"))[1]
            if (in_up === "up.ac.th") {
                this.form.in_up = true
            }
            if (!this.form.register_type) {
                this.form.register_type = "ปกติ"
                 
                 
            }
            this.userDialog = true
        }

    }
    async saveProfile() { 
         this.form.passing = true;
         this.form.oit = true;
        let profile = await Core.postHttp(`/api/ita/v1/profile/`, this.form)
        if (profile.id) {
            await location.reload()
        }

    }
    @Watch('chooseAgencyType')
    private async chnageChooseAgencyType(val: number) {
        this.agencies = await Core.getHttp(`/api/ita/v2/agencys/?agency_type=${val}`)
    }

     async logout(){
    let user = await User.getUser();
    console.log(user)
    await Auth.logout();
     window.open('https://login.microsoftonline.com/logout.srf', '_blank');
    await this.$router.replace('/')
    await location.reload()
  }

}
</script>

<style>
.bgc {
    background-color: #e8e8e8;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%23e8e8e8' width='11' height='11'/%3E%3Crect fill='%23e7e7e7' x='10' width='11' height='11'/%3E%3Crect fill='%23e6e6e6' y='10' width='11' height='11'/%3E%3Crect fill='%23e5e5e5' x='20' width='11' height='11'/%3E%3Crect fill='%23e4e4e4' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23e3e3e3' y='20' width='11' height='11'/%3E%3Crect fill='%23e2e2e2' x='30' width='11' height='11'/%3E%3Crect fill='%23e1e1e1' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23e0e0e0' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23dfdfdf' y='30' width='11' height='11'/%3E%3Crect fill='%23dedede' x='40' width='11' height='11'/%3E%3Crect fill='%23dddddd' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23dcdcdc' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23dbdbdb' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23dadada' y='40' width='11' height='11'/%3E%3Crect fill='%23d9d9d9' x='50' width='11' height='11'/%3E%3Crect fill='%23d8d8d8' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23d7d7d7' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23d6d6d6' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23d5d5d5' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23d4d4d4' y='50' width='11' height='11'/%3E%3Crect fill='%23d3d3d3' x='60' width='11' height='11'/%3E%3Crect fill='%23d2d2d2' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23d1d1d1' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23d0d0d0' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23cfcfcf' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23cecece' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23cdcdcd' x='70' width='11' height='11'/%3E%3Crect fill='%23cccccc' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23cbcbcb' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23cacaca' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23c9c9c9' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23c8c8c8' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23c7c7c7' x='80' width='11' height='11'/%3E%3Crect fill='%23c6c6c6' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23c5c5c5' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23c4c4c4' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23c3c3c3' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23c2c2c2' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23c1c1c1' x='90' width='11' height='11'/%3E%3Crect fill='%23c0c0c0' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23bfbfbf' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23bebebe' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23bdbdbd' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23bcbcbc' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23bbbbbb' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23bababa' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%23b9b9b9' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23b8b8b8' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%23b7b7b7' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23b6b6b6' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%23b5b5b5' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%23b4b4b4' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%23b3b3b3' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%23b2b2b2' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%23b1b1b1' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%23b0b0b0' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%23afafaf' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%23aeaeae' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23adadad' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bg-nav {
    background: rgb(107, 9, 121);
    background: linear-gradient(90deg, rgba(107, 9, 121, 1) 21%, rgba(0, 212, 255, 1) 100%);
}
</style>
