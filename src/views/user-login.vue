<template lang="pug">
	section.login
		//- h2 returning user
		section.returning_user(v-if="curUser")
			div.image {{curUser.avatar}}
			p {{curUser.name}}

		//- h2 new user
		section.new_user(v-else)
			emoji-picker(v-show="picker" v-bind:baseStyle="emojiPickerStyle" @onPickEmoji="handlePickEmoji")
			form
				div.avatar
					span.image(@click="handleSelectAvatar") {{avatar}}
				div.name
					input(v-model="name" type="text" placeholder="NAME HERE")

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
				el.textContent = 'Enter Chatroon'
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

placeholder()
	&::-webkit-input-placeholder
		{block}
	&:-moz-placeholder
		{block}
	&::-moz-placeholder
		{block}
	&:-ms-input-placeholder
		{block}

text-color = rgba(105, 0, 255, 0.66)
avatar-bg-color = #ccc666
enter-btn-color = rgba(212, 172, 58, 0.17)

section.login
	font-family 'Helvetica', Arial, Avenir, sans-serif
	text-align center
	color text-color
	font-size 1.2em
section.returning_user
	display flex
	flex-direction row
	justify-content center
	div.image
		/*border 2px ridge magenta*/
		margin auto 50px
		font-size 3em
		border-radius 5px 5px 5px 5px
		background-color avatar-bg-color
	p
		font-family Consolas
		font-size 2em
		color text-color
section.new_user form
	/*border 14px solid black*/
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content center
	margin 10px
	div.avatar
		/*border 1px magenta solid*/
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
		/*border 1px solid lightgreen*/
		flex 2
		margin-top 20px
		input
			&:focus
				outline none
				color text-color
			+placeholder()
				opacity .1
			font-size 2em
			width 100%
			height 100%
			border-radius 5px 5px 5px 5px
			border none
div.enter_btn button
	/*border 2px outset enter-btn-color*/
	border none
	font-family 'Sniglet' cursive
	width 100%
	margin-top 20px
	font-size 2em
	background-color enter-btn-color
	cursor not-allowed

/*@media screen and (max-width 668px)*/
@media screen and (min-width 512px) and (max-width 768px)
	div.avatar
		flex none !important
		width 100% !important
	div.name input
		font-size .8em !important
		width  100% !important

@media screen and (max-width 512px)
	div.avatar
		flex none !important
		width 100% !important
	div.name input
		font-size .8em !important
		width  100% !important
	div.enter_btn button
		font-size 1.5em
</style>
