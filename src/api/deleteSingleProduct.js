import axios from 'axios'
import URL from './baseURL'

async function deleteSingleProduct(userId, productId) {
	try {
		return await axios.delete(`${URL}/users/${userId}/products/${productId}`)
	} catch (e) {
		return e
	}
}

export { deleteSingleProduct }
