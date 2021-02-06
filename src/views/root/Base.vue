<template>
<div>
   
     <v-app  >
    <main>
        <section class="">
                    <router-view   />
    
        </section>
    </main>

 <Loading />
    </v-app>
</div>
</template>

<script lang="ts">
 
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import {
    User
} from "@/store/user";
import {
    Auth
} from "@/store/auth";
import Loading from "@/components/Web/Loading.vue";
@Component({
    components: {
  Loading
    },
    computed: {}
}) export default class Test extends Vue {
    page: any = ''
    response: boolean = false
    
    async created() {
       
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
