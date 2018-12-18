import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import '@voerro/vue-tagsinput/dist/style.css'

window.Vue = Vue
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

import VoerroTagsInput from '@voerro/vue-tagsinput';
Vue.component('tags-input', VoerroTagsInput);

new Vue({
  el: '#app',
  render: h => h(App)
})
