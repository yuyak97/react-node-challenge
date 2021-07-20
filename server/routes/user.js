const express = require('express')
const Router = express.Router()
const connection = require('../config/database')
const jsonwebtoken = require('jsonwebtoken')
const {hashSync, genSaltSync} = require('bcrypt')

const bcrypt = require('bcrypt')

// get all users
Router.get('/', (req, res) => {
	connection.query('SELECT * FROM user', (err, result, fields) => {
		if (err) {
			console.log(err)
			throw err
		}
		res.send(result)
	})
})

// create a new account
Router.post('/', (req, res) => {
	const body = req.body
	const salt = genSaltSync(10)
	body.password = hashSync(body.password, salt)

	connection.query(
		'INSERT INTO user (name, email, password) values (?, ?, ?)',
		[body.name, body.email, body.password],
		(err, result, fields) => {
			if (err) {
				res.send(err)
				throw err
			}
			res.json(result)
		}
	)
})

// login
Router.post('/login', (req, res) => {
	const body = req.body
	// console.log({body})
	connection.query(
		'SELECT * FROM user WHERE email = ?',
		[body.email],
		async (err, result, fields) => {
			if (err) {
				throw new Error(err)
			}
			if (!result) {
				throw new Error(err)
			}

			// console.log(result)
			// console.log(result[0].password)
			const passwordResult = await bcrypt.compare(
				body.password,
				result[0].password
			)
			// console.log(passwordResult)
			if (passwordResult) {
				result.password = undefined
				const jwt = jsonwebtoken.sign({email: req.body.email}, 'shhhhh', {
					expiresIn: '1h',
				})

				res.cookie('jwt', jwt)
				return res.send(jwt)
			} else {
				return res.json({
					success: 0,
					data: 'Invalid email or password',
				})
			}
		}
	)
})

// Get login user
Router.get('/profile', (req, res) => {
	const {jwt} = req.cookies

	if (!jwt) {
		throw new Error()
	}

	const {email} = jsonwebtoken.verify(jwt, 'shhhhh')
	// console.log(email)
	connection.query(
		'SELECT name, email FROM user WHERE email = ?',
		[email],
		(err, result, fields) => {
			if (err) {
				throw new Error(err)
			}

			res.json(result[0])
		}
	)
})

module.exports = Router
