<template lang="pug">
	div.room
		text-panel(v-bind:user="profile" v-bind:messages="messages")
		text-input(v-bind:user="profile" @onTyping="handleTyping" @onStopTyping="handleStopTyping" @onSend='handleSend')
		user-panel(v-bind:curUser="profile" v-bind:users="users" @onStatusChange="handleStatusChange")
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
	data () {
		const data = {
			users: [this.profile],
			messages: [],
		}
		return data
	},
	created() {
		this.$socket.emit('add user', this.profile)
	},
	sockets: {
		login (users, message) {
			// alert(message)
			this.users = [this.profile, ...users.slice(0, -1)]
		},
		'user joined' (newUser) {
			this.users.push(newUser)
		},
		typing (username) {
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
			this.messages.push(message)
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
		'update status' (username, status) {
			for (const [idx, user] of this.users.entries()) {
				if (user.username === username) {
					user.status = status
					Vue.set(this.users, idx, user)
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
	methods: {
		handleStatusChange(newStatus) {
			const username = this.profile.username
			this.$socket.emit('update status', username, newStatus)
		},
		handleTyping () {
			const username = this.profile.username
			this.$options.sockets.typing.call(this, username)
			this.$socket.emit('typing', username)
		},
		handleStopTyping () {
			const username = this.profile.username
			this.$options.sockets['stop typing'].call(this, username)
			this.$socket.emit('stop typing', username)
		},
		handleSend (msg) {
			this.messages.push(msg)
			this.$socket.emit('new message', msg)
		}
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
