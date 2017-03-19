<template lang="pug">
	div.app
		slot {{ message }}
		login-page(v-if="curPage === 'login'" v-bind:curUser="curUser")
		chat-room(v-else v-bind:curUser="curUser")
</template>

<script>
'use strict'

import ChatRoom from './views/chat-room.vue'
import LoginPage from './views/user-login.vue'

import {mapState} from 'vuex'
import {clear} from './apis'

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
		this.message = 'Welcome to Vue 2.0!'
		alert('bootstrap app...')
		// alert('current page: ' + this.curPage)
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
