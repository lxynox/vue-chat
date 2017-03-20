<template lang="pug">
	div.app
		slot {{ message }}
		login-page(v-if="curPage === 'login'" v-bind:curUser="curUser")
		chat-room(v-else v-bind:curUser="curUser")
</template>

<script>
'use strict'

import { mapState } from 'vuex'

import ChatRoom from './views/chat-room.vue'
import LoginPage from './views/user-login.vue'

import { clear } from './apis'

export default {
	name: 'app',
	components: {
		LoginPage,
		ChatRoom
	},
	beforeCreate () {
		clear() //TODO: remove when prod mode
	},
	computed: mapState({
		curPage: (state) => state.login.curPage,
		curUser: (state) => state.login.curUser
	}),
	created () {
		// this.message = 'Welcome to Vue 2.0!'
		alert('bootstrap app...')
	}
}
</script>

<style lang="stylus">

root-font = Helvetica, 'Avenir', sans-serif
root-bg-color = #fff
app-bg-color = rgba(114, 115, 115, 0.1)

html
	font-family: root-font
	font-size: 30px
	text-align: center
	height: 100%
	body
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		padding: 0
		background-color root-bg-color
		height: @height
		.app
			background-color app-bg-color
			box-shadow -2px -2px 5px 5px app-bg-color
			width: 80%
			max-width: 768px
</style>
