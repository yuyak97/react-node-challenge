import React from 'react'
import Country from '../components/Country'

const Question2 = () => {
	const countryNames = ['malta', 'france', 'swiss', 'germany']

	return (
		<>
			{countryNames.map((country) => (
				<Country country={country} key={country} />
			))}
		</>
	)
}

export default Question2
