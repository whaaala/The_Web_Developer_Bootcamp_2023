//CREATING A PROMISE 
// new Promise((fulfilled, rejected) => {
//     fulfilled()
// })


//UNDERSTANDING A PROMISE 
// const fakeRequest = (url) => {
//     return new Promise((fulfilled, rejected) => {
//         const rand = Math.random();
//         setTimeout(() => {
//             if(rand < 0.7){
//                 fulfilled('YOUR FAKE DATA HERE')
//             }
//             rejected('Request Error')
//         },1000)
//     })
// }

// fakeRequest('/dog/1')
//     .then((data) => {
//         console.log("DONE WITH REQUEST");
//         console.log(`data is: ${data}`);
//     })
//     .catch((err) => {
//         console.log('OH NO!', err);
//     })    


// //REFACTORING THE NESTING with passsing a callback in the delay function
// const delayedColorChange = (newColor, delay, doNext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor
//         doNext && doNext()
//     }, delay)
// }

// delayedColorChange('red', 1000, () => {
//     delayedColorChange('orange', 1000, () => {
//         delayedColorChange('yellow', 1000, () => {
//             delayedColorChange('green', 1000, () => {
//                 delayedColorChange('blue', 1000, () => {
//                     delayedColorChange('indigo', 1000, () => {
//                         delayedColorChange('violet', 1000)
//                     })
//                 })
//             })
//         })
//     })
// });

//REWIRTED THE delayColorChange function with Promise
const delayedColorChange = (newColor, delay) => {
    return new Promise((fulfilled, rejected) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor
            fulfilled()
        }, delay);
    }) 
}

//USING THE PROMISE delayColorChange function
delayedColorChange('red', 1000)
    .then(() => delayedColorChange('yellow', 1000))
    .then(() => delayedColorChange('green', 1000))
    .then(() => delayedColorChange('blue', 1000))
    .then(() => delayedColorChange('indigo', 1000))
    .then(() => delayedColorChange('violet', 1000))