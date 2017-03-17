<template lang="pug">
	div.container(:style='baseStyle')
</template>

<script lang="">
'use strict'

import EmojiPanel from 'emoji-panel'

export default {
	name: 'emoji-picker',
	props: {
		baseStyle: {
			required: true,
			type: Object
		}
	},
	mounted () {
		new EmojiPanel(this.$el, {
			onClick: (emoji) => {
				this.$emit('onPickEmoji', emoji)
			}
		})
	}
}
</script>
