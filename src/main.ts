import Vue from 'vue'
import 'reflect-metadata'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import Cookies from 'js-cookie'
// @ts-ignore
import Clipboard from 'v-clipboard'
import Vue2TouchEvents from 'vue2-touch-events'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'



Vue.prototype.$appName = 'Dolphin'
Vue.use(BootstrapVue)
Vue.use(Clipboard)
Vue.use(Vue2TouchEvents)
Vue.use(VueLodash, { name: 'custom', lodash: lodash })
Vue.use(require('vue-moment'))

let baseURL = ''

Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.baseURL = Vue.prototype.$baseURL = baseURL
Vue.prototype.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// Vue.prototype.lodash = lodash

const jwt = localStorage.getItem('token')

if (jwt) {
	Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Token ' + jwt
	Cookies.set('token', window.localStorage.getItem('token') as any, {
		domain: 'splashwithdolphin.com',
	})
}

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
