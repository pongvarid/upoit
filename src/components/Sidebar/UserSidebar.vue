<template>
<nav class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-nav bgh flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
    <div class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <!-- Toggler -->
        <button class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button" v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')">
            <i class="fas fa-bars"></i>
        </button>
        <!-- Brand -->
        <router-link class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase   p-4 px-0" to="/">
           
        </router-link>
        
         <center> <div class="bg-white shadow-xl rounded-full w-32 h-32 p-2 border-8 border-yellow-600 flex justify-center items-center">
            <img class="w-auto h-24" src="https://sv1.picz.in.th/images/2020/12/07/jg1o6u.png" alt="">
          </div>
          <h2 class="text-2xl text-white cv-font">UP-ITA</h2></center>
        <!-- Collapse -->
        <div class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded" v-bind:class="collapseShow">
            <!-- Collapse header -->
            <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
                <div class="flex flex-wrap">
                    <div class="w-6/12">
                        <router-link class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase   p-4 px-0" to="/">
                            UP-ITA
                        </router-link>
                    </div>
                    <div class="w-6/12 flex justify-end">
                        <button type="button" class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" v-on:click="toggleCollapseShow('hidden')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>

                  <!-- Divider -->
            <hr class="my-4 md:min-w-full" v-if="!user.ext_link.oit"  />
            <!-- Heading -->
          
            <h6 class="md:min-w-full text-gray-600 md:text-white text-xs uppercase   block pt-1 pb-4 no-underline"   v-if="!user.ext_link.oit"  >
                ทั่วไป
            </h6>
            <!-- Navigation -->

            <ul class="md:flex-col md:min-w-full flex flex-col list-none" v-if="!user.ext_link.oit"  >
                <li class="items-center">
                    <router-link to="/user/home" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3   block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 md:text-white hover:text-gray-600',
                ]">
                            <i class="mdi mdi-bag-checked mr-2 text-base" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            หน้าแรก
                        </a>
                    </router-link>
                </li>
  
            </ul>
            


            <!-- Divider -->
            <hr class="my-4 md:min-w-full" v-if="user.ext_link.oit"   />
            <!-- Heading -->
            <h6 class="md:min-w-full text-gray-600 md:text-white text-xs uppercase   block pt-1 pb-4 no-underline" v-if="user.ext_link.oit"  >
                ระบบ OIT 
            </h6>
            
            <!-- Navigation -->

            <ul class="md:flex-col md:min-w-full flex flex-col list-none" v-if="user.ext_link.oit" >
                <li class="items-center">
                    <router-link to="/user/home" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3   block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 md:text-white hover:text-gray-600',
                ]">
                            <i class="mdi mdi-bag-checked mr-2 text-base" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            ข้อมูลของหน่วยงาน
                        </a>
                    </router-link>
                </li>

                  <li class="items-center" v-if="user.ext_link.oit"   >
                    <router-link to="/user/all" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3   block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 md:text-white hover:text-gray-600',
                ]">
                            <i class="mdi mdi-notebook mr-2 text-base" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            ข้อมูลของหน่วยงานอื่นๆ
                        </a>
                    </router-link>
                </li>
            </ul>

            <!-- Divider -->
            <hr class="my-4 md:min-w-full" v-if="type == 'microsoft.com'" />
            <!-- Heading -->
            <h6 class="md:min-w-full text-gray-600 md:text-white text-xs uppercase   block pt-1 pb-4 no-underline" v-if="type == 'microsoft.com'" >
                ระบบ IIT
            </h6>
            <!-- Navigation -->

            <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4" v-if="type == 'microsoft.com'" >
                <li class="items-center">
                    <router-link class="text-gray-800 md:text-white hover:text-gray-600 text-xs uppercase py-3   block" to="/user/iit/year">
                        <i class="fas fa-fingerprint text-gray-400 mr-2 text-base"></i>
                      แบบประเมิน
                    </router-link>
                </li>

                <li class="items-center">
                    <router-link class="text-gray-800 md:text-white hover:text-gray-600 text-xs uppercase py-3   block" to="/user/iit/all">
                        <i class="fas fa-clipboard-list text-gray-400 mr-2 text-base"></i>
                      ผลการประเมิน
                    </router-link>
                </li>
            </ul>
          <hr class="my-4 md:min-w-full" />

          <h6 class="md:min-w-full text-gray-600 md:text-white text-xs uppercase   block pt-1 pb-4 no-underline">
            ระบบ EIT
          </h6>
          <!-- Navigation -->

          <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li class="items-center">
              <router-link class="text-gray-800 md:text-white hover:text-gray-600 text-xs uppercase py-3   block"  to="/user/eit/year">
                <i class="fas fa-fingerprint text-gray-400 mr-2 text-base"></i>
                แบบประเมิน
              </router-link>
            </li>

            <!-- <li class="items-center">
              <router-link class="text-gray-800 md:text-white hover:text-gray-600 text-xs uppercase py-3   block" to="/user/eit/report">
                <i class="fas fa-clipboard-list text-gray-400 mr-2 text-base"></i>
                ผลการประเมิน
              </router-link>
            </li> --> 
            <li class="items-center">
              <router-link class="text-gray-800 md:text-white hover:text-gray-600 text-xs uppercase py-3   block" to="/user/eit/all">
                <i class="fas fa-clipboard-list text-gray-400 mr-2 text-base"></i>
                ผลการประเมิน
              </router-link>
            </li>
          </ul>

            <!-- Divider -->
            <hr class="my-4 md:min-w-full" />
            <!-- Heading -->
            <h6 class="md:min-w-full text-gray-600 md:text-white text-xs uppercase   block pt-1 pb-4 no-underline">
                ผู้ใช้
            </h6>
            <!-- Navigation -->
            <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li class="inline-flex">
                <button @click="changePassword()" href="#" class="text-gray-800 md:text-white hover:text-gray-600 text-sm block mb-4 no-underline  ">
                  <i class="mdi mdi-form-textbox-password mr-2 text-gray-400 text-base"></i>
                  เปลี่ยนรหัสผ่าน
                </button>
              </li>
                <li class="inline-flex">
                    <a @click="logout" href="#" class="text-gray-800 md:text-white hover:text-gray-600 text-sm block mb-4 no-underline  ">
                        <i class="mdi mdi-login mr-2 text-gray-400 text-base"></i>
                      ออกจากระบบ
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
  import {Auth} from "@/store/auth";
  import {User} from "@/store/user";

