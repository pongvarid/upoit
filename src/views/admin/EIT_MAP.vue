<template>
<div class="relative md:pt-32 pb-32 pt-12  "  style="z-index:1;" >
    <div class="relative  flex flex-col min-w-0 break-words w-full mb-6  ">
        <div class="rounded-t mb-0 px-4 py-3 border-0 " v-if="response">
            <div class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2">
                <h3 class="  text-2xl text-gray-800">
                    <span class="em em-briefcase text-2xl" aria-role="presentation" aria-label=""></span> รายงาน EIT
                </h3>
                <!--            <hr class="border-gray-600 border-1 mt-2">-->
            </div>
        
           

        </div>

    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch
} from 'vue-property-decorator';
 

import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
import {
    Iit
} from '@/store/iit'
import _ from "lodash"

@Component({
    components: {
         
    },
})
export default class Home extends Vue {

    private user!: any;
    private yearData!: any;
    private agency: any = null
    private response:any = false;

    public async created() {
        await this.run();
  
        this.response = true
    }

    private async run() {
        this.user = await User.getUser();
        // this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.$route.query.agency}/`)
        // this.yearData = await Core.getHttp(`/api/iit/v2/year/${this.$route.query.year}/`)
        
    }
 

}
</script>

 
