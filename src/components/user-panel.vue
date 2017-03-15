<template lang="pug">
	ul
		li(v-for="user in users") {{user.username}}
			span(v-if="user.isTyping") ❮is typing ...❯
			span(v-else-if="user.left") ❮has left❯
			span(v-else) ❮active❯
</template>

<script lang="">
'use strict'

export default {
	name: 'UserPanel',
	props: ['users'],
	components: {},
	data () {
		return {}
	},
	computed: {},
	methods: {}
}
</script>

<style lang="stylus" scoped>
ul
	padding: 0
	margin: 0
	li
		/*text-align: start*/
		list-style: none
		&:before
			content: '🤧'
</style>
