<template>
<div class="home">
    <button @click="login">DDD</button>
    <button @click="facebook">facebook</button>
    <button @click="google">google</button>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';

import {
    Auth
} from '@/store/auth'
import firebase from 'firebase'
@Component({
    components: {

    },
})
export default class Home extends Vue {

    async created() {
        await Auth.run();
        await this.callback()
        
    }

    async login() {
        await Auth.loginMicrosoft365();
    }

    async facebook() {
        await Auth.loginFacebook();
    }

    async google() {
        await Auth.loginGoogle();
    }

    async callback(){
      let logined:any = await Auth.callback();
      alert(logined.type)
    }

}
</script>
