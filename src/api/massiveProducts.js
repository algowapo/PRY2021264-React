import axios from 'axios'
import URL from './baseURL'

async function massiveProducts(products, id) {
	try {
		return await axios.post(`${URL}/users/${id}/massive`, products)
	} catch (e) {
		return e
	}
}

export { massiveProducts }
