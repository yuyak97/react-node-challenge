import React, {useState} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Slot = (props) => {
	const [value, setValue] = useState({})
	const [redirect, setRedirect] = useState(false)

	const startGame = async () => {
		try {
			const {data} = await axios.get(
				'https://yuya-node-mysql.herokuapp.com/api/game',
				{
					withCredentials: true,
				}
			)
			// console.log(data)

			const renderArr = []

			data.result.map((fruit) => {
				switch (fruit) {
					case 'cherry':
						return renderArr.push(`🍒${fruit}`)
					case 'apple':
						return renderArr.push(`🍎${fruit}`)
					case 'lemon':
						return renderArr.push(`🍋${fruit}`)
					case 'banana':
						return renderArr.push(`🍌${fruit}`)
					default:
						return renderArr.push(fruit)
				}
				// console.log(data.result)
			})
			data.renderArr = renderArr

			// console.log(data)
			setValue(data)
		} catch (err) {
			setRedirect(!redirect)
		}
	}

	if (redirect) {
		return <Redirect to={'/login'} />
	}

	// console.log(props)

	return (
		<div>
			<h1>Slot</h1>
			<p>Player: {props?.profile?.name}</p>
			<Button onClick={startGame} variant='contained' color='primary'>
				Start slot
			</Button>
			<p>One play one coin</p>
			<h2>RESULT</h2>
			<ul>
				{value?.renderArr?.map((fruit, i) => (
					<li key={i}>{fruit}</li>
				))}
			</ul>
			<p>COINS YOU GET: {value?.wonCoin} </p>
			<p>YOUR COIN: {value?.totalUserCoin}</p>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
	}
}
export default connect(mapStateToProps)(Slot)
