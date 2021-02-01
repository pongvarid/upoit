<template>
<div>
    <!-- <navbar /> -->
    <main>
        <section class="">
                    <router-view   />
            <!-- <footer-small absolute  /> -->
        </section>
    </main>
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
@Component({
    components: {
  
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
