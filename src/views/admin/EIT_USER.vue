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
    </v-tabs>
</div>
</template>

<script>
import {
    Component,
    Vue
} from 'vue-property-decorator';
import AgencyEitUser from "@/components/Core/AgencyEitUser.vue";
@Component({
    components: {
        AgencyEitUser
    },
})
export default class EitUser extends Vue {

}
</script>

<style>

</style>
