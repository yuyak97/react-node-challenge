import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button} from '@material-ui/core'

const Profile = () => {
	const [profile, setProfile] = useState({})

	const getLoginUser = async () => {
		try {
			const {data} = await axios.get(
				'http://localhost:4000/api/users/profile',
				{withCredentials: true}
			)
			// console.log(data)
			setProfile(data)
		} catch (e) {}
	}

	useEffect(() => {
		getLoginUser()
	}, [])

	return (
		<div>
			<h1>My profile</h1>
			<p>name: {profile.name}</p>
			<p>email: {profile.email}</p>
		</div>
	)
}

export default Profile
