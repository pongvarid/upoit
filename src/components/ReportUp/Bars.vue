<template>
  <v-card>
    <v-card-title  >
      <h2>{{name}} &nbsp;<b>{{sub}}</b></h2> <v-spacer></v-spacer> <h2>{{score}} %</h2>
    </v-card-title>
    <v-card-text>
      <v-progress-linear striped height="10" :color="color"  :value="score" :buffer-value="100"></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue, Watch,Prop } from "vue-property-decorator";

@Component({
  components: {

  },
  computed: {}
})

export default class Bars extends Vue {
  @Prop({default:'No Name'})
  name:any

  @Prop({default:'red'})
  color:any

  @Prop({default:'0'})
  score:any

  @Prop({default:''})
  sub:any
}
</script>

