const express = require('express')
const Router = express.Router()
const connection = require('../config/database')
const jsonwebtoken = require('jsonwebtoken')

Router.get('/', (req, res) => {
	const {jwt} = req.cookies
	const {email} = jsonwebtoken.verify(jwt, 'shhhhh')

	if (!jwt) {
		res.status(403).send({
			success: false,
			msg: 'No token provided',
		})
	}

	const fruitsArr = ['cherry', 'lemon', 'apple', 'banana']
	const reel1 = [
		'cherry',
		'lemon',
		'apple',
		'lemon',
		'banana',
		'banana',
		'lemon',
		'lemon',
	]
	const reel2 = [
		'lemon',
		'apple',
		'lemon',
		'lemon',
		'cherry',
		'apple',
		'banana',
		'lemon',
	]
	const reel3 = [
		'lemon',
		'apple',
		'lemon',
		'apple',
		'cherry',
		'lemon',
		'banana',
		'lemon',
	]

	async function execute() {
		let userCoin = await getUserCoin(email)
		// console.log(userCoin)
		// let userCoin = 20
		let coinForOneGame = 1

		userCoin -= coinForOneGame

		const reelsResult = getSpinResult()
		// console.log({reelsResult})

		// const reelsResult = ['apple', 'apple', 'cherry']
		// const reelsResult = ['apple', 'cherry', 'apple']
		// const reelsResult = ['banana', 'banana', 'lemon']
		// const reelsResult = ['apple', 'cherry', 'apple']
		// const reelsResult = ['apple', 'apple', 'apple']
		// const reelsResult = ['banana', 'banana', 'banana']
		// const reelsResult = ['lemon', 'lemon', 'lemon']
		// const reelsResult = ['cherry', 'cherry', 'cherry']

		const fruitsNum = calFruitNum(reelsResult)
		const twoFruits = checkTwoFruits(fruitsNum, reelsResult)
		let wonCoin = 0

		// console.log({fruitNum})
		// console.log({twoFruits})

		if (fruitsNum.cherry === 3) {
			wonCoin = 50
			userCoin += wonCoin
		} else if (fruitsNum.apple === 3) {
			wonCoin = 20
			userCoin += wonCoin
		} else if (fruitsNum.banana === 3) {
			wonCoin = 15
			userCoin += wonCoin
		} else if (fruitsNum.lemon === 3) {
			wonCoin = 3
			userCoin += wonCoin
		} else if (twoFruits.cherry) {
			wonCoin = 40
			userCoin += wonCoin
		} else if (twoFruits.apple) {
			wonCoin = 10
			userCoin += wonCoin
		} else if (twoFruits.banana) {
			wonCoin = 5
			userCoin += wonCoin
		} else {
			userCoin += 0
		}

		// console.log({userCoin})
		updateUserCoin(email, userCoin)

		res.json({
			result: reelsResult,
			wonCoin: wonCoin,
			totalUserCoin: userCoin,
		})
	}

	function getUserCoin(email) {
		return new Promise((resolve, reject) => {
			connection.query(
				'SELECT coin FROM user WHERE email = ?',
				[email],
				(err, result, fields) => {
					if (err) {
						throw new Error(err)
					}

					resolve(result[0].coin)
				}
			)
		})
	}

	function updateUserCoin(email, userCoin) {
		if (email) {
			connection.query(
				'UPDATE user SET coin= ? WHERE email = ?',
				[userCoin, email],
				(err, result, fields) => {
					if (err) {
						throw new Error(err)
					}
				}
			)
		}
	}

	function getSpinResult() {
		const reelsResult = []

		const reel1Result = reel1[Math.floor(Math.random() * reel1.length)]
		const reel2Result = reel2[Math.floor(Math.random() * reel2.length)]
		const reel3Result = reel3[Math.floor(Math.random() * reel3.length)]

		return [reel1Result, reel2Result, reel3Result, ...reelsResult]
	}

	// check the number of each fruit in one spin
	function calFruitNum(reelsResult) {
		// const fruitsArr = ['cherry', 'lemon', 'apple', 'banana']
		// object of number of each fruit. We will return this object at the end of this function
		let fruitsNum = {}

		fruitsArr.map((fruit) => {
			let fruitNum = reelsResult.filter((reel) => {
				return reel == fruit
			}).length
			// console.log(fruitNum)

			fruitsNum[fruit] = fruitNum
		})

		// console.log({fruitsNum})
		return fruitsNum
	}

	// check if 2 fruits is in row
	function checkTwoFruits(fruitsNum, reelsResult) {
		// console.log({fruitsNum})
		let twoFruits = {}

		for (let fruit in fruitsNum) {
			if (fruitsNum[fruit] == 2) {
				let p = 0
				const result = reelsResult.some(
					(x, i, a) => (p = i > 0 && x === a[i - 1] ? p + 1 : 1) >= 2
				)
				twoFruits[fruit] = result
			} else {
				twoFruits[fruit] = false
			}
		}

		return twoFruits
	}

	execute()
})

module.exports = Router
