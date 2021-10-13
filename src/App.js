import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddProduct from './components/addProduct/addProduct'
import AddMassiveProducts from './components/addMassiveProducts/addMassiveProducts'

import Login from './components/login/login'
import Register from './components/register/register'
import Products from './components/products/products'
import CreateProduct from './components/createProduct/createProduct'
import EditProduct from './components/editProduct/editProduct'
import EditAllProducts from './components/editAllProducts/editAllProducts'
import { useState } from 'react'
import EditSelectedProducts from './components/editSelectedProducts/editSelectedProducts'

function App() {
	const [productUpdateIndexes, setProductUpdateIndexes] = useState()
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/register'>
						<Register></Register>
					</Route>
					<Route path='/addProduct'>
						<AddProduct></AddProduct>
					</Route>
					<Route path='/addMassiveProducts/:id'>
						<AddMassiveProducts></AddMassiveProducts>
					</Route>
					<Route path='/products/:id'>
						<Products
							setProductUpdateIndexes={setProductUpdateIndexes}
						></Products>
					</Route>
					<Route path='/createProduct/:id'>
						<CreateProduct></CreateProduct>
					</Route>
					<Route path='/editProduct/:id/:productId'>
						<EditProduct></EditProduct>
					</Route>
					<Route path='/editAllProducts/:id/'>
						<EditAllProducts></EditAllProducts>
					</Route>
					<Route path='/editSelectedProducts/:id/'>
						<EditSelectedProducts
							productUpdateIndexes={productUpdateIndexes}
						></EditSelectedProducts>
					</Route>
					<Route path='/'>
						<Login></Login>
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
