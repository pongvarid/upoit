<template>
<div class="pt-20">
    <h2 class="text-2xl">จำนวนผู้ตอบแบบประเมิน</h2><br>
  <Result />
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
