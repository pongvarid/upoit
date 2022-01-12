<template>
<div>
    <div :class="`containerR ${switchc}`" ref="main">
        <div class="forms-containerR">
            <div class="signin-signup">
                <div class="sign-in-form forms" v-if="tab == 0">
                    <div class="flex justify-center  md:hidden">
                        <div class="w-1/5">
                            <img class="w-auto  h-auto" src="https://sv1.picz.in.th/images/2020/12/07/jg1o6u.png" alt="">
                        </div>
                        <div class="w-4/5 pl-3">
                            <h2 class="text- xl font-semibold"> ระบบประเมินการรับรู้ของผู้มีส่วนได้ส่วนเสีย มหาวิทยาลัยะเยา </h2>
                            <p>Integrity & Transparency Assessment: ITA University Of Phayao</p>
                            <br />
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <center>
                            <img class="w-auto  h-32" src="https://sv1.picz.in.th/images/2020/12/07/jg1o6u.png" alt="">
                           <h2 class="text- xl font-semibold"> ระบบประเมินการรับรู้ของผู้มีส่วนได้ส่วนเสีย มหาวิทยาลัยะเยา </h2>
                            <p>Integrity & Transparency Assessment: ITA University Of Phayao (UP-ITA)</p>
                            <br />
                        </center>
                    </div>
                     <bin-card3    c="rgb(77, 153, 0)" t="Open Data Integrity and Transparency Assessment  : OIT" h="การเปิดเผยข้อมูลสาธารณะ" i="OIT"></bin-card3>

                 

                    <hr class="border-gray-400 w-full"><br />
                    <button style="color:white;" @click="microsoft" :class="`bg-orange-700   f-white ${$btn} `" type="button">
                        <span class="mdi mdi-microsoft text-xl text-white mr-2"></span>
                        Microsotft 365 ของมหาวิทยาลัยพะเยา ในการเข้าใช้งานระบบ
                    </button>
                    <button style="color:white;" @click="facebook" :class="`bg-blue-700 f-white ${$btn} mt-2`" type="button">
                        <span class="mdi mdi-facebook text-xl text-white mr-2"></span>
                        Facebook
                    </button>
                    <button @click="google" style="background-color: #dd4b39!important; color: white!important; " :class="`   ${$btn} mt-2`" type="button">
                        <span class="mdi mdi-google-plus text-xl mr-2"></span>
                        Google
                    </button>
                    <br>
                    <hr><br>
                    <v-btn @click="$router.push('/report')" text style="width:100%; font-size:20px;">
                        <v-icon>mdi-scoreboard</v-icon><span class="pl-2">ผลการประเมิน</span>
                    </v-btn>
                    <br />

                </div>

                <div v-if="tab == 1">
                    <div class="md:p-12">

                        <form @submit.prevent="getLogin">
                            <h2 class="text-2xl">UP ITA เปิดประตูสู่ความโปร่งใส</h2>
                            <p>เข้าสู่ระบบโดยใช้ ชื่อผู้ใช้ และ รหัสผ่าน</p>
                            <v-alert type="error" v-if="errorLogin">
                                {{errorLogin}}
                            </v-alert>

                            <div class="relative w-full mb-3">
                                <v-text-field required v-model="form.username" label="ชื่อผู้ใช้" filled></v-text-field>
                            </div>

                            <div class="relative w-full mb-3">
                                <v-text-field required v-model="form.password" type="password" label="รหัสผ่าน" filled></v-text-field>
                            </div>
                            <div class="text-center mt-6">
                                <button style="color:white;" :class="`bg-green-600 f-white ${$btn}`" type="submit">
                                    เข้าสู่ระบบ
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        <div class="panels-containerR">
            <div class="panel left-panel">
                <div class="content">
                    <h3>คุณมีบัญชีผู้ใช้ ?</h3>
                    <p>
                        คุณสามารถเข้าสู่ระบบโดยใช้ ชื่อผู้ใช้ และ รหัสผ่าน ที่คุณสร้างขึ้น
                        ผ่านการสมัครสมาชิกได้
                    </p>

                    <div class="w-full flex items-center justify-center">
                        <v-btn class="m-1" small @click="ChangeTo('sign-up-mode')">เข้าสู่ระบบ</v-btn>
                        <v-btn @click="regitserDialog = true" class="m-1" small outlined dark> สมัครสมาชิก</v-btn>
                    </div>

                </div>
         
                <img src="@/assets/ss.png" class="image p-24" alt="" />
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>คุณมี Microsoft 365 ?</h3>
                    <p>
                        หากคุณมีบัญชี Microsoft 365 ของมหาวิทยาลัยพะเยาอยู่แล้ว
                        คุณสามารถเข้าสู่ระบบได้ในทันที !
                    </p>

                    <v-btn @click="ChangeTo('')" outlined dark>เข้าสู่ระบบด้วย Microsoft 365</v-btn>
                </div>
                <img src="@/assets/ss.png" class="image p-24" alt="" />
            </div>
        </div>
    </div>

    <v-dialog v-model="regitserDialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                สมัครสมาชิก <v-spacer></v-spacer>
                <v-btn @click="closeRegDialog()" text large>
                    <v-icon>mdi-close</v-icon>
                </v-btn>

            </v-card-title>
            <v-card-text>

                <form @submit.prevent="userRegister()" id="editForm">
                    <v-text-field dense required v-model="formReg.username" type="text" filled label="ชื่อผู้ใช้"></v-text-field>
                    <v-text-field dense required v-model="formReg.email" type="email" filled label="อีเมล์"></v-text-field>
                    <hr>
                    <v-text-field dense required v-model="formReg.first_name" type="text" filled label="ชื่อ"></v-text-field>
                    <v-text-field dense required v-model="formReg.last_name" type="text" filled label="นามสกุล"></v-text-field>
                    <hr><br>
                    <!--                    <ul>-->
                    <!--                        <li>รหัสผ่านต้องประกอบด้วย อักษร A-Z a-z 0-9</li>-->
                    <!--                        <li>รหัสผ่านต้องไม่ตรงกับ ชื่อผู้ใช้ หรือ ชื่อ-หรือชื่อนามสกุล</li>-->
                    <!--                    </ul><br>-->
                    <v-text-field dense required v-model="formReg.password" type="password" filled label="รหัสผ่าน"></v-text-field>
                    <v-text-field dense required v-model="formReg.password_confirm" :hint="(formReg.password != formReg.password_confirm)?'รหัสผ่านต้องตรงกัน':''" type="password" filled label="ยืนยันรหัสผ่าน"></v-text-field>

                    <hr><br>
                    <div v-if="errorReg">
                        <div v-if="errorReg.username">
                            <v-alert dense v-for="err,index in errorReg.username" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>
                        <div v-if="errorReg.email">
                            <v-alert dense v-for="err,index in errorReg.email" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>
                        <div v-if="errorReg.password">
                            <v-alert dense v-for="err,index in errorReg.password" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>
                        <div v-if="errorReg.password_confirm">
                            <v-alert dense v-for="err,index in errorReg.password_confirm" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>

                    </div>
                    <v-btn type="submit" class="w-full" large color="primary">สมัครสมาชิก</v-btn>
                    <br>
                    <hr><br>

                </form>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="">

                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
    Core
} from '@/store/core'
import {
    Auth
} from '@/store/auth'
import {
    User
} from '@/store/user'
import {
    Web
} from '@/store/web'
import firebase from 'firebase'
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const containerR = document.querySelector(".containerR");
@Component({
    components: {},
    computed: {},
})
export default class Test extends Vue {
    tab: number = 0;
    switchc: string = "";
    page: any = ''
    private form: any = {}
    regitserDialog: boolean = false;
    formReg: any = {}
    errorReg: any = null
    errorLogin: any = null

