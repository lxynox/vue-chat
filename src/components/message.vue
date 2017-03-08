<template lang="pug">
	li
		div
			img(src='avatar' width=10 height=10)
		p {{message}}
</template>

<script lang="">
  export default {
		name: 'message',
    props: ['message', 'avatar'],
    methods: {

		},
    data () {
      return {}
    },
    computed: {},
  }
</script>

<style lang="stylus" scoped>
li
	list-style: none
</style>
