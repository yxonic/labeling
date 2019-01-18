import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'

// stylesheets
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import '@voerro/vue-tagsinput/dist/style.css'

// third-party components
import VoerroTagsInput from '@voerro/vue-tagsinput'
Vue.component('tags-input', VoerroTagsInput)

// modules
window.Vue = Vue
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

// routing
const routes = [
  { path: '/:dataset', component: App }
]
const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
