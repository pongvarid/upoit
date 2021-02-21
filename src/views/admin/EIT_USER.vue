<template>
<div class="pt-20">
    <h2 class="text-xl">จัดการข้อมูลหน่วยงาน</h2>
    <v-tabs   >
        <v-tab>
            EIT ข้อมูลผู้มีส่วนได้ส่วนเสียภายนอก
        </v-tab>
        <v-tab-item>
               <AgencyEitUser />
        </v-tab-item>
      <v-tab>
       จำนวนผู้ประเมิน
      </v-tab>
      <v-tab-item>
<Result />
      </v-tab-item>

    </v-tabs>
</div>
</template>

<script>
import {
    Component,
    Vue
} from 'vue-property-decorator';
import AgencyEitUser from "@/components/Core/AgencyEitUser.vue";
import Result from "@/components/Core/Result.vue";
@Component({
    components: {
        AgencyEitUser,Result
    },
})
export default class EitUser extends Vue {

}
</script>

<style>

</style>
