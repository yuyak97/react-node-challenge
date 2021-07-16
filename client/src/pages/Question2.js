import React from 'react'
import Country from '../components/Country'

const Question2 = () => {
	const countries = ['malta', 'france', 'swiss', 'germany']

	return (
		<>
			{countries.map((country) => (
				<Country country={country} />
			))}
		</>
	)
}

export default Question2
