import React, { useState, useEffect } from 'react'
import './editProduct.scss'
import { useForm } from '../../hooks/useForm'
import { validateProduct } from '../../utils/validate'
import { formatDate } from '../../utils/formatDate'
import { updateProduct } from '../../api/updateProduct'
import { getOneProduct } from '../../api/getOneProduct'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditProduct = () => {
	const [values, handleChange, setValues] = useForm({
		name: '',
		color: '',
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
	const { id, productId } = useParams()

	useEffect(() => {
		async function getProductDetails() {
			try {
				let productInfo = await getOneProduct(productId)
				if (productInfo.data) {
					let formattedDate = formatDate(productInfo.data.date)
					setValues({
						name: productInfo.data.name,
						color: productInfo.data.color,
						price: productInfo.data.price,
						date: formattedDate,
					})
				}
			} catch (e) {
				console.error(e)
			}
		}
		getProductDetails()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onClickCreate = async () => {
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
			let res = await updateProduct(
				{
					name: values.name,
					color: values.color,
					price: values.price,
					date: values.date,
				},
				productId
			)
			if (res.status === 200) {
				alert('Product updated successfully')
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
				<h2>Edit Product</h2>
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
					<button onClick={onClickCreate}>Update Product</button>
				</div>
				<div className='link-row'>
					<Link to={`/products/${id}`}>Back to My Products</Link>
				</div>
			</div>
		</div>
	)
}

export default EditProduct
