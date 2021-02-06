<template>
<div>
    <v-app id="inspire">
        <Loading />
        <Navbar />
        <v-main>
            <svg style="z-index:1;" class="absolute top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#96e0ce" fill-opacity="1" d="M0,160L15,138.7C30,117,60,75,90,53.3C120,32,150,32,180,64C210,96,240,160,270,197.3C300,235,330,245,360,218.7C390,192,420,128,450,106.7C480,85,510,107,540,149.3C570,192,600,256,630,245.3C660,235,690,149,720,144C750,139,780,213,810,224C840,235,870,181,900,181.3C930,181,960,235,990,218.7C1020,203,1050,117,1080,96C1110,75,1140,117,1170,133.3C1200,149,1230,139,1260,133.3C1290,128,1320,128,1350,122.7C1380,117,1410,107,1425,101.3L1440,96L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"></path>
            </svg>
            <div class="relative  mt-10 md:mt-2" style="z-index:1;">
                <div class="px-4 md:px-10 mx-auto w-full  -m-24">
                    <router-view v-if="!userDialog" />
                    <footer-admin />
                </div>
            </div>
        </v-main>
    </v-app>
</div>
</template>

<script lang="ts">
import Navbar from "@/components/Core/Navbar.vue";
import Loading from "@/components/Web/Loading.vue";
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        Navbar,
        Loading

    },
    computed: {}
})

export default class Admin extends Vue {
    async created() {
        await Auth.checkToken();
        await User.loadUser();

        // if (User.routeUser == '/' || User.routeUser == '/admin/') {
        //     await this.$router.replace(User.routeUser)
        // }
    }

}
</script>
<style>
.bgc{
  background-color: #e8e8e8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%23e8e8e8' width='11' height='11'/%3E%3Crect fill='%23e7e7e7' x='10' width='11' height='11'/%3E%3Crect fill='%23e6e6e6' y='10' width='11' height='11'/%3E%3Crect fill='%23e5e5e5' x='20' width='11' height='11'/%3E%3Crect fill='%23e4e4e4' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23e3e3e3' y='20' width='11' height='11'/%3E%3Crect fill='%23e2e2e2' x='30' width='11' height='11'/%3E%3Crect fill='%23e1e1e1' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23e0e0e0' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23dfdfdf' y='30' width='11' height='11'/%3E%3Crect fill='%23dedede' x='40' width='11' height='11'/%3E%3Crect fill='%23dddddd' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23dcdcdc' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23dbdbdb' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23dadada' y='40' width='11' height='11'/%3E%3Crect fill='%23d9d9d9' x='50' width='11' height='11'/%3E%3Crect fill='%23d8d8d8' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23d7d7d7' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23d6d6d6' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23d5d5d5' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23d4d4d4' y='50' width='11' height='11'/%3E%3Crect fill='%23d3d3d3' x='60' width='11' height='11'/%3E%3Crect fill='%23d2d2d2' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23d1d1d1' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23d0d0d0' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23cfcfcf' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23cecece' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23cdcdcd' x='70' width='11' height='11'/%3E%3Crect fill='%23cccccc' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23cbcbcb' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23cacaca' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23c9c9c9' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23c8c8c8' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23c7c7c7' x='80' width='11' height='11'/%3E%3Crect fill='%23c6c6c6' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23c5c5c5' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23c4c4c4' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23c3c3c3' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23c2c2c2' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23c1c1c1' x='90' width='11' height='11'/%3E%3Crect fill='%23c0c0c0' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23bfbfbf' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23bebebe' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23bdbdbd' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23bcbcbc' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23bbbbbb' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23bababa' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%23b9b9b9' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23b8b8b8' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%23b7b7b7' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23b6b6b6' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%23b5b5b5' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%23b4b4b4' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%23b3b3b3' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%23b2b2b2' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%23b1b1b1' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%23b0b0b0' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%23afafaf' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%23aeaeae' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23adadad' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

.bg-nav{
  background: rgb(107,9,121);
  background: linear-gradient(90deg, rgba(107,9,121,1) 21%, rgba(0,212,255,1) 100%);
}
 
</style>