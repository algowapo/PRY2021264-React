import axios from 'axios'
import URL from './baseURL'

async function deleteAllProducts(userId) {
	try {
		return await axios.delete(`${URL}/users/${userId}/products`)
	} catch (e) {
		return e
	}
}

export { deleteAllProducts }
