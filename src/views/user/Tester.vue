<template>
  <div  class="relative md:pt-32 pb-32 pt-12  " >
  <br> <br>
    <v-text-field
        v-model="name"
        label="Outlined"
        placeholder="Placeholder"
        outlined
    ></v-text-field>
    <v-btn @click="test()" color="primary">test</v-btn>
    <h1 class="text-2xl">{{name}}</h1>

    <div v-if="response">
      <v-select v-model="name" :items="years" item-text="year" item-value="id"></v-select>
      <div class="rounded-full p-6 shadow-xl bg-orange-600" v-for="obj,index in years" :key="index">
        {{obj.year}}
      </div>
    </div>

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
import xx from '@/tmp/iit.json'
@Component({
  components: {

  },
})
export default class Profile extends Vue {

  name:string = ''
  years:any = null

  response:boolean = false;

  private async test(){
    this.years = await Core.getHttp(`/api/iit/v1/year`);
    this.response = true;

  }

  async created() {
    this.years = await Core.getHttp(`/api/iit/v1/year`);
    this.response = true;
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
