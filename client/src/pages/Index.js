import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Index = (props) => {
	return (
		<>
			<h1>Page index</h1>
			<ul>
				<li>
					<Link to={'/question1'}>question1</Link>
				</li>
				<li>
					<Link to={'/question2'}>question2</Link>
				</li>
				<li>
					<Link to={'/question3'}>question3</Link>
				</li>

				<li>
					<Link to={'/question4'}>question4 (create new account): </Link>
				</li>
				<li>
					<Link to={'/login'}>question5 (login)</Link>
				</li>
				<li>
					<Link to={'/profile'}>
						profile page (You need to login to access)
					</Link>
				</li>
				<li>
					<Link to={'/slot'}>
						question6 (slot game page) (You need to login to access)
					</Link>
				</li>
			</ul>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
	}
}

export default connect(mapStateToProps)(Index)
