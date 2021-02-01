<template>
  <div> 
    <v-card>
      <v-responsive :aspect-ratio="16/9"> 
        <v-card-text>
          This card will always be 16:9 (unless you put more stuff in it)
        </v-card-text>
      </v-responsive>
    </v-card>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import {
    User
} from "@/store/user";
import {
    Auth
} from "@/store/auth";
@Component({
    components: {

    },
    computed: {}
}) 

export default class Test extends Vue {
    page: any = ''
    response: boolean = false

    async created() {

    }
}
</script>
