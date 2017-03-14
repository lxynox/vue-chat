import Vue from 'vue'
import App from './app.vue'
import VueSocketio from './mixins'

const URI = 'http://0.0.0.0:3000'
Vue.use(VueSocketio, URI)

new Vue({
	el: '#app',
	render: h => h(App)
})
