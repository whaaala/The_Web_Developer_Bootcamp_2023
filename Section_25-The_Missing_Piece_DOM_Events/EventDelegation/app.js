
const form = document.querySelector('#shelterForm');
const input = document.querySelector('#catName');
const list = document.querySelector('#cats');
// const items = document.querySelectorAll('li')

// for(let item of items) {
//     item.addEventListener('click', () => {
//         item.remove()
//     })
// }

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const catName = input.value
    const item = document.createElement('li')
    item.innerText = catName
    list.append(item)
    input.value = ''
})

list.addEventListener('click', (e) =>{
    // console.log('Clicked on UL');
    // console.log(e.target);
    // console.dir(e.target);
    e.target.nodeName === 'LI' && e.target.remove()
})