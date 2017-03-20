import { expect } from 'chai'
import sinon from 'sinon'

import Vue from 'vue'
import LoginPage from '../../src/views/user-login.vue'

describe('Login Page', function () {
	let Ctor = Vue.extend(LoginPage)
	let vm

	describe('[new user]', function () {
		before(function () {
			vm = new Ctor({
				propsData: {
					curUser: null
				}
			}).$mount()
		})

		it('should disable the enter button at beginning', function () {
			const enterBtn = vm.$el.querySelector('.enter button')
			expect(enterBtn.disabled).to.be(true)
		})

		it('should enable the enter button once user types their name', function () {
			const enterBtn = vm.$el.querySelector('.enter button')
			vm.name = 'lee'
			vm.$nextTick(function () {
				expect(enterBtn.disabled).to.be(false)
			})
		})

		it('should emit an socket event when user pressed enter button', function () {
			const enterBtn = vm.$el.querySelector('.enter button')
			const spy = sinon.spy()
			vm.$socekt.emit = spy
			enterBtn.click()
			expect(spy.calledOnce).to.be(true)
		})
	})

	describe('[returning user]', function () {
		before(function () {
			vm = new Ctor({
				propsData: {
					curUser: 'lee'
				}
			}).$mount()
		})

		it('should enable the enter button with user info displayed', function () {
			const enterBtn = vm.$el.querySelector('.enter button')
			expect(enterBtn.disabled).to.be(false)
		})
	})
})
