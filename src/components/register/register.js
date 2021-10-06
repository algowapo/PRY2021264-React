import React, { useState } from 'react'
import './register.scss'
import { useForm } from '../../hooks/useForm'
import { validateEmail, validatePassword } from '../../utils/validate'
import { register } from '../../api/register'

const Register = () => {
	const [values, handleChange] = useForm({ email: '', password: '' })
	const [emailValidation, setEmailValidation] = useState('')
	const [passwordValidation, setPasswordValidation] = useState('')

	const onClickRegister = async () => {
		setEmailValidation('')
		setPasswordValidation('')
		if (!validateEmail(values.email)) {
			setEmailValidation('Please enter a valid email')
			return
		}
		if (!validatePassword(values.password)) {
			setPasswordValidation(
				'Please enter a password that contains at least eight characters, one letter, one number, and one special character'
			)
			return
		}
		let res = await register({
			username: values.email,
			password: values.password,
		})
		if (res.message === 'Network Error') {
			setPasswordValidation('Error in the server, try again later')
			return
		}
		if (res.message === 'Request failed with status code 403') {
			setEmailValidation('Username is already taken')
			return
		}
		if (res.status === 201) {
			alert('User created')
			return
		}
	}

	return (
		<div className='contact-wrapper'>
			<header className='login-cta'>
				<h2>Create Account</h2>
			</header>
			<div className='login-form'>
				<div className='form-row'>
					<input
						type='email'
						name='email'
						value={values.email}
						onChange={handleChange}
					/>
					<span>Username or Email</span>
				</div>
				<div className='warning-row'>
					<span>{emailValidation}</span>
				</div>
				<div className='form-row'>
					<input
						type='password'
						name='password'
						value={values.password}
						onChange={handleChange}
					/>
					<span>Password</span>
				</div>
				<div className='warning-row'>
					<span>{passwordValidation}</span>
				</div>
				<div className='form-row'>
					<button onClick={onClickRegister}>Create an account!</button>
				</div>
			</div>
		</div>
	)
}

export default Register
