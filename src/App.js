import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddProduct from './components/addProduct/addProduct'
import AddMassiveProducts from './components/addMassiveProducts/addMassiveProducts'

import Login from './components/login/login'
import Register from './components/register/register'
import Products from './components/products/products'
import CreateProduct from './components/createProduct/createProduct'
import EditProduct from './components/editProduct/editProduct'
import EditAllProducts from './components/editAllProducts/editAllProducts'

function App() {
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
						<Products></Products>
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
					<Route path='/'>
						<Login></Login>
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
