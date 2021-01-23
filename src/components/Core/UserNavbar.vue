<template>
  <div>
    <v-app-bar  app class="bg-nav" dark >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My files</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app    fixed  >

      <v-list nav  dense >
        <v-list-item-group v-for="item,index in items" :key="index"   >
          <v-list-item @click="$router.push(item.path)" class="deep-purple--text text--accent-4">
            <v-list-item-title><v-icon class="text-sm">{{item.icon}}</v-icon>{{item.text}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script lang="ts">
import {User} from "@/store/user";
import {Auth} from "@/store/auth";
import {Core} from "@/store/core";
import { userRouter } from '@/router/user'
import {Component, Vue, Watch} from "vue-property-decorator";
import _ from 'lodash'
@Component({
  components: {

  },
  computed: {}
})

export default class UserClass extends Vue {

  drawer:any =  true
  group:any = 5
  items:any = []


  async created() {
  //  console.log(this.$route)
    await this.loadRouter();
  }

  async loadRouter() {
    let routerAll: any = _.filter(userRouter,  {enabled:true })
    this.items = routerAll
    console.log(routerAll);
  }

}
</script>
