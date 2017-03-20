<template lang="pug">
	div.room
		text-panel(v-bind:curUser="curUser" v-bind:messages="messages")
		text-input(v-bind:curUser="curUser")
		user-panel(v-bind:curUser="curUser" v-bind:users="users")
</template>

<script>
'use strict'

import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

import TextPanel from '../components/text-panel.vue'
import TextInput from '../components/text-input.vue'
import UserPanel from '../components/user-panel.vue'

import * as types from '../stores/mutation-types'

export default {
	name: 'chat-room',
	props: ['curUser'],
	components: {
		TextPanel,
		TextInput,
		UserPanel
	},
	computed: mapState({
		users: (state) => state.room.users,
		messages: (state) => state.room.messages
	}),
	created() {
		this.$socket.emit('add user', this.curUser)
	},
	sockets: {
		'join chat' (users) {
			this.join({ users })
		},
		'new client' (user) {
			this.addUser({ user })
		},
		'user left' (uID) {
			this.leave({ uID })
		}
	},
	methods: {
		...mapMutations({
			join: types.JOIN_CHAT,
			addUser: types.NEW_CLIENT,
			leave: types.LEAVE_CHAT,
		})
	}
}
</script>

<style lang="stylus" scoped>

.room
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content flex-start
</style>
