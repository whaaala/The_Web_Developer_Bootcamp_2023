
// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
// }, 1000)
// setTimeout(() => {
//     document.body.style.backgroundColor = 'orange';
// }, 2000)
// setTimeout(() => {
//     document.body.style.backgroundColor = 'yellow';
// }, 3000)


//NESTING
// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         document.body.style.backgroundColor = 'orange';
//         setTimeout(() => {
//             document.body.style.backgroundColor = 'yellow';
//             setTimeout(() => {
//                 document.body.style.backgroundColor = 'green';
//                 setTimeout(() => {
//                     document.body.style.backgroundColor = 'blue';
//                 }, 1000)
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)


//REFACTORING THE NESTING
// const delayedColorChange = (newColor, delay) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor
//     }, delay)
// }

// delayedColorChange('olive', 3000);
// delayedColorChange('teal', 3000);



//REFACTORING THE NESTING with passsing a callback in the delay function
const delayedColorChange = (newColor, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor
        doNext && doNext()
    }, delay)
}

delayedColorChange('red', 1000, () => {
    delayedColorChange('orange', 1000, () => {
        delayedColorChange('yellow', 1000, () => {
            delayedColorChange('green', 1000, () => {
                delayedColorChange('blue', 1000)
            })
        })
    })
});

//USE CALLBACK WHEN THERE ARE DEPENDENT THINGS HAPPENING: like getting a movie DATA and passing it to a function 
searchMoviesAPI('amadeus', () => {
    saveToMyDB(movies, () =>{
        //if it works, run this
    }, () => {
         //if it does not works, run this
    })
}, () => {
    //if API is down, or request fails 
});