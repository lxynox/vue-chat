<template lang="pug">
	form
		div.picker
			emoji-picker(v-show="openEmojiPicker" v-bind:baseStyle="emojiPickerStyle" @onPickEmoji="handlePickEmoji")
		div.btns
			button(@click.prevent="handleEmojiBtnClick" name="emoji-btn") emoji
			button(@click.prevent="handleMdBtnClick" name="markdown") md
		div.texts
			textarea(v-model="message" @input="handleInput" placeholder="type messages here" name="message")
			button(@click.prevent="handleSaveBtnClick" name="send-btn") send
</template>

<script>
'use strict'

import EmojiPicker from './emoji-picker.vue'

const TYPING_TIMER_LENGTH = 500

export default {
	name: 'text-input',
	props: ['user' ],
	components: {
		EmojiPicker
	},
	data() {
		return {
			message: '',
			typing: false,
			openEmojiPicker: false
		}
	},
	created () {
		this.emojiPickerStyle = {
			position: 'absolute',
			bottom: '0',
			height: '200px'
		}
	},
	methods: {
		handlePickEmoji (emoji) {
			this.message += String.fromCodePoint(`0x${emoji.unified}`)
		},
		handleEmojiBtnClick () {
			this.openEmojiPicker = !this.openEmojiPicker
		},
		handleInput () {
			// debouncing from: https://github.com/socketio/socket.io/blob/master/examples/chat/public/main.js
			if (!this.typing) {
				this.typing = true
				this.$emit('onTyping')
			}
			let lastTypingTime = (new Date()).getTime()

			setTimeout(() => {
				let typingTimer = (new Date()).getTime()
				let timeDiff = typingTimer - lastTypingTime
				if (timeDiff >= TYPING_TIMER_LENGTH && this.typing) {
					this.$emit('onStopTyping')
					this.typing = false
				}
			}, TYPING_TIMER_LENGTH)
		},
		handleSendBtnClick () {
			const text = this.message.trim()
			if (!text) {
				return
			}

			const msg = {
				text,
				from: this.user,
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
		position relative
		border 1px solid magenta
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
				outline 2px solid lightgreen
	div.btns
		text-align left
		border 2px solid
		padding none
		button
			&:hover
				cursor pointer
			font-size 1em

@media screen and (max-width 580px)
	div.texts button
		width 80px !important
	div.texts textarea
		font-size .6em !important
</style>
