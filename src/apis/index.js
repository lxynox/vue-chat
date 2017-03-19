'use strict'

const STORAGE_KEY = 'user-vuechat'

export function clear() {
	localStorage.clear()
}

export function fetch() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

export function save(item) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(item))
	} catch (err) {
		console.error(err)
		return false
	}
	return true
}
