<template lang="pug">
	form.text-panel
		textarea(v-model="message" placeholder="type messages here" name="message" rows="8" cols="50")
		div.btns
			input(type="button" name="emoji-btn" value="emoji")
			input(@click.prevent="send()" type="submit" name="submit-btn" value="submit")
</template>

<script>
export default {
	name: 'text-input',
	data() {
		return {
			message: ''
		}
	},
	methods: {
		send() {
			const msg = this.message.trim()
			if (!msg) {
				return
			}
			this.$emit('sendMessage', {
				message: msg
			})
		}
	}
}
</script>

<style lang="stylus">
</style>
