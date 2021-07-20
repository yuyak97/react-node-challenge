import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm()

	const [showPassword, setShowPassword] = useState(false)
	const [redirect, setRedirect] = useState(false)
	const [showLoginErr, setShowLoginErr] = useState(false)

	const submitLogin = (formData) => {
		// console.log(formData)
		axios
			.post('http://localhost:4000/api/users/login', formData)
			.then(() => {
				console.log('login success')
				setRedirect(!redirect)
			})
			.catch((err) => {
				console.log(err)
				setShowLoginErr(!showLoginErr)
			})
	}

	if (redirect) {
		return <Redirect to={'/profile'} />
	}

	const errorMessage = {
		color: 'red',
	}

	return (
		<form onSubmit={handleSubmit(submitLogin)}>
			<Grid container spacing={3} direction='column'>
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
			{showLoginErr && <p style={errorMessage}>Login failed</p>}
			<Button variant='contained' color='primary' type='submit'>
				login
			</Button>
		</form>
	)
}

export default Login
