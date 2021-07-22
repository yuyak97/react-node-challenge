import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import Wrapper from '../components/Wrapper'

const Profile = (props) => {
	const linkStyle = {
		color: 'white',
		textDecoration: 'none',
	}

	return (
		<Wrapper>
			<h1>My profile</h1>
			<p>name: {props?.profile?.name}</p>
			<p>email: {props?.profile?.email}</p>
			<p>coin: {props?.profile?.coin}</p>
			<Button variant='contained' color='primary'>
				<Link to={'/slot'} style={linkStyle}>
					Play slot machine!
				</Link>
			</Button>
		</Wrapper>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
	}
}

export default connect(mapStateToProps)(Profile)
