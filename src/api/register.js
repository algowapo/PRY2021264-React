import axios from 'axios'
import URL from './baseURL'

async function register(newUser) {
	try {
		return await axios.post(`${URL}/users`, newUser)
	} catch (e) {
		return e
	}
}

export { register }
