const randColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

const btns = document.querySelectorAll('button')

// for(let btn of btns) {
//     btn.addEventListener('click', () => {
//        btn.style.backgroundColor = randColor()
//        btn.style.color = randColor()
       
//     })
// }

for(let btn of btns) {
    btn.addEventListener('click', colorize)
}

//  const colorize = () => {
//     this.style.backgroundColor = randColor()
//     this.style.color = randColor()
//  }

function colorize() {
    this.style.backgroundColor = randColor()
    this.style.color = randColor()
}