const express = require('express')
const Router = express.Router()
const connection = require('../config/database')
const jsonwebtoken = require('jsonwebtoken')
const {hashSync, genSaltSync, compareSync} = require('bcrypt')

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
		(err, result, fields) => {
			if (err) {
				throw new Error(err)
			}
			if (!result) {
				throw new Error(err)
			}

			console.log(result)
			console.log(result[0].password)
			const passwordResult = compareSync(body.password, result[0].password)

			console.log({passwordResult})
			// console.log(passwordResult)
			if (passwordResult) {
				result.password = undefined
				const jwt = jsonwebtoken.sign(
					{email: req.body.email},
					process.env.SUPER_SECRET,
					{
						expiresIn: '1h',
					}
				)

				res.cookie('jwt', jwt, {sameSite: 'none', secure: true})
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
		res.status(403).send({
			success: false,
			msg: 'No token provided',
		})
	}

	const {email} = jsonwebtoken.verify(jwt, process.env.SUPER_SECRET)
	// console.log(email)
	connection.query(
		'SELECT name, email, coin FROM user WHERE email = ?',
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
