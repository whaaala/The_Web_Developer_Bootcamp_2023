// //Async function declaration
// async function hello () {

// }

//Async Arrow function 
// const sing = async () => {}

// //Async Promise fulfilling a promise with the returned value in async function
// const sing = async () => {
//     return 'LA LA LA'
// }

// //USING async FUNCTION WITH .then 
// sing()
//     .then((data) => {
//         console.log(`PROMISE FULFILLED WITH ${data}`);
//     })


//Async Promise WITH ERROR: this is done by throw an error, Promise will return REJECTED 
// const sing = async () => {
//     throw 'OH NO, PROBLEM'
//     return 'LA LA LA'
// }

// //USING async FUNCTION WITH .then AND .catch
// sing()
//     .then(data => {
//         console.log(`PROMISE FULFILLED WITH ${data}`);
//     })
//     .catch(err => {
//         console.log('OH NO, PROMISE REJECTED');
//         console.log(err);
//     })

//LOGIN FUNCTION WITH async function
// const login = async (username, password) => {
//     if(!username || !password) throw 'Missing Credentials';
//     if(password === 'thisyou') return 'WELCOME!';
//     throw 'Invalid password';
// }

// login('test', 'thisyou')
//     .then(msg => {
//         console.log('LOGGED IN');
//         console.log(msg);
//     })
//     .catch(err => {
//         console.log('ERRPR!');
//         console.log(err);
//     })


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
// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('indigo', 1000))
//     .then(() => delayedColorChange('violet', 1000))

//USING Async function WITHOUT await
// async function rainbow() {
//     delayedColorChange('red', 1000)
//     delayedColorChange('yellow', 1000)
// }

//USING Async function WITH await: awailt pause the execution of the function, waiting for a promise to beresolved
// async function rainbow() {
//     await delayedColorChange('red', 1000)
//     await delayedColorChange('yellow', 1000)
//     await delayedColorChange('green', 1000)
//     await delayedColorChange('blue', 1000)
//     await delayedColorChange('indigo', 1000)
//     await delayedColorChange('violet', 1000)
// }

// rainbow();

//RETURNING A PROMISE FROM AN ASYNC FUNCTION CALLING A FUNCTION THAT HAS PROMISE CREATED 
// async function rainbow() {
//     await delayedColorChange('red', 1000)
//     await delayedColorChange('yellow', 1000)
//     await delayedColorChange('green', 1000)
//     await delayedColorChange('blue', 1000)
//     await delayedColorChange('indigo', 1000)
//     await delayedColorChange('violet', 1000)
//     return 'ALL DONE'
// }

// // rainbow()
// //     .then(() => {
// //         console.log('END OF RANIBOW');
// //     })

// //USING ASYNC FUNCTION TO AWAIT rainbow function
// async function printRainbow() {
//     await rainbow();
//     console.log('END OF RANIBOW');
// }

// printRainbow();


// THE PROMISE VERSION 
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}

// async function makeTwoRequests() {
//     let data1 = await fakeRequest('/page1');
//     console.log(data1);
// }

//HANDING ERROR IN ASYNC FUNCTION
async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest('/page1');
        console.log(data1);
        let data2 = await fakeRequest('/page2');
        console.log(data2);
    } catch (e) {
        console.log('IT OK', e);
    }
}

makeTwoRequests();