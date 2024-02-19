

const input = document.querySelector('input');
const h1 = document.querySelector('h1');


// input.addEventListener('change', (e) => {
//     e.preventDefault()
//     console.log('rereretertretertret');
// })


input.addEventListener('input', (e) => {
    e.preventDefault()
    h1.innerText = input.value
})