'use strict'

const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000

server.listen(port, () => {
	console.log('Server listening at port %d', port)
})

// Routing
// app.use(express.static(__dirname + '/public'))

// Chatroom
let uIDs = 0
let	mIDs = 0

const users = []
const messages = []

io.on('connection', socket => {
	// console.log('new client!')
	let curUser

	// ---Users---
	// >login
	socket.on('login', user => {
		user.id = uIDs++
		socket.emit('logged in', user)
	})

	// >joining
	socket.on('add user', user => {
		if (curUser) {
			return
		}
		curUser = user
		users.push(user)
		socket.emit('join chat', users)
		socket.broadcast.emit('new client', curUser)
	})

	// >typing
	socket.on('typing', () => {
		// console.log('user typing')
		socket.broadcast.emit('typing', curUser.id)
	})

	socket.on('stop typing', () => {
		// console.log('user stop typing')
		socket.broadcast.emit('stop typing', curUser.id)
	})

	// >updating status
	socket.on('update status', status => {
		socket.broadcast.emit('update status', curUser.id, status)
	})

	// >leaving
	socket.on('disconnect', () => {
		if (curUser) {
			users.splice(users.indexOf(curUser), 1)
			socket.broadcast.emit('user left', curUser.id)
		}
	})

	// ---MSGs---
	// >sending
	socket.on('new message', msg => {
		msg.id = mIDs++
		messages.push(msg)
		socket.broadcast.emit('new message', msg)
	})

	// >editing
	socket.on('edit message', (mID, msg) => {
		socket.broadcast.emit('edit message', mID, msg)
	})

	// >withdrawing
	socket.on('withdraw message', mID => {
		socket.broadcast.emit('withdraw message', mID)
	})
})
