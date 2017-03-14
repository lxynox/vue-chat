'use strict'

const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')

const port = process.env.PORT || 3000

server.listen(port, () => {
	console.log('Server listening at port %d', port)
})

// Routing
// app.use(express.static(__dirname + '/public'))

// Chatroom
let numUsers = 0

io.on('connection', socket => {
	let addedUser = false

	socket.on('new message', data => {
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		})
	})

	socket.on('add user', username => {
		if (addedUser) {
			return
		}

		socket.username = username
		++numUsers
		addedUser = true
		socket.emit('login', {
			numUsers
		})

		socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsers
		})
	})

	socket.on('typing', () => {
		socket.broadcast.emit('typing', {
			username: socket.username
		})
	})

	socket.on('stop typing', () => {
		socket.broadcast.emit('stop typing', {
			username: socket.username
		})
	})

	socket.on('disconnect', () => {
		if (addedUser) {
			--numUsers

			socket.broadcast.emit('user left', {
				username: socket.username,
				numUsers
			})
		}
	})
})
