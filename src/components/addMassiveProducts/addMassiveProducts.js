import React, { useState, useEffect } from 'react'
import './addMassiveProducts.scss'
import readXlsxFile from 'read-excel-file'

import { validateProduct } from '../../utils/validate'
import { massiveProducts } from '../../api/massiveProducts'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'

const AddMassiveProducts = () => {
	const [excel, setExcel] = useState(null)
	const [formatedExcel, setFormatedExcel] = useState(null)
	const [fileFormatValidation, setFileFormatValidation] = useState('')
	const [loadingFile, setLoadingFile] = useState(false)
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const history = useHistory()
	const { id } = useParams()

	const onClickLoadProducts = async () => {
		await loadProducts()
	}

	const loadProducts = async () => {
		setLoadingFile(true)
		setFileFormatValidation('')
		let excelArray = []
		try {
			readXlsxFile(excel)
				.then((rows) => {
					excelArray = rows
				})
				.then(() => {
					setFormatedExcel(excelArray)
				})
				.then(() => {
					setLoadingFile(false)
				})
		} catch (e) {
			setFileFormatValidation('Invalid file format')
			await setFormatedExcel(null)
			setLoadingFile(false)
			alert('error')
		}
	}

	const onChangeExcel = async (e) => {
		setLoadingFile(true)
		setFileFormatValidation('')
		try {
			setExcel(e.target.files[0])
		} catch (e) {
			console.error(e)
		}
	}

	const validateFileExtension = (string) => {
		if (string.split('.')[1] === 'xlsx') {
			return true
		} else {
			return false
		}
	}

	useEffect(() => {
		if (excel) {
			setLoadingFile(false)
			if (validateFileExtension(excel.name)) {
				setFileFormatValidation('')
				setButtonDisabled(false)
			} else {
				setFileFormatValidation('Invalid file format')
				setButtonDisabled(true)
			}
		}
		return () => {}
	}, [excel])

	useEffect(() => {
		const sendProducts = async (productsArray, id) => {
			console.log(productsArray)
			let res = await massiveProducts(productsArray, id)
			console.log(res)
			history.push(`/products/${id}`)
		}
		if (formatedExcel) {
			let productsArray = []
			let errorProductsArray = []
			let product, name, price, color, date
			let formatedProduct
			for (let i = 1; i < formatedExcel.length; i++) {
				product = formatedExcel[i]
				name = product[0]
				price = product[1]
				color = product[2]
				date = product[3]
				formatedProduct = {
					name: name,
					price: price,
					color: color,
					date: date,
				}
				if (validateProduct(formatedProduct)) {
					productsArray.push(formatedProduct)
				} else {
					errorProductsArray.push(formatedProduct)
				}
			}
			sendProducts(productsArray, id)
		}
		return () => {}
	}, [formatedExcel, id, history])

	return (
		<div className='contact-wrapper'>
			<header className='login-cta'>
				<h2>Import an Excel file</h2>
			</header>
			<div className='login-form'>
				<input type='file' onChange={onChangeExcel} id='input' />
				<div className='warning-row'>
					<span>{fileFormatValidation}</span>
				</div>
				<div className='form-row'>
					{!buttonDisabled && !loadingFile && (
						<button onClick={onClickLoadProducts}>Load products</button>
					)}
					{buttonDisabled && (
						<button
							onClick={onClickLoadProducts}
							disabled={buttonDisabled}
							className='button-disabled'
						>
							Load products
						</button>
					)}
					{loadingFile && <div className='lds-dual-ring'></div>}
				</div>
				<div className='link-row'>
					<Link to={`/products/${id}`}>Back to My Products</Link>
				</div>
			</div>
		</div>
	)
}

export default AddMassiveProducts
