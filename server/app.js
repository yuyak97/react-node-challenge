require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')
const gameRouter = require('./routes/game')

// console.log(process.env.CLIENT_URL)

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(cookieParser())

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/game', gameRouter)

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log('server up and running on PORT :', port)
})
