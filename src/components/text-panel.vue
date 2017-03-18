<template lang="pug">
	ul.text_panel
		li(v-for="msg in messages")
			message(:class="{my_msg: msg.from === user}" v-bind:message="msg" v-bind:isMyMsg="msg.from === user" @onEditMessage="handleEditMessage" )
</template>

<script>
'use strict'

import Message from './message.vue'

export default {
	name: 'text-panel',
	components: {
		Message
	},
	props: {
		messages: {
			type: Array,
			required: true
		},
		user: {
			type: Object,
			required: true
		}
	},
	methods: {
		handleEditMessage (message, editedText) {
			this.$emit('onEditDone', message, editedText)
		}
	},
}
</script>

<style lang="stylus" scoped>

ul.text_panel
	flex 80%
	border 1px solid gold
	padding 0
	height 300px
	overflow-y scroll
	li
		list-style none
		width 100%
		margin: 10px auto
		/*background-color olive*/
</style>
