import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {useForm} from 'react-hook-form'

const Question4 = () => {
	// import from useForm
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm()

	const [showPassword, setShowPassword] = useState(false)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const formStyle = {
		display: 'flex',
		flexDirection: 'column',
	}

	const errorMessage = {
		color: 'red',
	}

	const submitCreateAccount = (e) => {
		// e.preventDefault()
		console.log('aaaa')
	}

	return (
		<form style={formStyle} onSubmit={handleSubmit(submitCreateAccount)}>
			<h1>create user account</h1>
			<div>
				<TextField placeholder='name' {...register('name', {required: true})} />
				{errors.name && errors.name.type === 'required' && (
					<span style={errorMessage}>This is required</span>
				)}
			</div>
			<div>
				<TextField
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
			</div>
			<div>
				<TextField
					placeholder='password'
					type={showPassword ? 'text' : 'password'}
					{...register('password', {password: true})}
				/>
				{errors.password && errors.password.type === 'required' && (
					<span style={errorMessage}>This is required</span>
				)}
			</div>
			<input
				type='checkbox'
				onChange={() => {
					setShowPassword(!showPassword)
				}}
			/>
			<Button variant='contained' color='primary' type='submit'>
				create user account
			</Button>
		</form>
	)
}

export default Question4
