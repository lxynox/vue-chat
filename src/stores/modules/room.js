import Vue from 'vue'

import * as types from '../mutation-types'

const state = {
	users: [],
	messages: []
}

const mutations = {
	// >users
	[types.JOIN_CHAT] (state, { users }) {
		state.users = [users[users.length - 1], ...users.slice(0, -1)]
	},
	[types.LEAVE_CHAT] (state, { uID }) {
		const idx = state.users.map(user => user.id).indexOf(uID)
		state.users.splice(idx, 1)
	},
	[types.NEW_CLIENT] (state, { user }) {
		state.users.push(user)
	},
	[types.TYPING] (state, { uID }) {
		const idx = state.users.map(user => user.id).indexOf(uID)
		const user = state.users[idx]
		user.isTyping = true
		Vue.set(state.users, idx, user)
	},
	[types.STOP_TYPING] (state, { uID }) {
		const idx = state.users.map(user => user.id).indexOf(uID)
		const user = state.users[idx]
		user.isTyping = false
		Vue.set(state.users, idx, user)
	},
	[types.CHANGE_CHAT_STATUS] (state, { uID, status }) {
		const idx = state.users.map(user => user.id).indexOf(uID)
		const user = state.users[idx]
		user.status = status
		Vue.set(state.users, idx, user)
	},

	// >messages
	[types.ADD_MESSAGE] (state, { message }) {
		state.messages.push(message)
	},
	[types.WITHDRAW_MESSAGE] (state, { mID }) {
		const idx = state.messages.map(msg => msg.id).indexOf(mID)
		state.messages.splice(idx, 1)
	},
	[types.EDIT_MESSAGE] (state, { mID, message }) {
		const idx = state.messages.map(msg => msg.id).indexOf(mID)
		state.messages[idx] = message
		Vue.set(state.messages, idx, state.messages[idx])
	}
}

export default {
	state,
	mutations
}
