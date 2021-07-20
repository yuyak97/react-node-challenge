require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./routes/user')

app.use(cors())

app.use(express.json())

app.use('/api/users', userRouter)

const port = process.env.APP_PORT || 5000

app.listen(port, () => {
	console.log('server up and running on PORT :', port)
})
