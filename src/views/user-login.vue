<template lang="pug">
	section.login
		//- h2 returning user
		section.returning_user(v-if="curUser")
			div.image {{curUser.avatar}}
			p {{curUser.name}}

		//- h2 new user
		section.new_user(v-else)
			form
				div.avatar
					span.image(@click="handleSelectAvatar") {{avatar}}
				div.name
					input(v-model="name" type="text" placeholder="🆔")
			emoji-picker(v-show="picker" v-bind:baseStyle="emojiPickerStyle" @onPickEmoji="handlePickEmoji")

		div.enter_btn
			button(@click="handleEnterBtnClick" v-disable="disableEnter") Choose avatar and name
</template>

<script>
'use strict'

import { mapMutations } from 'vuex'

import EmojiPicker from '../components/emoji-picker.vue'

import * as types from '../stores/mutation-types'

export default {
	name: 'LoginPage',
	components: {
		EmojiPicker
	},
	props: {
		curUser: {
			type: Object
		}
	},
	sockets: {
		['logged in'] (user) {
			this.login({ user })
		}
	},
	data () {
		const emojiPickerStyle = {
			height: '200px'
		}
		return {
			avatar: '💩',
			name: '',
			picker: false,
			emojiPickerStyle
		}
	},
	computed: {
		disableEnter () {
			if (this.curUser) {
				return false
			}
			return !this.name.trim() || !this.avatar.trim()
		}
	},
	methods: {
		...mapMutations({
			login: types.LOGIN
		}),
		handleSelectAvatar () {
			this.picker = !this.picker
		},
		handlePickEmoji (emoji) {
			this.avatar = String.fromCodePoint(`0x${emoji.unified}`)
			this.picker = false
		},
		handleEnterBtnClick () {
			if (!this.curUser) {
				// new user
				const user = {
					avatar:  this.avatar,
					name: this.name,
					status: 'online',
					isTyping: false
				}
				this.$socket.emit('login', user)
			} else {
				this.$options.sockets['logged in'].call(this, this.curUser)
			}
		}
	},
	directives: {
		disable(el, binding) {
			if (!binding.value) {
				el.textContent = 'Enter Chatroom'
				el.disabled = false
				el.style.color = 'rgba(105, 0, 255, 0.66)'
				el.style.cursor = 'pointer'
			} else {
				el.textContent = 'Choose avatar and name'
				el.disabled = true
				el.style.color = '#ccc'
				el.style.cursor = 'not-allowed'
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Sniglet:800')

// shim to use placeholder
placeholder()
	&::-webkit-input-placeholder
		{block}
	&:-moz-placeholder
		{block}
	&::-moz-placeholder
		{block}
	&:-ms-input-placeholder
		{block}

default-font = 'Helvetica', Arial, Avenir, sans-serif
btn-font = consolas, monaco, monospace
text-color = rgba(105, 0, 255, 0.66)
avatar-bg-color = #ccc666
input-area-color = rgba(212, 172, 58, 0.1)
enter-btn-color = rgba(206, 209, 204, 0.3)

section.login
	font-family default-font
	text-align center
	color text-color
	font-size 1.2em
section.returning_user
	display flex
	flex-direction row
	justify-content center
	div.image
		margin auto 20px
		font-size 3em
		border-radius 5px 5px 5px 5px
		background-color avatar-bg-color
	p
		font-family default-font
		font-size 2em
		color text-color
section.new_user form
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content center
	margin 10px
	div.avatar
		flex 1
		span.image
			border-radius 50%
			display inline-block
			width 150px
			height 150px
			font-size 3em
			box-shadow 0 0 0 black
			background-color avatar-bg-color
			&:hover
				cursor pointer
		input
			display none
	div.name
		flex 2
		margin-top 20px
		input
			&:focus
				color text-color
			+placeholder()
				opacity .1
				font-size .8em
				text-align center
			font-size 2em
			width 70%
			height 100%
			border-radius 5px 5px 5px 5px
			border none
			background-color input-area-color
div.enter_btn button
	border none
	font-family btn-font
	width 100%
	margin-top 20px
	font-size 2em
	background-color enter-btn-color
	cursor not-allowed

/*@media screen and (max-width 668px)*/
@media screen and (min-width 512px) and (max-width 768px)
	form
		display block !important

@media screen and (max-width 512px)
	form
		display block !important
		div.name input
			font-size 1em !important
	div.enter_btn button
		font-size 1.2em
</style>
