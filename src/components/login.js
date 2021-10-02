import React from 'react'
import './login.scss'
import { useForm } from '../hooks/useForm'
import { validateEmail } from '../utils/validate'
import { login } from '../api/login'

const Login = () => {
	const [values, handleChange] = useForm({ email: '', password: '' })

	const onClickLogin = async () => {
		if (!validateEmail(values.email)) {
			alert('Wrong Email')
			return
		}
		let res = await login({
			username: values.email,
			password: values.password,
		})
		if (res.status === 200) {
			alert('Welcome')
			return
		}
		alert('Wrong username/password')
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
				<div className='form-row'>
					<input
						type='password'
						name='password'
						value={values.password}
						onChange={handleChange}
					/>
					<span>Password</span>
				</div>
				<div className='form-row'></div>
				<div className='form-row'>
					<button onClick={onClickLogin}>Login to your Account!</button>
				</div>
			</div>
		</div>
	)
}

export default Login
