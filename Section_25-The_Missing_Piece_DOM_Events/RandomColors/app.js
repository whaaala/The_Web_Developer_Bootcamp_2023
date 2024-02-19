const btn = document.querySelector('#v1');
const body = document.querySelector('body');
const h1 = document.querySelector('h1');

btn.addEventListener('click', () =>{
    body.style.backgroundColor = randColor();
    h1.innerText =  body.style.backgroundColor;
})

const randColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}
