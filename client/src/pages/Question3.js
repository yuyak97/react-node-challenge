import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const Question3 = () => {
	const [countryArr, setCountryArr] = useState([])
	const allCountryUrl = 'https://restcountries.eu/rest/v2/all'

	const [inputCountryName, setInputCountryName] = useState('')
	const [filteredCountryName, setFilteredCountryName] = useState(null)

	const getAllCountry = async () => {
		const {data} = await axios.get(allCountryUrl)
		setCountryArr(data)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log({inputCountryName})
		const filteredCountry = countryArr.find(
			(country) => country.name.toLowerCase() === inputCountryName.toLowerCase()
		)
		setFilteredCountryName(filteredCountry)
		// console.log(filteredCountry)
	}

	useEffect(() => {
		getAllCountry()
	})

	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					placeholder='Type country name!'
					label='country name'
					type='text'
					value={inputCountryName}
					onChange={(e) => setInputCountryName(e.target.value)}
				/>
				<Button variant='contained' color='primary' type='submit'>
					Search country information
				</Button>
			</form>
			{filteredCountryName ? (
				<ul>
					<li>
						<a href={`/country/${filteredCountryName.name}`}>
							{filteredCountryName.name}
						</a>
					</li>
				</ul>
			) : (
				<ul>
					{countryArr?.map((country) => (
						<li key={country.name}>
							<a href={`/country/${country.name}`}>{country.name}</a>
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default Question3
