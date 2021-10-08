function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

function validatePassword(password) {
	const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
	return re.test(String(password))
}

function validateProduct(product) {
	const reNumbers = /^\d{0,8}(\.\d{1,4})?$/
	const reChars = /^[a-zA-Z]+$/
	if (
		reNumbers.test(String(product.price)) &&
		reChars.test(String(product.name)) &&
		reChars.test(String(product.color))
	) {
		return true
	}
	return false
}

export { validateEmail, validatePassword, validateProduct }
