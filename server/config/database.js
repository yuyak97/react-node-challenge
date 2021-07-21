const {createPool} = require('mysql2')
require('dotenv').config('../.env')

const pool = createPool({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'test',
	connectionLimit: 10,
})

module.exports = pool
