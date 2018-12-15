import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import '@voerro/vue-tagsinput/dist/style.css'

Vue.use(BootstrapVue)

import VoerroTagsInput from '@voerro/vue-tagsinput';
Vue.component('tags-input', VoerroTagsInput);

new Vue({
  el: '#app',
  render: h => h(App)
})
