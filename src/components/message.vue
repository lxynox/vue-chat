<template lang="pug">
	div.message(:class="{myMessage: isMyMSG}")
		input(v-if="editing" v-model="editedMSG" @keyup.enter="doneEdit" @blur="doneEdit")
		span.content(v-else :style="contentStyle" @dblclick="handleDBClick" v-html="message.text")
		span.avatar(:style="avatarStyle") {{ message.from.avatar }}
</template>

<script lang="">
'use strict'

export default {
	name: 'message',
	props: ['message', 'isMyMSG'],
	data () {
		return {
			editing: false,
			editedMSG: null
		}
	},
	computed: {
		contentStyle () {
			const style = {
				backgroundColor: 'rgba(13, 90, 193, 0.6)'
			}
			return this.isMyMSG
				? style
				: null
		},
		avatarStyle () {
			const style = {
				float: 'right !important'
			}
			return this.isMyMSG
				? style
				: null
		}
	},
	methods: {
		handleDBClick (e) {
			if (!this.isMyMSG) {
				return
			}
			this.editedMSG = e.target.textContent
			this.editing = true
		},
		doneEdit () {
			if (this.message.text === this.editedMSG) {
				this.editing = false
				return
			}

			this.$emit('onEditDone', this.editedMSG, this.message)
			this.editing = false
		}
	}
}
</script>

<style lang="stylus" scoped>

others-msg-bgcolor = #ccc

.myMessage
	text-align right !important

div.message
	font-family Avenir, sans-serif
	text-align left
	span.avatar
		float left
		margin 0 20px
	span.content
		max-width 200px
		overflow-wrap break-word
		padding 5px
		font-size .8em
		text-align center
		display  inline-block
		border-radius 5px 5px 5px 5px
		background-color others-msg-bgcolor

</style>
