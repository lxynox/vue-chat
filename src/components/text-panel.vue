<template lang="pug">
	ul
		li(v-for="msg in messages") {{msg}}
</template>

<script>

export default {
	name: 'text-panel',
	props: {
		messages: {
			type: Array,
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
