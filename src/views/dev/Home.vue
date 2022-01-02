<template>
  <div  class="pt-16" >
   <div class="container mx-auto" v-if="response">

  <h2 class="text-2xl">   <v-btn x-large @click="$router.push('/')" text><v-icon>mdi-arrow-left</v-icon></v-btn>โหมดผู้พัฒนา</h2>
     <v-alert type="error">การเปลี่ยนแปลงแก้แก้ไขในโหมดนี้จะมีผลกระทบต่อระบบโดยตรง หากเกิดข้อผิดพลาดจะมีผลกระทบต่อระบบอย่างร้ายแรง ดังนั้นห่อนแก้ไขทุกครั้งควรตรวจสอบข้อมูลให้ถูกต้อง</v-alert>
     <v-tabs v-model="tabs">
        <v-tab>คัดลอกหัวข้อการประเมิน IIT</v-tab>
       <v-tab-item>
         <CloneIIT v-if="tabs == 0" />
       </v-tab-item>



       <v-tab>สร้างรายงาน IIT</v-tab>
       <v-tab-item>
         <GenIIT v-if="tabs == 1" />
       </v-tab-item>
       <v-tab>สร้างรายงาน EIT</v-tab>
       <v-tab-item>
         <GenEIT v-if="tabs == 2" />
       </v-tab-item>
       <v-tab>โอนข้อมูลการประเมิน EIT</v-tab>
       <v-tab-item>
          <ChangeEIT v-if="tabs == 3" />
       </v-tab-item>

     </v-tabs>

   </div>

    <div v-else>
      <v-alert type="error">
        คุณไม่มีสิทธิ์ใช้งานโหมดนี้
      </v-alert>

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
import _ from 'lodash'
import {
  Web
} from '@/store/web'
import
  ChangeEIT
 from '@/components/Dev/ChangeAgencyEIT.vue'
import
  GenIIT
  from '@/components/Dev/GenIIT.vue'
import
  GenEIT
  from '@/components/Dev/GenEIT.vue'
import
  CloneIIT
  from '@/components/Dev/CloneIIT.vue'
@Component({
  components: {
    ChangeEIT,GenIIT,GenEIT,CloneIIT
  },
})
export default class HomeDev extends Vue {
  tabs:number = 0
  response:boolean = false
  async created() {
    let user = await User.getProfile();
    this.response = user.is_superuser
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
