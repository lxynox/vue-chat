<template lang="pug">
	div.room
		text-panel(v-bind:curUser="curUser" v-bind:messages="messages" @onEditDone="handleEditDone")
		text-input(v-bind:curUser="curUser" @onTyping="handleTyping" @onStopTyping="handleStopTyping" @onSend='handleSend')
		user-panel(v-bind:curUser="curUser" v-bind:users="users" @onStatusChange="handleStatusChange")
</template>

<script>
'use strict'

import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

import TextPanel from '../components/text-panel.vue'
import TextInput from '../components/text-input.vue'
import UserPanel from '../components/user-panel.vue'

import * as types from '../stores/mutation-types'

export default {
	name: 'chat-room',
	props: ['curUser'],
	components: {
		TextPanel,
		TextInput,
		UserPanel
	},
	computed: mapState({
		users: (state) => state.room.users,
		messages: (state) => state.room.messages
	}),
	created() {
		this.$socket.emit('add user', this.curUser)
	},
	sockets: {
		// -user action handlers
		'join chat' (users) {
			this.join({ users })
		},
		'new client' (user) {
			this.addUser({ user })
		},
		typing (uID) {
			this.typing({ uID })
		},
		'stop typing' (uID) {
			this.stopTyping({ uID })
		},
		'update status' (uID, status) {
			this.changeStatus({ uID, status })
		},
		'user left' (uID) {
			this.leave({ uID })
		},
		// -msg handlers
		'new message' (message) {
			this.addMSG({ message })
		},
		'edit message' (mID, message) {
			this.editMSG({ mID, message })
		},
		'withdraw message' (mID) {
			this.removeMSG({ mID })
		}
	},
	methods: {
		...mapMutations({
			join: types.JOIN_CHAT,
			addUser: types.NEW_CLIENT,
			leave: types.LEAVE_CHAT,
			typing: types.TYPING,
			stopTyping: types.STOP_TYPING,
			changeStatus: types.CHANGE_CHAT_STATUS,
			addMSG: types.ADD_MESSAGE,
			editMSG: types.EDIT_MESSAGE,
			removeMSG: types.WITHDRAW_MESSAGE
		}),
		handleStatusChange(newStatus) {
			this.$socket.emit('update status', newStatus)
		},
		handleTyping () {
			this.$options.sockets.typing.call(this, this.curUser.id)
			this.$socket.emit('typing')
		},
		handleStopTyping () {
			this.$options.sockets['stop typing'].call(this, this.curUser.id)
			this.$socket.emit('stop typing')
		},
		handleSend (message) {
			this.$options.sockets['new message'].call(this, message)
			this.$socket.emit('new message', message)
		},
		handleEditDone (mID, editedMSG) {
			const text = editedMSG.text ? editedMSG.text.trim() : null

			if (!text) {
				this.$options.sockets['withdraw message'].call(this, mID)
				this.$socket.emit('withdraw message', mID)
				return
			}

			this.$options.sockets['edit message'].call(this, mID, editedMSG)
			this.$socket.emit('edit message', mID, editedMSG)
		}
	}
}
</script>

<style lang="stylus" scoped>

.room
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content flex-start
</style>
