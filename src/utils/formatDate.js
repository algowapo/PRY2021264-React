function formatDate(date) {
	let dateDate = new Date(date)
	let intDay = dateDate.getUTCDate()
	let intMonth = dateDate.getUTCMonth() + 1
	let intYear = dateDate.getUTCFullYear()

	let stringDay = intDay < 10 ? `0${intDay}` : `${intDay}`
	let stringMonth = intMonth < 10 ? `0${intMonth}` : `${intMonth}`
	let stringYear = `${intYear}`

	return `${stringYear}-${stringMonth}-${stringDay}`
}

export { formatDate }
