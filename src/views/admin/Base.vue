<template>
  <div>
    <sidebar/>
  <svg style="z-index:1;" class="absolute top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#96e0ce" fill-opacity="1" d="M0,160L15,138.7C30,117,60,75,90,53.3C120,32,150,32,180,64C210,96,240,160,270,197.3C300,235,330,245,360,218.7C390,192,420,128,450,106.7C480,85,510,107,540,149.3C570,192,600,256,630,245.3C660,235,690,149,720,144C750,139,780,213,810,224C840,235,870,181,900,181.3C930,181,960,235,990,218.7C1020,203,1050,117,1080,96C1110,75,1140,117,1170,133.3C1200,149,1230,139,1260,133.3C1290,128,1320,128,1350,122.7C1380,117,1410,107,1425,101.3L1440,96L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"></path>
</svg>
    <div class="relative md:ml-64 bg-gray-200"  >
      <admin-navbar/>
      <!--  <header-stats />-->
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <router-view/>
        <footer-admin/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import {User} from "@/store/user";
import {Auth} from "@/store/auth";
import {Core} from "@/store/core";

import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
 
    AdminNavbar,
    Sidebar,
    HeaderStats,
    FooterAdmin,
  },
  computed: {}
})

export default class Admin extends Vue {
  async created() {
    await Auth.checkToken();
    await User.loadUser();

    if(User.routeUser == '/' || User.routeUser == '/admin/'){
      await this.$router.replace(User.routeUser )
    } 
  }
 
}
</script>
