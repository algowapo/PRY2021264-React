import axios from 'axios'
import URL from './baseURL'

async function getOneProduct(productId) {
	try {
		return await axios.get(
			`${URL}/users/NON_NECESSARY_VALUE/products/${productId}`
		)
	} catch (e) {
		return e
	}
}

export { getOneProduct }
