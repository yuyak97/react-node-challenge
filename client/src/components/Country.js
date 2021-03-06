import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'

const Country = ({country}) => {
	// url of searching bt country name. It can be the native name or partial name
	const baseUrl = 'https://restcountries.eu/rest/v2/name/'
	const [countryData, setCountryData] = useState({})

	const getCountry = async () => {
		const {data} = await axios.get(`${baseUrl}${country}`)
		setCountryData(data)
	}

	useEffect(() => {
		getCountry()
	}, [])

	// style of a country flag
	const style = {
		width: 100,
		border: '1px solid black',
	}

	return (
		<div>
			<h1>Country: {countryData[0]?.name}</h1>
			<img src={countryData[0]?.flag} style={style} alt='flag' />
			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Native name</TableCell>
							<TableCell>{countryData[0]?.nativeName}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Capital</TableCell>
							<TableCell>{countryData[0]?.capital}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Subregion</TableCell>
							<TableCell>{countryData[0]?.subregion}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Language</TableCell>
							<TableCell>
								<ul>
									{countryData[0]?.languages?.map((language) => {
										return <li key={language.iso639_1}>{language.name}</li>
									})}
								</ul>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Currencies</TableCell>
							<TableCell>
								<ul>
									{countryData[0]?.currencies?.map((currency) => {
										return <li key={currency.code}>{currency.name}</li>
									})}
								</ul>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Country
