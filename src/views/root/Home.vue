<template>
<div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
        <div class="w-full md:w-74 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">

                <div class="flex-auto px-4 lg:px-10 py-10 pt-0 mt-6">
                    <div class="text-gray-500 text-center mb-3 font-bold">
                        <h2 class="text-xl">เข้าสู่ระบบ</h2>
                    </div>
                    <form @submit.prevent="getLogin" >
                        <div class="relative w-full mb-3">
                            <v-text-field required v-model="form.username" label="ชื่อผู้ใช้" solo  required></v-text-field>
                        </div>

                        <div class="relative w-full mb-3">
                            <v-text-field required v-model="form.password" type="password" label="รหัสผ่าน" solo   required></v-text-field>
                        </div>
                        <div class="text-center mt-6">
                            <button :class="`bg-green-600 f-white ${$btn}`" type="submit">
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </form>
                </div>
                                                            <hr class=" border-b-1 border-gray-400" />

                      <div class="rounded-t mb-0 px-6 py-6">

                    <div class="text-center mb-3">
                        <h6 class="text-gray-600 text-sm font-bold">
                            Sign in with
                        </h6>
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0 mt-6 text-center">
                        <button @click="microsoft"  :class="`bg-orange-700 f-white ${$btn} `" type="button">
                           <span class="mdi mdi-microsoft text-xl mr-2"></span>
                            Microsoft 365
                        </button>
                        <button @click="facebook" :class="`bg-blue-700 f-white ${$btn} mt-2`" type="button">
                          <span class="mdi mdi-facebook text-xl mr-2"></span>
                            Facebook
                        </button>
                         <button @click="google"  :class="`bg-white  ${$btn} mt-2`"  type="button">
                          <span class="mdi mdi-google text-xl mr-2"></span>
                            Google
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap mt-6 relative">
                <div class="w-1/2">
                    <a href="javascript:void(0)" class="text-gray-300">
                        <small>ลืมรหัสผ่าน</small>
                    </a>
                </div>
                <div class="w-1/2 text-right">
                    <router-link to="/register" class="text-gray-300">
                        <small>สมัครสมาชิก</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
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
import firebase from 'firebase'
@Component({
    components: {

    },
})
export default class Home extends Vue {
    private form :any = {}
    async created() {
        let loader = await this.$loading.show()
        await Auth.run();
        await this.callback()
      await loader.hide()

    }

    async microsoft() {
        await Auth.reToken();
        await Auth.loginMicrosoft365();
    }

    async facebook() {
        await Auth.reToken();
        await Auth.loginFacebook();
    }

    async google() {
        await Auth.reToken();
        await Auth.loginGoogle();
    }

    async callback(){
      let logined:any = await Auth.callback();
      let form :any|null =null
      if(logined.type){
        console.log(logined.user)
        await Auth.reToken();
        form = await Auth.genForm(logined.type,logined.user)
        if((await Auth.checkUser(form.username)).user){
          let key = await Core.postHttp(`/rest-auth/login/`,form)
          await this.keyCall(key.key)
        }else{
          let user = await Core.postHttp(`/api/ita/v1/register/`,form)
          if(user.id){
            let key = await Core.postHttp(`/rest-auth/login/`,form)
            await this.keyCall(key.key)
          }
        }
      }
    }

    async getLogin(){
      await Auth.reToken();
      let key = await Core.postHttp(`/rest-auth/login/`,this.form)
      if(key.key){
        await this.keyCall(key.key)
      }
    }

    async keyCall(Key:string){
      await Auth.storeToken(Key)
      await Auth.storeTokenToStorage(Key)
      await User.loadUser()
      await this.$router.replace(User.routeUser)
    }

}
</script>


<style >
.md\:w-74 {
    width: 26rem;
  }

  .f-white{
    color:white;
  }
</style>
