import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setProfile} from '../redux/actions/setProfileAction'

const Profile = (props) => {
	const [redirect, setRedirect] = useState(false)

	const [profile, setProfile] = useState({})

	const getLoginUser = async () => {
		try {
			const {data} = await axios.get('http://localhost:4000/api/users/profile')
			// console.log(data)
			props.setProfile(data)
		} catch (err) {
			console.log(err)
			setRedirect(!redirect)
		}
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
			<p>name: {props.profile.name}</p>
			<p>email: {props.profile.email}</p>
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
