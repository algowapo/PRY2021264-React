import React, { useState } from 'react'
import './login.scss'
import { useForm } from '../../hooks/useForm'
import { validateEmail } from '../../utils/validate'
import { login } from '../../api/login'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Login = () => {
	const [values, handleChange] = useForm({ email: '', password: '' })
	const [emailValidation, setEmailValidation] = useState('')
	const [passwordValidation, setPasswordValidation] = useState('')
	const history = useHistory()

	const onClickLogin = async () => {
		setEmailValidation('')
		setPasswordValidation('')
		if (!validateEmail(values.email)) {
			setEmailValidation('Please enter a valid email')
			return
		}
		let res = await login({
			username: values.email,
			password: values.password,
		})
		if (res.status === 200) {
			history.push(`/products/${res.data._id}`)
			return
		}
		if (res.message === 'Network Error') {
			setPasswordValidation('Error in the server, try again later')
			return
		}
		setPasswordValidation('Wrong username or password')
	}

	return (
		<div className='contact-wrapper'>
			<header className='login-cta'>
				<h2>Account Login</h2>
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
					<button onClick={onClickLogin}>Login to your Account!</button>
				</div>
				<div className='link-row'>
					<Link to='register'>Create an account</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
