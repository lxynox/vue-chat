<template lang="pug">
	div
		div.message_meta
			img(:class="{pull_right: isMyMsg}" src="message.from.avatar" alt="user avatar" width=50 height=50)
			span  {{ message.at }}
		p.message_content {{message.text}}
</template>

<script lang="">
'use strict'

export default {
	name: 'message',
	props: ['message', 'isMyMsg'],
	// functional: true,
}
</script>

<style lang="stylus" scoped>
.pull_left
	float: left
.pull_right
	float: right
div
	width: 400px
	border: groove olive 1px
	.message_meta
		background-color: lightgrey
	.message_content
		margin: 0
		background-color: lightblue
</style>