    async closeRegDialog() {
        this.formReg = {};
        this.errorReg = null
        this.regitserDialog = false

    }
    async userRegister() {
        this.regitserDialog = false;
        await Web.switchLoad(true)
        let reg = await Core.postHttp(`/accounts/register/`, this.formReg)
        if (reg.id) {
            this.regitserDialog = false
            this.form.username = this.formReg.username
            this.form.password = this.formReg.password
            await this.getLogin();
        } else {
            alert('ไม่สามารถสมัครสมาชิกได้ กรุณาตรวจสอบข้อมูลการสมัครให้ถูกต้อง')
            this.errorReg = reg
            this.regitserDialog = true;
        }
        await Web.switchLoad(false)

    }

    async created() {
        await Web.switchLoad(true)
        try {
            await Auth.run();
            await this.callback()
        } catch (Error) {
            //alert('error')
            await Web.offLoad()
        }

        await Web.offLoad()
    }
    async ChangeTo(val: string) {
        this.switchc = val;
        await this.sleep(1000);
        this.tab = val ? 1 : 0;
    }
    async sleep(ms: any) {
        return new Promise((resolve) => setTimeout(resolve, ms));
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
        this.page = this.$route.query.web

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
        await Web.switchLoad(true)
        await Auth.reToken();
        this.errorLogin = null
        let key = await Core.postHttp(`/rest-auth/login/`, this.form)
        if (key.key) {
            await this.keyCall(key.key)
        } else {
            await Web.switchLoad(false)
            this.errorLogin = "กรุณาตรวจสอบข้อมูล ชื่อผู้ใช้ หรือ รหัสผ่าน ให้ถูกต้อง"
            alert('ไม่สามารถเข้าสู่ระบบได้กรุณาตรวจสอบข้อมูลให้ถูกต้อง')
        }
    }

