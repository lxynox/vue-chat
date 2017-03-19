import * as types from '../mutation-types'

import {fetch, save} from '../../apis'

const state = {
	curPage: 'login',
	curUser: fetch()
}

const mutations = {
	[types.LOGIN] (state, { user }) {
		if (!state.curUser) {
			state.curUser = user
			if (!user || !save(user)) {
				console.error('Failed to save user info', user)
				return
			}
		}
		state.curPage = 'room'
	}
}

export default {
	state,
	mutations
}
