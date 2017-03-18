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
// let numUsers = 0
let users = []

io.on('connection', socket => {
	console.log('new client!')
	let curUser

	// >sending
	socket.on('new message', msg => {
		// socket.emit('new message', msg)
		socket.broadcast.emit('new message', msg)
	})

	// >editing
	socket.on('edit message', (idx, msg) => {
		socket.broadcast.emit('edit message', idx, msg)
	})

	// >withdrawing
	socket.on('withdraw message', idx => {
		socket.broadcast.emit('withdraw message', idx)
	})

	// >joining
	socket.on('add user', user => {
		const {username} = user
		if (curUser) {
			return
		}

		users.push(user)
		curUser = user
		socket.emit('login', users, 'Welcome to this crappy chatroom ')
		socket.broadcast.emit('user joined', user)
	})

	// >typing
	socket.on('typing', username => {
		console.log('user typing')
		socket.broadcast.emit('typing', username)
	})

	socket.on('stop typing', username => {
		console.log('user stop typing')
		socket.broadcast.emit('stop typing', username)
	})

	// >updating status
	socket.on('update status', (username, status) => {
		socket.broadcast.emit('update status', username, status)
	})

	// >leaving
	socket.on('disconnect', () => {
		if (curUser) {
			users.splice(users.indexOf(curUser), 1)
			socket.broadcast.emit('user left', {
				username: socket.username
			})
		}
	})
})
