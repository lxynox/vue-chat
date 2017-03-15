<template lang="pug">
	ul
		li(v-for="msg in messages")
			message(v-bind:message="msg" v-bind:isMyMsg="msg.from === user")
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
li
	list-style: none

</style>
