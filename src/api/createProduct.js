import axios from 'axios'
import URL from './baseURL'

async function createProduct(newProductInfo, userId) {
	try {
		return await axios.post(`${URL}/users/${userId}/products/`, newProductInfo)
	} catch (e) {
		return e
	}
}

export { createProduct }
