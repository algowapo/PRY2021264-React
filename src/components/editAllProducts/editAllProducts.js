import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { validateProduct } from '../../utils/validate'
import { editAllProducts } from '../../api/editAllProducts'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditAllProducts = () => {
	const [values, handleChange, setValues] = useForm({
		name: '',
		color: 'Red',
		price: '',
		date: '',
	})
	const [colors] = useState([
		'Red',
		'Blue',
		'Green',
		'Yellow',
		'Pink',
		'Black',
		'White',
	])
	const [nameValidation, setNameValidation] = useState('')
	const [colorValidation, setColorValidation] = useState('')
	const [priceValidation, setPriceValidation] = useState('')
	const [dateValidation, setDateValidation] = useState('')
	const history = useHistory()
	const { id } = useParams()

	const onClickEdit = async () => {
		setNameValidation('')
		setColorValidation('')
		setPriceValidation('')
		setDateValidation('')

		let newProduct = {
			name: values.name,
			price: values.price,
			color: values.color,
			date: values.date,
		}
		if (validateProduct(newProduct)) {
			let res = await editAllProducts(
				{
					name: values.name,
					color: values.color,
					price: values.price,
					date: values.date,
				},
				id
			)
			if (res.status === 200) {
				history.push(`/products/${id}`)
				return
			}
			if (res.message === 'Request failed with status code 400') {
				setColorValidation('There is a problem with the format')
				return
			}
			if (res.message === 'Network Error') {
				setColorValidation('Error in the server, try again later')
				return
			}
			setNameValidation('Wrong format for the product')
			return
		} else {
			setNameValidation('Only letters are accepted for the name')
		}
	}

	return (
		<div className='contact-wrapper'>
			<header className='login-cta'>
				<h2>Edit all Products</h2>
			</header>
			<div className='login-form'>
				<div className='form-row'>
					<input
						type='text'
						name='name'
						value={values.name}
						onChange={handleChange}
					/>
					<span>Name</span>
				</div>
				<div className='warning-row'>
					<span>{nameValidation}</span>
				</div>
				<div className='form-row'>
					<select
						value={values.color}
						onChange={(e) => {
							setValues({
								...values,
								color: e.target.value,
							})
						}}
					>
						{colors.map((x, y) => (
							<option key={y}>{x}</option>
						))}
					</select>
					<span>Color</span>
				</div>
				<div className='warning-row'>
					<span>{colorValidation}</span>
				</div>
				<div className='form-row'>
					<input
						type='number'
						name='price'
						value={values.price}
						onChange={handleChange}
					/>
					<span>Price</span>
				</div>
				<div className='warning-row'>
					<span>{priceValidation}</span>
				</div>
				<div className='form-row'>
					<input
						type='date'
						name='date'
						value={values.date}
						onChange={handleChange}
					/>
					<span>Date</span>
				</div>
				<div className='warning-row'>
					<span>{dateValidation}</span>
				</div>
				<div className='form-row'>
					<button onClick={onClickEdit}>Edit All Products</button>
				</div>
				<div className='link-row'>
					<Link to={`/products/${id}`}>Back to My Products</Link>
				</div>
			</div>
		</div>
	)
}

export default EditAllProducts
