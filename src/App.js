import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/login/login'
import Register from './components/register/register'

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/register'>
						<Register></Register>
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
