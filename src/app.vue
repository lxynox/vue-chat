<template lang="pug">
	div
		slot {{message}}
		login-page(v-if="currentPage === 'login'" v-bind:profile="profile" v-bind:handleEnterBtnClick="joinChat")
		chat-room(v-else v-bind:profile="profile")
</template>

<script>
'use strict'

import ChatRoom from './views/chat-room.vue'
import LoginPage from './views/user-login.vue'
import store from './stores'

export default {
	name: 'app',
	created() {
		// store.clear()
	},
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
	methods: {
		joinChat(data) {
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
	height: @height
	border: 2px groove lightgrey

#app
	display: flex
	flex-direction: column
	justify-content: center
	height: 100%
</style>
