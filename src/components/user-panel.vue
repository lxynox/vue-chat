<template lang="pug">
	div.panel
		ul
			li(v-for="user in users")
				span {{ user.avatar }}
				span {{ user.name }}
				select(@change="handleChange" v-model="status")(v-if="user.id === curUser.id")
					option(disabled) choose from following
					option online
					option away
					option busy
				span(v-else) {{ user.status }}
				span(v-visible="user.isTyping") is typing ...
</template>

<script lang="">
'use strict'

export default {
	name: 'UserPanel',
	props: {
		users: {
			required: true,
			type: Array
		},
		curUser: {
			required: true,
			type: Object
		}
	},
	data () {
		return {
			status: 'online'
		}
	},
	methods: {
		handleChange () {
			this.$emit('onStatusChange', this.status)
		}
	},
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
.panel
	flex 30%
	ul
		font-size .5em
		padding: 0
		margin: 0
		li
			border 1px gold solid
			list-style none
			display flex
			justify-content space-around
			align-items center
			select
				width 80px
			span b
				color green
</style>
