<template lang="pug">
	form
		div.picker(v-show="inputOptions === 'emoji'")
			emoji-picker( v-bind:baseStyle="emojiPickerStyle" @onPickEmoji="handlePickEmoji")
		div.markdown(v-show="inputOptions === 'markdown'")
			div.preview(v-html="compiledMarkdown")

		ul.btns
			li(@click.prevent="handleEmojiBtnClick" v-bind:class="{active: inputOptions === 'emoji'}") ⎡🎨⎦
			li(@click.prevent="handleMarkdownBtnClick" v-bind:class="{active: inputOptions === 'markdown'}") 〈 🦄 〉
		div.texts
			textarea(:value="message" @input="handleInput" placeholder="type messages here" name="message")
			button(@click.prevent="handleSendBtnClick" name="send-btn") 🚀
</template>

<script>
'use strict'

import EmojiPicker from './emoji-picker.vue'
import marked from 'marked'

import { mapMutations } from 'vuex'
import * as types from '../stores/mutation-types'

// debouncing user typing events
let timeout
const TYPING_TIMER_LENGTH = 500

export default {
	name: 'text-input',
	props: {
		curUser: {
			required: true,
			type: Object
		}
	},
	components: {
		EmojiPicker
	},
	data() {
		return {
			message: '',
			isTyping: false,
			inputOptions: ''
		}
	},
	created () {
		this.emojiPickerStyle = {
			position: 'absolute',
			bottom: '0',
			height: '200px'
		}
	},
	sockets: {
		typing (uID) {
			this.typing({ uID })
		},
		'stop typing' (uID) {
			this.stopTyping({ uID })
		},
		'new message' (message) {
			this.addMSG({ message })
		}
	},
	computed: {
		compiledMarkdown () {
			// https://vuejs.org/v2/examples/
			return marked(this.message, { sanitize: true })
		}
	},
	methods: {
		...mapMutations({
			addMSG: types.ADD_MESSAGE,
			typing: types.TYPING,
			stopTyping: types.STOP_TYPING
		}),
		handlePickEmoji (emoji) {
			this.message += String.fromCodePoint(`0x${emoji.unified}`)
		},
		handleEmojiBtnClick () {
			if (this.inputOptions === 'emoji') {
				this.inputOptions = ''
				return
			}
			this.inputOptions = 'emoji'
		},
		handleMarkdownBtnClick() {
			if (this.inputOptions === 'markdown') {
				this.inputOptions = ''
				return
			}
			this.inputOptions = 'markdown'
		},
		handleInput (evt) {
			// debouncing
			if (!this.isTyping) {
				this.isTyping = true
				this.$socket.emit('typing')
				this.$options.sockets.typing.call(this, this.curUser.id)
			}

			function later() {
				timeout = null
				this.isTyping = false
				this.$socket.emit('stop typing')
				this.$options.sockets['stop typing'].call(this, this.curUser.id)
				this.message = evt.target.value
			}

			clearTimeout(timeout)
			timeout = setTimeout(later.bind(this), TYPING_TIMER_LENGTH)
		},
		handleSendBtnClick () {
			const text = this.inputOptions === 'markdown'
				? this.compiledMarkdown.trim()
				: this.message.trim()
			if (!text) {
				return
			}

			this.message = ''
			const msg = {
				text,
				from: this.curUser,
				at: new Date()
			}
			this.$socket.emit('new message', msg)
		}
	}
}
</script>

<style lang="stylus" scoped>

bg-color = lighten(#ccc, 30%)
send-btn-color = rgba(#7d66cc, 0.75)
option-btn-color= lighten(#ccc, 80%)

.active
	background-color #fff !important
	border #fff solid 5px

form
	flex 60%
	background-color bg-color
	div.picker
		position relative
	div.markdown
		position relative
		div.preview
			border 1px solid gold
			border-bottom none
			position absolute
			width 100%
			height 200px
			bottom 0
			overflow-y scroll
	div.texts
		margin 0
		text-align left
		height: 100px
		display flex
		justify-content center
		button
			width 120px
			font-size 1em
			border none
			background-color send-btn-color
		textarea
			width: 100%
			font-size 1em
			color rgb(92, 95, 108)
			padding 0
			border none
	ul.btns
		padding 0
		margin 0
		display flex
		flex-direction row
		justify-content flex-start
		align-items stretch
		li
			&:nth-child(2n)
				border-left none
			&:hover
				cursor pointer
			list-style none
			display inline-block
			border 3px option-btn-color outset
			font-size 1em

@media screen and (max-width 580px)
	form
		flex 100%
	div.texts button
		width 80px !important
	div.texts textarea
		font-size .6em !important
</style>
