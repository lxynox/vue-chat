<template lang="pug">
	section.login
		section.returning_user(v-if="profile.username")
			//- h2 returning user
			div
				img(:src="profile.avatar" alt="user avatar" height=200 width=200)
			p {{profile.username}}

		section.new_user(v-else)
			//- h2 new user
			form
				div.avatar
					input(type="file" @change="onFileChange")
					img(:src="avatar" @click="selectAvatar" width=100 height=100)
				div.username
					input(v-model="username" type="text" placeholder="username here")

		div.enter_btn
			button(@click="onEnterBtnClicked" v-disable="disableEnter") Enter chatroom
</template>

<script>
'use strict'

export default {
	name: 'LoginPage',
	props: {
		profile: {
			type: Object,
			required: true,
		},
		handleEnterBtnClick: {
			type: Function,
			required: true
		}
	},
	data () {
		return {
			username: '',
			avatar: ''
		}
	},
	computed: {
		disableEnter() {
			if (this.profile && this.profile.username) {
				return false
			}
			return !this.username.trim() || !this.avatar.trim()
		}
	},
	methods: {
		onFileChange(e) {
			const createImage = (file) => {
				//TODO: currently store base64 image in `localstorage`,
				// will need to either 1) compress the base64 file to reduce in size
				// 2) choose other storage resources

				// validate image file extension
				if (! /\.(jpe?g|png|gif)$/i.test(file.name) ) {
					return
				}
				var reader = new FileReader()
				reader.onload = (e) => {
					this.avatar = e.target.result
				};
				reader.readAsDataURL(file);
			}
			const removeImage = () => {
				this.avatar = ''
			}

			let files = e.target.files || e.dataTransfer.files
			if (!files.length) {
				return
			}
			createImage(files[0])
		},
		selectAvatar() {
			let fileInput = this.$el.querySelector('.new_user input[type=file]')
			fileInput.click()
		},
		onEnterBtnClicked() {
			const data = this.profile.username? null : {
				avatar:  this.avatar,
				username: this.username,
				isTyping: false,
				left: false
			}
			this.handleEnterBtnClick(data)
		}
	},
	directives: {
		disable(el, binding) {
			el.disabled = true
			if (!binding.value) {
				el.disabled = false
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import url('http://fonts.googleapis.com/css?family=Droid+Sans')

.login
	font-family: 'Helvetica', Arial, Avenir, sans-serif
	text-align: center
	font-size: 1.2em
.returning_user
	img
		border-radius: 5 5 5 5
	p
		font-family: Droid Sans
		color: cyan
.new_user
	form
		display: flex
		display: -webkit-flex
		-webkit-flex-flow: row wrap
		flex-flow: row wrap
		justify-content: center
		height: 120px
		div.avatar
			border: 1px magenta solid
			flex: 1
			-webkit-flex: 1
			position: relative
			img
				background: no-repeat center/120% url(../assets/avatar.png)
				position: absolute
				right: 25px
				bottom: 10px
				padding: 0
				border: 2px gold solid
				border-radius: 10px 10px 10px 10px
				box-shadow: 0 0 .2em black
				height: 100px
				width: 100px
			input
				display: none
		div.username
			flex: 1
			-webkit-flex: 1
			border: 1px solid lightgreen
			/*position: relative*/
			input
				font-size: 1.5em
				width: 100%
				height: 100%
				/*position: absolute*/
				/*bottom: 0*/
				border: 0
				border-bottom: 1px inset black
</style>
