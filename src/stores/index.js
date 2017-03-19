import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login'
import room from './modules/room'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		login,
		room
	},
	strict: debug
})
