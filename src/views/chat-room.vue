<template lang="pug">
	div
		text-panel(v-bind:user="profile" v-bind:messages="messages")
		text-input(v-bind:user="profile" @typing="handleTyping" @stopTyping="handleStopTyping" @send='handleSend')
		user-panel(v-bind:users="users")
</template>

<script>
'use strict'

import Vue from 'vue'

import TextPanel from '../components/text-panel.vue'
import TextInput from '../components/text-input.vue'
import UserPanel from '../components/user-panel.vue'

export default {
	name: 'chat-room',
	props: ['profile'],
	components: {
		TextPanel,
		TextInput,
		UserPanel
	},
	created() {
		this.users.push(this.profile)
	},
	sockets: {
		login (data) {
			alert(data)
		},
		'user joined' (newUser) {
			// console.debug('new user joined!')
			this.users.push(newUser)
		},
		typing (username) {
			// console.debug('🤡', username);
			//
			// The reactivity system will not trigger if you add or change an object directly in javascript. Specifically in the case of arrays
			// Use `Vue.set` to work around: https://vuejs.org/v2/guide/list.html#Caveats
			for (const [idx, user] of this.users.entries()) {
				if (user.username === username) {
					user.isTyping = true
					Vue.set(this.users, idx, user)
					break
				}
			}
		},
		'stop typing' (username) {
			for (const [idx, user] of this.users.entries()) {
				if (user.username === username) {
					user.isTyping = false
					Vue.set(this.users, idx, user)
					break
				}
			}
		},
		'new message' (message) {
			this.messages.push(msg)
		},
		'edited message' (message) {

		},
		'withdraw message' (message) {
			for (const [idx, m] of this.messages.entries()) {
				if (m.content === message.content) {
					this.messages.splice(idx, 1)
					break
				}
			}
		},
		'user left' (username) {
			for (const [idx, user] of this.users.entries()) {
				if (user.username === username) {
					this.users.splice(idx, 1)
					break
				}
			}
		}
	},
	data () {
		const data = {
			users: [], //TODO: remove mock data
			messages: [],
		}
		return data
	},
	methods: {
		handleTyping () {
			const username = this.profile.username
			this.$options.sockets.typing.call(this, username)
			// this.$socket.emit('typing', username)
		},
		handleStopTyping () {
			const username = this.profile.username
			this.$options.sockets['stop typing'].call(this, username)
			// this.$socket.emit('stop typing', username)
		},
		handleSend (msg) {
			this.messages.push(msg)
			this.$socket.emit('new message', msg)
		}
	},
	computed: {},
}
</script>

<style lang="stylus" scoped>
</style>
