import axios from 'axios'
import URL from './baseURL'

async function login(credentials) {
	try {
		return await axios.post(`${URL}/login`, credentials)
	} catch (e) {
		return e
	}
}

export { login }
