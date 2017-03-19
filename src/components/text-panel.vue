<template lang="pug">
	ul.text_panel
		li(v-for="msg in messages")
			message(v-bind:message="msg" v-bind:isMyMSG="msg.from.id === curUser.id" @onEditDone="handleEditDone")
</template>

<script>
'use strict'

import { mapMutations } from 'vuex'
import * as types from '../stores/mutation-types'
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
		curUser: {
			type: Object,
			required: true
		}
	},
	sockets: {
		'edit message' (mID, newMSG) {
			this.editMSG({ mID, message: newMSG })
		},
		'withdraw message' (mID) {
			this.removeMSG({ mID })
		}
	},
	methods: {
		...mapMutations({
			editMSG: types.EDIT_MESSAGE,
			removeMSG: types.WITHDRAW_MESSAGE
		}),
		handleEditDone(editedText, message) {
			const {id} = message
			const text = editedText.trim()
			if (!text) {
				// >withdraw
				this.$socket.emit('withdraw message', id)
				this.$options.sockets['withdraw message'].call(this, id)
			}
			// >edit
			const newMSG = {
				...message,
				text,
				at: new Date()
			} // (Object Spread similar to `Object.assign` where entry's order matters)
			this.$socket.emit('edit message', id, newMSG)
			this.$options.sockets['edit message'].call(this, id, newMSG)
		}
	}
}
</script>

<style lang="stylus" scoped>

ul.text_panel
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
