import Vue from 'vue'
import App from './app.vue'

import store from './stores'
import VueSocketio from './mixins'

const URI = 'http://0.0.0.0:3000'
Vue.use(VueSocketio, URI)

new Vue({
	el: '#app',
	store,
	render: h => h(App)
})
