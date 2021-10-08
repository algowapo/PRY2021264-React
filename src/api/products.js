import axios from 'axios'
import URL from './baseURL'

async function getProductsByUserId(userId) {
	try {
		return await axios.get(`${URL}/users/${userId}/products`)
	} catch (e) {
		return e
	}
}

export { getProductsByUserId }
