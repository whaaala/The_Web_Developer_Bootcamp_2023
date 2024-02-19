const btn = document.querySelector('button');
const container = document.querySelector('#container');

const randColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}


btn.addEventListener('click', (e) => {
    e.stopPropagation()
   container.style.backgroundColor = randColor()
})

container.addEventListener('click', (e) => {
    container.classList.toggle('hide')
})