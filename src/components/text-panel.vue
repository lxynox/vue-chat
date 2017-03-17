<template lang="pug">
	ul
		li(v-for="msg in messages")
			message(:class="{my_msg: msg.from === user}" v-bind:message="msg" v-bind:isMyMsg="msg.from === user")
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
	data () {
		return {}
	},
	methods: {},
	computed: {},
}
</script>

<style lang="stylus" scoped>

ul
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
