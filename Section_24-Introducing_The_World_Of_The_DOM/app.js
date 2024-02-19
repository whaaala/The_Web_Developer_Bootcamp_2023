const allImgs = document.getElementsByTagName('img')

for(let img of allImgs){
    console.log(img.src);
   // img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg';
}

const squareImages = document.getElementsByClassName('square')

for(let img of squareImages){
    // img.src ='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg';
}