export default {
    data() {
        return {
            collapseShow: "hidden",
            user:{},
            type:'',
        };
    },
    watch: {
        path: function (val) {
            this.collapseShow = "hidden"
        }
    },
    computed: {
        path() {
            return this.$route.path
        }
    },
    async mounted(){
      this.user =  await User.getUser();
      this.type = this.user.register_type
    },
    methods: {

        change() {

        },

      async changePassword(){
          alert("โปรดติดต่อผู้ดูแลระบบ")
      },

        toggleCollapseShow: function (classes) {
            this.collapseShow = classes;
        },
        async logout(){
          let user = await User.getUser();
          console.log(user)
          await Auth.logout();
          if(user.register_type == 'microsoft.com'){
            window.open('https://login.microsoftonline.com/logout.srf', '_blank');

          }
           await location.reload() 
        }
    },
    components: {
        NotificationDropdown,
        UserDropdown,
    },
};
</script>
<style>
.bgx{
  background-color: #9c9c9c;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%239c9c9c' width='11' height='11'/%3E%3Crect fill='%239d9d9d' x='10' width='11' height='11'/%3E%3Crect fill='%239e9e9e' y='10' width='11' height='11'/%3E%3Crect fill='%239f9f9f' x='20' width='11' height='11'/%3E%3Crect fill='%23a0a0a0' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23a1a1a1' y='20' width='11' height='11'/%3E%3Crect fill='%23a3a3a3' x='30' width='11' height='11'/%3E%3Crect fill='%23a4a4a4' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23a5a5a5' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23a6a6a6' y='30' width='11' height='11'/%3E%3Crect fill='%23a7a7a7' x='40' width='11' height='11'/%3E%3Crect fill='%23a8a8a8' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23a9a9a9' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23aaaaaa' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23ababab' y='40' width='11' height='11'/%3E%3Crect fill='%23acacac' x='50' width='11' height='11'/%3E%3Crect fill='%23adadad' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23afafaf' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23b0b0b0' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23b1b1b1' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23b2b2b2' y='50' width='11' height='11'/%3E%3Crect fill='%23b3b3b3' x='60' width='11' height='11'/%3E%3Crect fill='%23b4b4b4' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23b5b5b5' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23b6b6b6' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23b7b7b7' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23b9b9b9' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23bababa' x='70' width='11' height='11'/%3E%3Crect fill='%23bbbbbb' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23bcbcbc' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23bdbdbd' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23bebebe' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23bfbfbf' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23c0c0c0' x='80' width='11' height='11'/%3E%3Crect fill='%23c2c2c2' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23c3c3c3' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23c4c4c4' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23c5c5c5' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23c6c6c6' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23c7c7c7' x='90' width='11' height='11'/%3E%3Crect fill='%23c8c8c8' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23c9c9c9' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23cbcbcb' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23cccccc' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23cdcdcd' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23cecece' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23cfcfcf' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%23d0d0d0' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23d1d1d1' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%23d3d3d3' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23d4d4d4' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%23d5d5d5' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%23d6d6d6' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%23d7d7d7' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%23d8d8d8' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%23d9d9d9' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%23dbdbdb' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%23dcdcdc' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%23dddddd' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23dedede' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
.bgh{
background-color: #33fcff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%2333fcff' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%2316f0fb' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%2300e5f6' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%2300d9f0' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2300cdea' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2300c1e3' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%2300b6dc' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%2300aad4' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23009fcc' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%230093c3' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%230088ba' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23007db0' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%230072a6' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%2303679b' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23115d90' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23185285' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%231d487a' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%231f3e6e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}

.shadow-nav{
  -webkit-box-shadow: 10px 0px 24px -6px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 0px 24px -6px rgba(0,0,0,0.75);
box-shadow: 10px 0px 24px -6px rgba(0,0,0,0.75);
}
</style>