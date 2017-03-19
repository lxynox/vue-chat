<template lang="pug">
	section.login
		section.returning_user(v-if="curUser")
			//- h2 returning user
			div.image {{curUser.avatar}}
			p {{curUser.name}}

		section.new_user(v-else)
			//- h2 new user
			emoji-picker(v-show="picker" v-bind:baseStyle="emojiPickerStyle" @onPickEmoji="handlePickEmoji")
			form
				div.avatar
					span.image(@click="handleSelectAvatar") {{avatar}}
				div.name
					input(v-model="name" type="text" placeholder="name here")

		div.enter_btn
			button(@click="handleEnterBtnClick" v-disable="disableEnter") Choose avatar and name
</template>

<script>
'use strict'

import EmojiPicker from '../components/emoji-picker.vue'

import * as types from '../stores/mutation-types'
// import { mapMutations } from 'vuex'

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
			this.$store.commit(types.LOGIN, { user })
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
				el.style.color = 'rgba(105, 0, 255, 0.84)'
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
@import url('http://fonts.googleapis.com/css?family=Droid+Sans')

placeholder()
	&::-webkit-input-placeholder
		{block}
	&:-moz-placeholder
		{block}
	&::-moz-placeholder
		{block}
	&:-ms-input-placeholder
		{block}

primary-color = #EF9A9A
secondary-color = #009688
text-color = rgba(105, 0, 255, 0.84)

section.login
	font-family 'Helvetica', Arial, Avenir, sans-serif
	text-align center
	color text-color
	font-size 1.2em
section.returning_user
	display flex
	flex-direction column
	align-items center
	div.image
		border 2px ridge magenta
		border-radius 5px 5px 5px 5px
		font-size 3em
		/*background-color purple*/
	p
		font-family Droid Sans
		color cyan
section.new_user form
	display flex
	flex-flow row wrap
	justify-content center
	div.avatar
		border 1px magenta solid
		flex 1
		@media screen and (max-width 512px)
			flex none
			width 100%
		span.image
			border-radius 50%
			display inline-block
			width 150px
			height 150px
			font-size 3em
			box-shadow 0 0 0 black
			background-color #ccc666
			&:hover
				cursor pointer
		input
			display none
	div.name
		flex 2
		-webkit-flex 2
		border 1px solid lightgreen
		input
			&:focus
				outline none
				color text-color
			+placeholder()
				opacity .2
			font-size 1.5em
			width 100%
			height 100%
			border 0
			border-bottom 1px inset black
div.enter_btn button
	font-size 2em
	color lighten(#ccc, 50%)
	width 100%
	cursor not-allowed

/*@media screen and (max-width 668px)*/
@media screen and (max-width 512px)
	div.name input
		font-size .8em !important
	div.enter_btn button
		font-size 1em

</style>
