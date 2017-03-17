<template lang="pug">
	ul
		li(v-for="user in users")
			span {{ user.avatar }}
				span {{ user.username }}
			span(v-if="user.left") ❮ <b>⏏</b> ❯
			span(v-else) ❮ <b>✔</b> ❯
			span(v-visible="user.isTyping") is typing ...
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
	methods: {},
	directives: {
		visible(el, binding) {
			const visible = binding.value
			if (visible) {
				el.style.visibility = 'visible'
				el.style.color = '#ccc'
			} else {
				el.style.visibility = 'hidden'
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
ul
	flex 30%
	font-size .5em
	padding: 0
	margin: 0
	li
		display flex
		display -webkit-flex
		flex-flow row nowrap
		justify-content space-around
		list-style none
		border 1px gold solid
		span b
			color green
</style>
