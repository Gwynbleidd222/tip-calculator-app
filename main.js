const price = document.querySelector('#price')
const people = document.querySelector('#people')
const tipButtons = document.querySelectorAll('.btn')
const customTip = document.querySelector('#custom-tip')
const error = document.querySelector('.error')
const total = document.querySelector('#total')
const tipAmount = document.querySelector('#tip-amount')
const reset = document.querySelector('.btn-reset')
let selectedTip = 0

const showBill = () => {
	const newPrice = parseFloat(price.value)
	const newPeople = parseInt(people.value)

	if (isNaN(newPrice) || isNaN(newPeople) || newPrice <= 0 || newPeople <= 0 || selectedTip <= 0) {
		total.textContent = '$0.00'
		tipAmount.textContent = '$0.00'
		error.textContent = 'Cant be zero'
		people.classList.add('input-error')
		return
	} 

    error.textContent = ''
    people.classList.remove('input-error')

	const tipPerson = (newPrice * selectedTip) / newPeople
	tipAmount.textContent = `$${tipPerson.toFixed(2)}`
	const sumTotal = (newPrice + newPrice * selectedTip) / newPeople
	total.textContent = `$${sumTotal.toFixed(2)}`
}

const removeActive = () => {
	tipButtons.forEach(btn => btn.classList.remove('active'))
}

tipButtons.forEach(button => {
	button.addEventListener('click', () => {
		removeActive()
		button.classList.add('active')
		selectedTip = parseFloat(button.value)
		showBill()
	})
})

customTip.addEventListener('input', () => {
	removeActive()
	selectedTip = parseFloat(customTip.value) / 100 || 0
	showBill()
})

const totalReset = () => {
	price.value = ''
	people.value = ''
	customTip.value = ''
    selectedTip = 0
	total.textContent = '$0.00'
	tipAmount.textContent = '$0.00'
	removeActive()
}

price.addEventListener('input', showBill)
people.addEventListener('input', showBill)
reset.addEventListener('click', totalReset)
