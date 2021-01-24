<template>
<div class="relative md:pt-32  pt-12 ">
<br><br>
   <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe9hPWSbUuM_qIgcbTH5RseieGp8meLzQ_1CsXUJRBIaxa69w/viewform?embedded=true" width="100%"  height="900" frameborder="0" marginheight="0" marginwidth="0">กำลังโหลด…</iframe>
     

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import CardStats from "@/components/Cards/CardStatWithBtn.vue";

import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'

@Component({
    components: {
        CardStats
    },
})
export default class Home extends Vue {
    private dashboard: any = null
    private user: any = {}
    private response: boolean = false
    $vs: any

    public async created() {
        this.user = await User.getUser();
        this.response = true
    }

}
</script>
