import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsByUserId } from '../../api/products'
import { deleteAllProducts } from '../../api/deleteAllProducts'
import { deleteSingleProduct } from '../../api/deleteSingleProduct'
import { formatDate } from '../../utils/formatDate'
import MaterialTable from 'material-table'
import { useHistory, useLocation } from 'react-router-dom'
import './products.scss'

const Products = ({ setProductUpdateIndexes }) => {
	const [products, setProducts] = useState()
	const history = useHistory()
	const location = useLocation()
	const { id } = useParams()

	async function getProductsFromAPI() {
		try {
			let productsResponse = await getProductsByUserId(id)
			if (productsResponse.data.products) {
				const newProducts = productsResponse.data.products.map((p) => ({
					...p,
					date: formatDate(p.date),
					selected: false,
				}))
				setProducts(newProducts)
			}
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		async function getProductsFromAPI() {
			try {
				let productsResponse = await getProductsByUserId(id)
				if (productsResponse.data.products) {
					const newProducts = productsResponse.data.products.map((p) => ({
						...p,
						date: formatDate(p.date),
						selected: false,
					}))
					setProducts(newProducts)
				}
			} catch (e) {
				console.error(e)
			}
		}
		getProductsFromAPI()
	}, [id])

	useEffect(() => {
		async function getProductsFromAPI() {
			try {
				let productsResponse = await getProductsByUserId(id)
				if (productsResponse.data.products) {
					const newProducts = productsResponse.data.products.map((p) => ({
						...p,
						date: formatDate(p.date),
						selected: false,
					}))
					setProducts(newProducts)
				}
			} catch (e) {
				console.error(e)
			}
		}
		getProductsFromAPI()
	}, [location, id])

	return (
		<div className='products-list'>
			<nav className='navbar navbar-expand-xl navbar-dark bg-dark text-light'>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item active'>
							<button
								onClick={() => {
									history.push(`/addMassiveProducts/${id}`)
								}}
							>
								Import Massive
							</button>
						</li>
						<li className='nav-item'>
							<button
								onClick={() => {
									history.push(`/createProduct/${id}`)
								}}
							>
								Create Product
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									deleteAllProducts(id).then(() => {
										getProductsFromAPI()
									})
								}}
							>
								Delete All
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									let selectedProducts = products.filter(
										(p) => p.selected === true
									)
									for (let i = 0; i < selectedProducts.length; i++) {
										deleteSingleProduct(id, selectedProducts[i]._id).then(
											() => {
												getProductsFromAPI()
											}
										)
									}
									if (selectedProducts.length <= 0) {
										alert('Select at least 1 product')
									}
								}}
							>
								Delete Selected
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									history.push(`/editAllProducts/${id}`)
								}}
							>
								Update All Products
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									let selectedProducts = products.filter(
										(p) => p.selected === true
									)
									let indexesArray = []
									for (let i = 0; i < selectedProducts.length; i++) {
										indexesArray.push(selectedProducts[i]._id)
									}
									setProductUpdateIndexes(indexesArray)
									if (selectedProducts.length > 0) {
										history.push(`/editSelectedProducts/${id}`)
									} else {
										alert('Select at least 1 product')
									}
								}}
							>
								Update Selected Products
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									history.push(`/`)
								}}
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</nav>
			<header className='products-cta'>
				<h2>My Products list</h2>
			</header>
			<div className='table-container'>
				<MaterialTable
					title='All my Products'
					columns={[
						// { title: 'Id', field: '_id' },
						{ title: 'Name', field: 'name' },
						{ title: 'Price', field: 'price', type: 'numeric' },
						{ title: 'Color', field: 'color' },
						{ title: 'Date', field: 'date' },
					]}
					data={products}
					actions={[
						{
							icon: 'edit',
							tooltip: 'Edit Product',
							onClick: (event, rowData) => {
								history.push(`/editProduct/${id}/${rowData._id}`)
							},
						},
						(rowData) => {
							let active = rowData.selected
							return {
								icon: !active ? 'check_box_outline_blank' : 'check_box',
								tooltip: 'Select product',
								onClick: (event, rowData) => {
									const newProducts = products.map((p) =>
										p._id === rowData._id ? { ...p, selected: !p.selected } : p
									)
									setProducts(newProducts)
								},
							}
						},
						{
							icon: 'delete',
							tooltip: 'Delete product',
							onClick: (event, rowData) => {
								deleteSingleProduct(id, rowData._id).then(() => {
									getProductsFromAPI()
								})
							},
						},
					]}
					options={{
						actionsColumnIndex: -1,
						exportButton: true,
					}}
				/>
			</div>
		</div>
	)
}

export default Products
