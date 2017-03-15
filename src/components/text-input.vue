<template lang="pug">
	form.text-panel
		textarea(v-model="message" @input="onInput" placeholder="type messages here" name="message" rows="8" cols="50")
		div.btns
			input(type="button" name="emoji-btn" value="emoji")
			input(@click.prevent="send" type="submit" name="submit-btn" value="submit")
</template>

<script>
'use strict'

const TYPING_TIMER_LENGTH = 500

export default {
	name: 'text-input',
	props: ['user' ],
	data() {
		return {
			message: '',
			typing: false
		}
	},
	methods: {
		onInput() {
			// debouncing from: https://github.com/socketio/socket.io/blob/master/examples/chat/public/main.js
			if (!this.typing) {
				this.typing = true
				this.$emit('typing')
			}
			let lastTypingTime = (new Date()).getTime()

			setTimeout(() => {
				let typingTimer = (new Date()).getTime()
				let timeDiff = typingTimer - lastTypingTime
				if (timeDiff >= TYPING_TIMER_LENGTH && this.typing) {
					this.$emit('stopTyping')
					this.typing = false
				}
			}, TYPING_TIMER_LENGTH)
		},
		send() {
			const text = this.message.trim()
			if (!text) {
				return
			}

			const msg = {
				text,
				from: this.user,
				at: new Date()
			}
			this.$emit('send', msg)
		}
	}
}
</script>

<style lang="stylus">
</style>
