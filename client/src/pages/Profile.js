import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {setProfile} from '../redux/actions/setProfileAction'

const Profile = (props) => {
	const [redirect, setRedirect] = useState(false)

	const getLoginUser = async () => {
		try {
			const {data} = await axios.get(
				'https://yuya-node-mysql.herokuapp.com/api/users/profile',
				{withCredentials: true}
			)
			// console.log(data)
			props.setProfile(data)
		} catch (err) {
			console.log(err)
			setRedirect(!redirect)
		}
	}

	const linkStyle = {
		color: 'white',
		textDecoration: 'none',
	}

	useEffect(() => {
		getLoginUser()
	}, [])

	if (redirect) {
		return <Redirect to={'/login'} />
	}

	return (
		<div>
			<h1>My profile</h1>
			<p>name: {props?.profile?.name}</p>
			<p>email: {props?.profile?.email}</p>
			<p>coin: {props?.profile?.coin}</p>
			<Button variant='contained' color='primary'>
				<Link to={'/slot'} style={linkStyle}>
					Play slot machine!
				</Link>
			</Button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setProfile: (profile) => dispatch(setProfile(profile)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
