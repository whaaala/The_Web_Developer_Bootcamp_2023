
const form = document.querySelector('#shelterForm');
const input = document.querySelector('#catName');
const list = document.querySelector('#cats');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const catName = input.value
    const item = document.createElement('li')
    item.innerText = catName
    list.append(item)
    input.value = ''
})