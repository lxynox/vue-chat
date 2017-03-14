'use strict'

const STORAGE_KEY = 'user-vuechat'

export default {
	fetch() {
		return JSON.parse(localStorage.getItem(STORAGE_KEY))
	},
	save(item) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(item))
		} catch (err) {
			console.error(err)
			return false
		}
		return true
	}
}