    async keyCall(Key: string) {
        await Auth.storeToken(Key)
        await Auth.storeTokenToStorage(Key)
        await User.loadUser()
        await window.location.replace("/user/oit-home?auto=1");

    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.containerR {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
}

.forms-containerR {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
}

.forms {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

div.sign-up-form {
    opacity: 1;
    z-index: 99;
}

form.sign-in-form {
    z-index: 2;
}

.title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
}

.input-field {
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
}

.input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    transition: 0.5s;
    font-size: 1.1rem;
}

.input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
}

.input-field input::placeholder {
    color: #aaa;
    font-weight: 500;
}

.social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
}

.social-media {
    display: flex;
    justify-content: center;
}

.social-icon {
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #333;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;
}

.social-icon:hover {
    color: #4481eb;
    border-color: #4481eb;
}

.btn {
    width: 150px;
    background-color: #5995fd;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
}

.btn:hover {
    background-color: #4d84e2;
}

.panels-containerR {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.containerR:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    background: rgb(84, 65, 172);
    background: linear-gradient(90deg,
            rgb(51, 63, 116) 0%,
            rgb(76, 85, 209) 100%);
    transform: translateY(-50%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
}

.image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
}

.left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
}

.right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
}

.panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
}

.panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
}

.panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
}

.btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
    transform: translateX(800px);
}

/* ANIMATION */
.containerR.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
}

.containerR.sign-up-mode .left-panel .image,
.containerR.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
}

.containerR.sign-up-mode .signin-signup {
    left: 25%;
}

.containerR.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
}

.containerR.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
}

.containerR.sign-up-mode .right-panel .image,
.containerR.sign-up-mode .right-panel .content {
    transform: translateX(0%);
}

.containerR.sign-up-mode .left-panel {
    pointer-events: none;
}

.containerR.sign-up-mode .right-panel {
    pointer-events: all;
}

@media (max-width: 870px) {
    .containerR {
        min-height: 800px;
        height: 100vh;
    }

    .signin-signup {
        width: 100%;
        top: 95%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
    }

    .signin-signup,
    .containerR.sign-up-mode .signin-signup {
        left: 50%;
    }

    .panels-containerR {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
        grid-column: 1 / 2;
    }

    .right-panel {
        grid-row: 3 / 4;
    }

    .left-panel {
        grid-row: 1 / 2;
    }

    .image {
        width: 400px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel .content {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
    }

    .panel h3 {
        font-size: 1.2rem;
    }

    .panel p {
        font-size: 0.7rem;
        padding: 0.5rem 0;
    }

    .btn.transparent {
        width: 110px;
        height: 35px;
        font-size: 0.7rem;
    }

    .containerR:before {
        width: 1500px;
        height: 1500px;
        transform: translateX(-50%);
        left: 30%;
        bottom: 68%;
        right: initial;
        top: initial;
        transition: 2s ease-in-out;
    }

    .containerR.sign-up-mode:before {
        transform: translate(-50%, 100%);
        bottom: 32%;
        right: initial;
    }

    .containerR.sign-up-mode .left-panel .image,
    .containerR.sign-up-mode .left-panel .content {
        transform: translateY(-300px);
    }

    .containerR.sign-up-mode .right-panel .image,
    .containerR.sign-up-mode .right-panel .content {
        transform: translateY(0px);
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateY(300px);
    }

    .containerR.sign-up-mode .signin-signup {
        top: 5%;
        transform: translate(-50%, 0);
    }
}

@media (max-width: 570px) {
    form {
        padding: 0 1.5rem;
    }

    .image {
        display: none;
    }

    .panel .content {
        padding: 0.5rem 1rem;
    }

    .containerR {
        padding: 1.5rem;
    }

    .containerR:before {
        bottom: 72%;
        left: 50%;
    }

    .containerR.sign-up-mode:before {
        bottom: 28%;
        left: 50%;
    }
}
</style>
