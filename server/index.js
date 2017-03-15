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

io.on('connection', socket => {
	console.log('new client!')
	let addedUser = false

	// >sending
	socket.on('new message', msg => {
		// socket.emit('new message', msg)
		socket.broadcast.emit('new message', msg)
	})

	// >joining
	socket.on('add user', user => {
		const {username} = user
		if (addedUser) {
			return
		}

		socket.username = username
		addedUser = true
		socket.emit('login', 'Welcome to this crappy chatroom ')
		socket.broadcast.emit('user joined', user)
	})

	// >typing
	socket.on('typing', username => {
		console.log('user typing');
		socket.broadcast.emit('typing', username)
	})

	socket.on('stop typing', username => {
		console.log('user stop typing');
		socket.broadcast.emit('stop typing', username)
	})

	// >leaving
	socket.on('disconnect', () => {
		if (addedUser) {
			socket.broadcast.emit('user left', {
				username: socket.username,
			})
		}
	})
})
