import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {Redirect} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const Question4 = () => {
	// import from useForm
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm()

	const [showPassword, setShowPassword] = useState(false)

	const [redirect, setRedirect] = useState(false)

	const submitCreateAccount = (formData) => {
		console.log(formData)
		axios
			.post('https://yuya-node-mysql.herokuapp.com/api/users', formData)
			.then(() => {
				setRedirect(true)
			})
			.catch((err) => {
				throw new Error(err)
			})
	}

	if (redirect) {
		return <Redirect to={'/login'} />
	}

	const errorMessage = {
		color: 'red',
	}

	return (
		<form onSubmit={handleSubmit(submitCreateAccount)}>
			<Grid container spacing={3} direction='column'>
				<Grid item>
					<TextField
						fullWidth
						placeholder='name'
						{...register('name', {required: true})}
					/>
					{errors.name && errors.name.type === 'required' && (
						<span style={errorMessage}>This is required</span>
					)}
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						placeholder='email'
						{...register('email', {
							required: 'required',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Entered value does not match email format',
							},
						})}
					/>
					{errors.email && errors.email.type === 'required' && (
						<span style={errorMessage}>This is required</span>
					)}
					{errors.email && errors.email.type === 'pattern' && (
						<span style={errorMessage}>{errors.email.message}</span>
					)}
				</Grid>

				<Grid item>
					<TextField
						fullWidth
						placeholder='password'
						type={showPassword ? 'text' : 'password'}
						{...register('password', {required: true})}
					/>
					{errors.password && errors.password.type === 'required' && (
						<span style={errorMessage}>This is required</span>
					)}
				</Grid>
				<Grid item>
					<label>show password</label>
					<input
						type='checkbox'
						onChange={() => {
							setShowPassword(!showPassword)
						}}
					/>
				</Grid>
			</Grid>
			<Button variant='contained' color='primary' type='submit'>
				create user account
			</Button>
		</form>
	)
}

export default Question4
