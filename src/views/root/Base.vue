<template>
  <div>
    <!-- <navbar /> -->
    <main>
      <section class="">
  
        <router-view />
        <!-- <footer-small absolute  /> -->
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";


import {
  Component,
  Vue,
} from 'vue-property-decorator';
import {User} from "@/store/user";
import {Auth} from "@/store/auth";

@Component({
  components: {  Navbar,
    FooterSmall,},
    computed: {}
})

export default class Test extends Vue {


  async created(){
    await  Auth.checkToken();
    await User.loadUser();
    console.log('')
   await this.$router.replace(User.routeUser)
    console.log(User.routeUser)
  }


}
</script>

<style scoped>
.hero-image {
  background-image: url("https://sv1.picz.in.th/images/2020/11/09/blnNqb.png");
  background-color: #cccccc;
 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>