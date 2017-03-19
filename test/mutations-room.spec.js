import {expect} from 'chai'
import sinon from 'sinon'

import * as types from '../src/stores/mutation-types'
import {mutations} from '../src/stores'

describe('[mutations] chatroom', function () {
	describe('user mutations', function () {
		const state

		beforeEach(function () {
			state = {}
		})

		it('should be able to add a new user', () => {
			expect(state.users).to.have.lengthOf(0)
			mutations[types.NEW_CLIENT] (state, {id: 0})
			expect(state.users).to.have.lengthOf(1)
		})

		it('should update a user online status when changed', () => {
			state.users = [
				{
					id: 0,
					status: 'online'
				},
				{
					id: 1,
					status: 'busy'
				}
			]
			const payload = {
				id: 1,
				status: 'offline'
			}
			mutations[types.CHANGE_CHAT_STATUS] (state, payload)
			expect(state.users[1].status).to.equal('offline')
		})

		it('should update when a user is typing', () => {
			state.users = [
				{
					id: 0,
					isTyping: false
				},
				{
					id: 1,
					isTyping: false
				}
			]
			mutations[types.TYPING] (state, {id: 0})
			expect(state.users[0].isTyping).to.be(true)
		})

		it('should remove user when he/she leaves', () => {
			const user2 =  {id: 2}
			state.users = [{id: 0}, user, {id: 1}]
			mutations[types.LEAVE_CHAT] (state, {id: 2})
			expect(state.users).to.have.lengthOf(2)
			expect(user2).to.not.be.oneOf(state.users)
		})
	})

	describe('message mutations', function () {
		const state

		beforeEach(function () {
			state = {}
		})

		it('should be able to add a new message', () => {
			mutations[types.ADD_MESSAGE] (state, {id: 0, text: 'hello'})
			expect(state.messages).to.have.lengthOf(1)
			expect(state.messages[0].text).to.equal('hello')
		})

		it('should be able to edit/clear old message', () => {
			state.messages = [
				{
					id: 2,
					text: 'world'
				},
				{
					id: 1,
					text: 'hello'
				}
			]
			mutations[types.WITHDRAW_MESSAGE] (state, { id: 1 })
			expect(state.messages).to.have.lengthOf(1)
			mutations[types.EDIT_MESSAGE] (state, 2, {id: 2, text: 'bye'})
			expect(state.messages[0].text).to.equal('bye')
			mutations[types.EDIT_MESSAGE] (state, 1, {id: 1, text: 'say'})
			expect(state.messages).to.deep.equal({id: 2, text: 'bye'})
		})
	})
})
