<template lang="pug">
	div
		text-panel(:messages="messages")
		text-input(@sendMessage='addMessage')
</template>

<script>
import TextPanel from '../components/text-panel.vue'
import TextInput from '../components/text-input.vue'

export default {
	name: 'chat-room',
	props: [],
	components: {
		TextPanel,
		TextInput
	},
	data () {
		const data = {
			messages: []
		}
		return data
	},
	methods: {
		addMessage(msg) {
			const {message} = msg
			this.messages.push(message)
		}
	},
	computed: {},
}
</script>

<style lang="stylus" scoped>
</style>
