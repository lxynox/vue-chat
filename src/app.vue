<template lang="pug">
	div
		slot {{message}}
		chat-room
</template>

<script>
import ChatRoom from './views/chat-room.vue'

export default {
	name: 'app',
	components: {
		ChatRoom
	},
	data () {
		return {
			message: 'greetings from vue2.0'
		}
	}
}
</script>

<style lang="stylus">
html
	font-family: 'Avenir', Helvetica, arial, sans-serif
	font-size: 30px
	text-align: center
	height: 100%
body
	height: @height
	border: 2px groove lightgrey

#app
	display: flex
	flex-direction: column
	justify-content: center
	height: 100%
</style>
