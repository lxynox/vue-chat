<template lang="pug">
	form
		div.picker(v-show="inputOptions === 'emoji'")
			emoji-picker( v-bind:baseStyle="emojiPickerStyle" @onPickEmoji="handlePickEmoji")
		div.markdown(v-show="inputOptions === 'markdown'")
			div(v-html="compiledMarkdown")

		ul.btns
			li(@click.prevent="handleEmojiBtnClick" name="emoji-btn") emoji
			li(@click.prevent="handleMarkdownBtnClick" name="markdown-btn") md
		div.texts
			textarea(:value="message" @input="handleInput" placeholder="type messages here" name="message")
			button(@click.prevent="handleSendBtnClick" name="send-btn") send
</template>

<script>
'use strict'

import EmojiPicker from './emoji-picker.vue'
import marked from 'marked'

// debouncing user typing events
let timeout
const TYPING_TIMER_LENGTH = 500

export default {
	name: 'text-input',
	props: ['curUser' ],
	components: {
		EmojiPicker
	},
	data() {
		return {
			message: '',
			typing: false,
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
	computed: {
		compiledMarkdown () {
			// https://vuejs.org/v2/examples/
			return marked(this.message, { sanitize: true })
		}
	},
	methods: {
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
			if (!this.typing) {
				this.typing = true
				this.$emit('onTyping')
			}

			function later() {
				timeout = null
				this.typing = false
				this.$emit('onStopTyping')
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

			const msg = {
				text,
				from: this.curUser,
				at: new Date()
			}
			this.$emit('onSend', msg)
			this.message = ''
		}
	}
}
</script>

<style lang="stylus" scoped>
primary-color = #800080

form
	flex 60%
	border 2px dotted lightgrey
	div.picker
		border 1px solid magenta
		position relative
	div.markdown
		border 1px solid grey
		position relative
		div
			border 1px solid
			position absolute
			width 100%
			height 200px
			bottom 0
			overflow-y scroll
	div.texts
		margin 0
		text-align left
		border 2px dotted lightgrey
		height: 100px
		display flex
		display -webkit-flex
		justify-content center
		button
			width 100px
		textarea
			width: 100%
			font-size 1em
			padding 0
			&:focus
				outline 2px solid rgba(41, 43, 236, 0.74)
	ul.btns
		text-align left
		border 2px solid
		padding 0
		margin 0
		li
			padding 0 10px
			border-right 5px inset #ccc
			list-style none
			display inline-block
			&:hover
				cursor pointer
			font-size 1em

@media screen and (max-width 580px)
	form
		flex 100%
	div.texts button
		width 80px !important
	div.texts textarea
		font-size .6em !important
</style>
