<template lang="pug">
	div.message(:class="{myMessage: isMyMsg}")
		input(v-if="editing" v-model="editedMsg" @keyup.enter="doneEdit" @blur="doneEdit")
		span.content(v-else :style="contentStyle" @dblclick="handleDBClick" v-html="message.text")
		span.avatar(:style="avatarStyle") {{ message.from.avatar }}
</template>

<script lang="">
'use strict'

export default {
	name: 'message',
	props: ['message', 'isMyMsg'],
	data () {
		return {
			editing: false,
			editedMsg: null
		}
	},
	computed: {
		contentStyle () {
			const style = {
				backgroundColor: 'rgba(13, 90, 193, 0.6)'
			}
			return this.isMyMsg
				? style
				: null
		},
		avatarStyle () {
			const style = {
				float: 'right !important'
			}
			return this.isMyMsg
				? style
				: null
		}
	},
	methods: {
		handleDBClick (e) {
			if (!this.isMyMsg) {
				return
			}
			this.editedMsg = e.target.textContent
			this.editing = true
		},
		doneEdit () {
			if (this.message.text === this.editedMsg) {
				return
			}
			const newMSG = Object.assign({}, this.message, {
				text: this.editedMsg,
				at: new Date()
			})
			this.$emit('onEditMessage', this.message, newMSG)
			this.editing = false
		}
	}
}
</script>

<style lang="stylus" scoped>

my-msg-bgcolor = lightblue
others-msg-bgcolor = #ccc

.myMessage
	text-align right !important

div.message
	text-align left
	span.avatar
		float left
		margin 0 20px
	span.content
		max-width 200px
		overflow-wrap break-word
		padding 0 10px
		display  inline-block
		border-radius 5px 5px 5px 5px
		background-color others-msg-bgcolor

</style>
