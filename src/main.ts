import Vue from 'vue'
import './plugins/axios'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './plugins/varible';
Vue.config.productionTip = false
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);
Vue.component('loading', Loading)

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

import Card from '@/components/Bin/Card.vue'
Vue.component('bin-card', Card)
import Card2 from '@/components/Bin/Card2.vue'
Vue.component('bin-card2', Card2)
import Card3 from '@/components/Bin/Card3.vue'
Vue.component('bin-card3', Card3)
import {
  Core
} from '@/store/core'
import {
  User
} from '@/store/user'  
Vue.prototype.$core = Core
Vue.prototype.$user = User
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
