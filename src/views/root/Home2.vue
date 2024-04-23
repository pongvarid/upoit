<template>
<div class="relative w-full   hero-image  min-h-screen">
    <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full md:w-74 px-4">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0 mt-8">

                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0 mt-6">
                        <div class="text-gray-500   mb-3 font-bold">
                            <div class="flex flex-row">
                                <div class="w-1/2">
                                    <div class="bg-white shadow-xl rounded-full w-32 h-32 p-2 border-8 border-yellow-600 flex justify-center items-center">
                                        <img class="w-auto  h-24" src="https://upload.wikimedia.org/wikipedia/th/thumb/0/00/University_of_Phayao_Logo.svg/1200px-University_of_Phayao_Logo.svg.png" alt="">
                                    </div>
                                </div>
                                <div class="w-1/2 h-full flex flex-col justify-center ">
                                    <h2 class="text-3xl  cv-font mt-3">UP-ITA</h2>
                                    <hr>
                                    <h2 class="text-purple-600">เปิดประตูสู่ความโปร่งใส</h2>
                                </div>

                            </div>
                        </div>
                        <hr class=" border-b-1 border-gray-400" /><br>
                        <form @submit.prevent="getLogin">
                            <div class="relative w-full mb-3">
                                <v-text-field required v-model="form.username" label="ชื่อผู้ใช้" solo required></v-text-field>
                            </div>

                            <div class="relative w-full mb-3">
                                <v-text-field required v-model="form.password" type="password" label="รหัสผ่าน" solo required></v-text-field>
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
                            <button @click="microsoft" :class="`bg-orange-700 f-white ${$btn} `" type="button">
                                <span class="mdi mdi-microsoft text-xl mr-2"></span>
                                Microsoft 365
                            </button>
                            <button @click="facebook" :class="`bg-blue-700 f-white ${$btn} mt-2`" type="button">
                                <span class="mdi mdi-facebook text-xl mr-2"></span>
                                Facebook
                            </button>
                            <button @click="google" :class="`bg-white  ${$btn} mt-2`" type="button">
                                <span class="mdi mdi-google text-xl mr-2"></span>
                                Google
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap mt-6 relative items-center w-full">

                    <v-btn @click="$router.push('/report')" dark text style="width:100%; font-size:20px;">
                        <v-icon>mdi-scoreboard</v-icon><span class="pl-2">ผลการประเมิน</span>
                    </v-btn>

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
    private form: any = {}

    async created() {
        let loader = await this.$loading.show()
        try {
            await Auth.run(); 
          await this.callback()
        } catch (Error) {
            await loader.hide()
        }

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

    async callback() {
        let logined: any = await Auth.callback();
        let form: any | null = null
        if (logined.type) {
            console.log(logined.user)
            await Auth.reToken();
            form = await Auth.genForm(logined.type, logined.user)
            if ((await Auth.checkUser(form.username)).user) {
                let key = await Core.postHttp(`/rest-auth/login/`, form)
                await this.keyCall(key.key)
            } else {
                let user = await Core.postHttp(`/api/ita/v1/register/`, form)
                if (user.id) {
                    let key = await Core.postHttp(`/rest-auth/login/`, form)
                    await this.keyCall(key.key)
                }
            }
        }
    }

    async getLogin() {
        await Auth.reToken();
        let key = await Core.postHttp(`/rest-auth/login/`, this.form)
        if (key.key) {
            await this.keyCall(key.key)
        }
    }

    async keyCall(Key: string) {
        await Auth.storeToken(Key)
        await Auth.storeTokenToStorage(Key)
        await User.loadUser()
        await this.$router.replace(User.routeUser)
    }

}
</script>

<style>
.md\:w-74 {
    width: 26rem;
}

.f-white {
    color: white;
}
</style>
