import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Profile = () => {
	const [profile, setProfile] = useState({})
	const [redirect, setRedirect] = useState(false)

	const getLoginUser = async () => {
		try {
			const {data} = await axios.get('http://localhost:4000/api/users/profile')
			// console.log(data)
			setProfile(data)
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
			<p>name: {profile.name}</p>
			<p>email: {profile.email}</p>
		</div>
	)
}

export default Profile
