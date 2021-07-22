import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {setProfile} from '../redux/actions/setProfileAction'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Wrapper = (props) => {
	const [redirect, setRedirect] = useState(false)

	const getLoginUser = async () => {
		try {
			const {data} = await axios.get(
				'https://yuya-node-mysql.herokuapp.com/api/users/profile',
				{
					withCredentials: true,
				}
			)
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

	return <div>{props.children}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
