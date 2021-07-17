import React from 'react'
import Country from '../components/Country'
import {useParams} from 'react-router-dom'

const CountryPage = () => {
	const {countryName} = useParams()

	return <Country country={countryName} />
}

export default CountryPage
