import axios from 'axios'
import URL from './baseURL'

async function editAllProducts(newProductInfo, userId) {
	try {
		return await axios.patch(`${URL}/users/${userId}/products/`, newProductInfo)
	} catch (e) {
		return e
	}
}

export { editAllProducts }
