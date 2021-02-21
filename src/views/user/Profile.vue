<template>
  <div  class="relative md:pt-32 pb-32 pt-12  " >
    <v-tabs class="mt-12">
      <v-tab>ข้อมูลส่วนตัว</v-tab>
      <v-tab-item>
        <div class="p-4">
<!--          <h2 class="p-2 text-xl"><b>ชื่อผู้ใช้</b> : {{ profile.username}}</h2>-->
          <h2 class="p-2 text-xl" ><b>ชื่อ</b> : {{ profile.first_name}}</h2>
          <h2 class="p-2 text-xl" ><b>สกุล</b> : {{ profile.last_name}}</h2>
          <hr>
          <h2 class="p-2 text-xl"><b>หน่วยงาน</b> : {{myagency.name}}</h2>
          <h2 class="p-2 text-xl"><b>การเข้าสู่ระบบ</b> : {{profile.register_type}}</h2>
          <hr>
          <v-checkbox disabled v-model="profile.ext_link.in_up" label="บุคลากรภายในมหาวิทยาลัยพะเยา"></v-checkbox>
          <v-checkbox disabled v-model="profile.ext_link.passing" label="เป็นหัวหน้าหน่วยงาน"></v-checkbox>
          <v-checkbox disabled v-model="profile.ext_link.oit" label="แอดมินหน่วยงาน"></v-checkbox>
          <v-checkbox disabled v-model="profile.ext_link.oit_up" label="สามารถให้ข้อมูล OIT ของมหาวิทยาลัยได้"></v-checkbox>
        </div>

      </v-tab-item>
      <v-tab v-if="profile.register_type == 'ปกติ'" >เปลี่ยนรหัสผ่าน</v-tab>
      <v-tab-item v-if="profile.register_type == 'ปกติ'" >
        <div class="p-4">
          <div v-if="err">
            <div v-if="err.password">
              <v-alert dense v-for="error,index in err.password" :key="index" type="error">
                {{error}}
              </v-alert>
            </div>
            <div v-if="err.password_confirm">
              <v-alert dense v-for="error,index in err.password_confirm" :key="index" type="error">
                {{error}}
              </v-alert>
            </div>
            <div v-if="err.old_password">
              <v-alert dense v-for="error,index in err.old_password" :key="index" type="error">
                {{error}}
              </v-alert>
            </div>
          </div>

          <form @submit.prevent="changePassword()">
            <v-text-field required v-model="formPassword.old_password" filled label="รหัสผ่านปัจจุบัน"></v-text-field>
            <hr>
            <v-text-field required v-model="formPassword.password" filled label="รหัสผ่านใหม่"></v-text-field>
            <v-text-field required v-model="formPassword.password_confirm" filled label="ยืนยันรหัสผ่านใหม่"></v-text-field>
            <v-btn x-large class="w-full" color="success" type="submit">แก้ไขรหัสผ่าน</v-btn>
          </form>
        </div>
      </v-tab-item>
      <v-tab v-if="profile.ext_link.in_up">เปลี่ยนหน่วยงาน / คณะ /กอง</v-tab>
      <v-tab-item v-if="profile.ext_link.in_up">
        <v-autocomplete  v-model="chooseAgencyType" :items="agencyType" item-text="name" item-value="id" filled label="ประเภทหน่วยงาน / บุคคล"></v-autocomplete>
        <v-autocomplete v-model="formAg" v-if="chooseAgencyType"  :items="agencies" item-text="name" item-value="id" filled label="หน่วยงาน"></v-autocomplete>
        <v-btn v-if="formAg"  x-large class="w-full" color="success" @click="changeAgency()">แก้ข้อมูลหน่วยงาน</v-btn>
      </v-tab-item>
    </v-tabs>



  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue, Watch
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
import {
  Web
} from '@/store/web'
import _ from 'lodash'
@Component({
  components: {

  },
})
export default class Profile extends Vue {

  profile:any = null
  myagency:any = null
  formPassword:any = {}
  agencies:any = null
  agencyType:any = null
  chooseAgencyType:any = null
  iProfile:any = {}
  formAg:any = null

  async created() {
    await Web.switchLoad(true)
    await this.loadEnv()
    await this.loadMyAgency()
    await this.loadAgencyType()
    await this.loadProfile()
    await Web.offLoad()
  }
  async loadAgencyType(){
    let typeAg = await Core.getHttp(`/api/ita/v1/agencytype/`)
    if(this.profile.ext_link.in_up ){
      typeAg.pop();
      this.agencyType = typeAg
    }else{
      this.agencyType = typeAg[2]
    }
  }
  async loadProfile(){
    let profile = await Core.getHttp(`/api/ita/v1/profile/?user=${this.profile.pk}`);
    if(profile.length > 0){
      this.iProfile = profile[0]
    }

  }
  @Watch('chooseAgencyType')
  private async chnageChooseAgencyType(val: number) {
    this.agencies = await Core.getHttp(`/api/ita/v2/agencys/?agency_type=${val}`)
  }
  async loadEnv(){
    this.profile = await User.getUser();
  }

  async loadMyAgency(){
    this.myagency = await Core.getHttp(`/api/ita/v1/agency/${this.profile.ext_link.agency}/`)
  }
  err:any = null
  async changePassword(){
    let check = confirm('คุณแน่ใจใช่ไหมที่จะเปลี่ยนรหัสผ่าน')
    if(check){
      let changePassword = await Core.postHttp(`/accounts/change-password/`,this.formPassword)
      if(changePassword.detail == 'Password changed successfully'){
        alert('แก้ไขรหัสผ่านสำเร็จแล้ว')
        location.reload()
      }else if(changePassword.old_password || changePassword.password || changePassword.password_confirm ){
        this.err = changePassword
      }else{
        alert('ไม่สามรถแก้ไขรหัสผ่านได้ กรุณาตรวสอบข้อมูลให้ถูกต้อง  ')
      }
    }
  }

  async changeAgency(){
    let data = this.iProfile;
    data.agency = this.formAg
    let check= confirm('คุณแน่ใจใช่ไหมที่จะแก้ไขข้อมูลหน่วยงาน')
    if(check){
      let formTmp = {
        "user": this.iProfile.user,
        "agency": this.profile.ext_link.agency,
        "agency_change": this.formAg
      }
      
      let profile = await Core.putHttp(`/api/ita/v1/profile/${data.id}/`,data)
      if(profile.id){
        let log = await Core.postHttp(`/api/ita/v1/agencychange/`,formTmp)
            alert('แก้ไขข้อมูลหน่วยงานของคุณสำเร็จแล้ว')
        location.reload()
      }else{
        alert('ไม่สามารถแก้ไขข้อมูลหน่วยงานได้กรุณา ติดต่อผู้ดูและระบบ')
      }
    }

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
