<template>
  <div v-if="response" >
    <div class="container mx-auto">
      <form @submit.prevent="getListEIT()">
        <v-combobox required v-model="year" :items="env.years"   item-text="year" label="Current-Year"></v-combobox>

        <v-combobox required v-model="agency"  :items="env.agencies"   item-text="name" label="Current-Agency"></v-combobox>
        <v-btn type="submit">Go!</v-btn>
      </form>

      <form @submit.prevent="convertAgency()" v-if="eit && suggestion" class="mt-4">
        <v-combobox required v-model="agencyChoose"  :items="env.agencies"   item-text="name" label="Change-Agency"></v-combobox>
        <v-btn type="submit">Change!</v-btn>
      </form>
      <br>
      <v-progress-linear v-if="eit  "
          v-model="perloadEIT"
          color="green"
          :buffer-value="eit.length"
          height="25"
      ><strong>{{perloadEIT}} / {{eit.length}}</strong>  </v-progress-linear>
      <v-progress-linear v-if=" suggestion"
                         v-model="perloadSug"
          color="orange"
         :buffer-value="suggestion.length"
          height="25"
      ><strong>{{perloadSug}} / {{suggestion.length}}</strong> </v-progress-linear>


      <v-tabs class="mt-6">
        <v-tab>EIT</v-tab>
        <v-tab-item>
          <v-data-table v-if="eit"
              :items-per-page="50"
              :headers="[{text:'id',value:'id'},
              {text:'agency',value:'agency'},
              {text:'year',value:'year'},
              {text:'value_by',value:'value_by'},
              {text:'user',value:'user'},{text:'created_at',value:'created_at'} ]"
              :items="eit"
          ></v-data-table >

        </v-tab-item>
        <v-tab>Suggestion</v-tab>
        <v-tab-item>
          <v-data-table v-if="suggestion"
              :items-per-page="50"
              :headers="[{text:'id',value:'id'},{text:'agency',value:'agency'},{text:'year',value:'year'},{text:'suggestion',value:'suggestion'},{text:'user',value:'user'},{text:'created_at',value:'created_at'} ]"
              :items="suggestion"
          ></v-data-table>
        </v-tab-item>
      </v-tabs>





    </div>

  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue
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
import _ from 'lodash'
import {
  Web
} from '@/store/web'

@Component({
  components: {

  },
})
export default class Home extends Vue {

  env:any = {
    years:null,
    agencies:null
  }

  agency:any = null
  agencyChoose:any = null
  year:any = null
  suggestion:any = null
  eit:any = null
  response:boolean = false
  alert:[] = []

  async loadEnv(){
    this.env.agencies = await Core.getHttp(`/api/ita/v1/agency/`)
    this.env.years = await Core.getHttp(`/api/eit/v2/year/`)
  }
  async created() {
    await this.loadEnv();
    this.response = true
  }

  async getListEIT(){
      this.suggestion = await Core.getHttp(`/api/eit/v2/answersuggestioneit/?agency=${this.agency.id}&year=${this.year.id}`)
      this.eit =   await Core.getHttp(`/api/eit/v2/answerissueeit/?agency=${this.agency.id}&year=${this.year.id}`)
  }

  perloadEIT:number = 0;
  perloadSug:number = 0;
  async convertAgency(){
      let check = confirm('are you sure')
      if(check){
        for (let i=0; i < this.eit.length; i++){
          let per = i
          let data = this.eit[i]
          data.agency = this.agencyChoose.id
          console.log(data)

          await Core.putHttp(`/api/eit/v2/answerissueeit/${data.id}/`,data)

          await this.sleep(800).then(() => {  this.perloadEIT = per+1 })

        }
        for (let j=0; j < this.suggestion.length; j++){
          let per = j
          let data = this.suggestion[j]
          data.agency = this.agencyChoose.id
          await Core.putHttp(`/api/eit/v2/answersuggestioneit/${data.id}/`,data)
          console.log(data)
          await this.sleep(1000).then(() => {  this.perloadSug = per+1 })

        }


      }
  }

  async sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }





  prePrint(){
    window.print();
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
