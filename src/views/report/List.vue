<template>
  <div class="pt-26">
     <pre>{{agencies}}</pre>
  </div>

</template>

<script lang="ts">
import {User} from "@/store/user";
import {Auth} from "@/store/auth";
import {Core} from "@/store/core";
import {Report} from "@/store/report";
import { userRouter } from '@/router/user'
import {Component, Vue, Watch} from "vue-property-decorator";
import _ from 'lodash'
@Component({
  components: {

  },
  computed: {}
})

export default class ReportPage extends Vue {

 private agencies:any = null;
  async created() {
    await this.loadEnv();
      
  }

  async loadEnv(){
    this.agencies = await Core.getHttp(`/api/ita/v1/agency/`)
  }

  

}
</script>

<style>
 
</style>
