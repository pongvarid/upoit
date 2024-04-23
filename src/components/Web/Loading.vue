<template>
  <div>
    <v-overlay z-index="99" :value="loading">
     <center>  <v-btn style="height:108px; width:108px;" color="white" fab     class=" animate__animated animate__pulse animate__infinite	infinite" >
        <img class="w-auto  h-24 " src="https://upload.wikimedia.org/wikipedia/th/thumb/0/00/University_of_Phayao_Logo.svg/1200px-University_of_Phayao_Logo.svg.png" alt="">
      </v-btn></center>
     <center> <h2 class="text-xl animate__animated animate__swing animate__infinite	infinite">{{loadTxt}}..</h2></center>
    </v-overlay>
  </div>

</template>

<script lang="ts">
import {User} from "@/store/user";
import {Auth} from "@/store/auth";
import {Core} from "@/store/core";
import {Web} from "@/store/web";
import {Component, Vue, Watch} from "vue-property-decorator";

@Component({
  components: {

  },
  computed: {}
})

export default class UserClass extends Vue {

  overlay:any =  true


  async created() {

  }

  get loading(){
    return Web.loading
  }

  get loadTxt(){ 
    return Web.loadTxt
  }
  
}
</script>
