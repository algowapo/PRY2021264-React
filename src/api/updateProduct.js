import axios from 'axios'
import URL from './baseURL'

async function updateProduct(updatedProductInfo, productId) {
	try {
		return await axios.patch(
			`${URL}/users/NOT_NECESSARY_VALUE/products/${productId}`,
			updatedProductInfo
		)
	} catch (e) {
		return e
	}
}

export { updateProduct }
