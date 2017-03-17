<template lang="pug">
	div.app
		slot {{ message }}
		login-page(v-if="currentPage === 'login'" v-bind:profile="profile" @onJoinChat="handleJoinChat")
		chat-room(v-else v-bind:profile="profile")
</template>

<script>
'use strict'

import ChatRoom from './views/chat-room.vue'
import LoginPage from './views/user-login.vue'
import store from './stores'

export default {
	name: 'app',
	components: {
		LoginPage,
		ChatRoom
	},
	data () {
		return {
			currentPage: 'login',
			profile: store.fetch() || {},
			message: 'greetings from vue2.0'
		}
	},
	created() {
		// alert('bootstrap app...')
	},
	methods: {
		handleJoinChat(data) {
			if (data) {
				this.profile = data
				if (!store.save(data)) {
					console.log('Failed to save to storage :(')
					return
				}
			}
			// enter chatroom
			this.currentPage = 'room'
		}
	}
}
</script>

<style lang="stylus">
html
	font-family: 'Avenir', Helvetica, arial, sans-serif
	font-size: 30px
	text-align: center
	height: 100%
	body
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		padding: 0
		border: 3px ridge lightgrey
		height: @height
		.app
			border: 2px orange outset
			width: 80%
			max-width: 768px
</style>
