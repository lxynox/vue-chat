// underscore version debounce

export default function (fn, wait, immediate) {
	let timeout

	return function () {
		const ctx = this
		const args = arguments
		const callNow = !timeout && immediate

		function later() {
			timeout = null
			if (!immediate) {
				fn.apply(ctx, args)
			}
		}

		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) {
			fn.apply(ctx, args)
		}
	}
}
