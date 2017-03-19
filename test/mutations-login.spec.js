import {expect} from 'chai'
import sinon from 'sinon'

import {LOGIN} from '../src/stores/mutation-types'
import {mutations} from '../src/stores'

describe('[mutations] login', function () {
	it('should allow returning user enter the chatroom directly', () => {
		// mock stores
		const store = {
			curPage: 'login',
			curUser: { name: 'lee', id: 0 }
		}

		const spy = sinon.spy()
		const save = spy
		mutations[LOGIN](store, {})

		expect(spy.called).to.be(false)
		expect(store.curPage).to.equal('room')
	})

	it('should save the first-time user profile into localStorage before entering chatroom', () => {
		const store = {
			curPage: 'login',
			curUser: undefined
		}
		const payload = {
			user: {
				id: 0,
				name: 'lee'
			}
		}

		const spy = sinon.spy()
		const save = spy
		mutations[LOGIN](store, payload)

		expect(spy.calledOnce).to.be(true)
		expect(store.curPage).to.equal('room')
	})
})
