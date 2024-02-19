// THE CALLBACK VERSION
const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    }, delay)
}
// THE PROMISE VERSION 
const fakeRequestPromise = (url) => {
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

// //RUNIG THE CALLBACK
// fakeRequestCallback('books.com',  
//     function() {
//         console.log('IT WORKS!!!!');
//     }, function() {
//         console.log('ERROR!!!!');
//     })

//RUNIG THE CALLBACK AND PASSING ARGUMENT TO THE CALLBACK FUNCTION 
// fakeRequestCallback('books.com',  
//     function(response) {
//         console.log('IT WORKS!!!!');
//         console.log(response);
//     }, function(error) {
//         console.log('ERROR!!!!');
//         console.log(error);
//     })


// MAKE ANOTHER REQUEST ONLY IF THE FIRST REQUEST IS SUCCESSFUL
// fakeRequestCallback('books.com/page1',  
//     function(response) {
//         console.log('IT WORKS!!!!');
//         console.log(response);
//         fakeRequestCallback('books.com/page2', 
//             function (response) {
//                 console.log('IT WORKS AGAIN!!!!');
//                 console.log(response);
//                 fakeRequestCallback('books.com/page3', 
//                     function (response) {
//                         console.log('IT WORKS AGAIN (3RD request)!!!!');
//                         console.log(response);
//                     }, function(error) {
//                         console.log('ERROR (3RD request)!!!!', error);
//                     })
//             }, function(error) {
//                 console.log('ERROR (2ND request)!!!!', error);
//             })
//     }, function(error) {
//         console.log('ERROR!!!!');
//         console.log(error);
//     })


//USING PROMISE
// const request = fakeRequestPromise('yelp.com/api/coffee');

// request
//     .then(() => {
//         console.log('PROMISE FULFILLED');
//         console.log('IT WORKED!!');
//     }).catch(() => {
//         console.log('PROMISE REJECTED');
//         console.log('OH NO, ERROR!!');
//     })

//USING PROMISE WITHOUT SAVEING TO A VARAIBLE
// fakeRequestPromise('yelp.com/api/coffee')
//     .then(() => {
//             console.log('PROMISE FULFILLED');
//             console.log('IT WORKED!!');
//         }).catch(() => {
//             console.log('PROMISE REJECTED');
//             console.log('OH NO, ERROR!!');
//         })

// MAKE ANOTHER PROMISE ONLY IF THE PROMISE IS SUCCESSFUL
// fakeRequestPromise('yelp.com/api/coffee/page1')
//     .then(() => {
//             console.log('PROMISE FULFILLED');
//             console.log('IT WORKED!!');
//             fakeRequestPromise('yelp.com/api/coffee/page2')
//                 .then(() => {
//                     console.log('PROMISE FULFILLED (2)');
//                     console.log('IT WORKED!!');
//                 }).catch(() => {
//                     console.log('PROMISE REJECTED (2)');
//                     console.log('OH NO, ERROR!!');
//                 })
//         })
//         .catch(() => {
//             console.log('PROMISE REJECTED');
//             console.log('OH NO, ERROR!!');
//         })

// (CLEANUP) MAKE ANOTHER PROMISE ONLY IF THE PROMISE IS SUCCESSFUL
// fakeRequestPromise('yelp.com/api/coffee/page1')
//     .then(() => {
//             console.log('IT WORKED!! (page1)');
//             fakeRequestPromise('yelp.com/api/coffee/page2')
//                 .then(() => {
//                     console.log('IT WORKED!! (page2)');
//                     fakeRequestPromise('yelp.com/api/coffee/page3')
//                         .then(() => {
//                             console.log('IT WORKED!! (page3)');
//                         }).catch(() => {
//                             console.log('OH NO, ERROR!! (page3)');
//                         })
//                 }).catch(() => {
//                     console.log('OH NO, ERROR!! (page2)');
//                 })
//         })
//         .catch(() => {
//             console.log('OH NO, ERROR!! (page1)');
//         })

//USEING .then ON THE MAIN PROMISE by RETURNING A SECOND PROMISE FROM THE MAIN PROMISE IF THE PROMISE IS SUCCESSFUL
// fakeRequestPromise('yelp.com/api/coffee/page1')
//     .then(() => {
//             console.log('IT WORKED!! (page1)');
//             return fakeRequestPromise('yelp.com/api/coffee/page2')
//         })
//         .then(() => {
//             console.log('IT WORKED!! (page2)');
//             return fakeRequestPromise('yelp.com/api/coffee/page3')
//         })
//         .then(() => {
//             console.log('IT WORKED!! (page3)');
//         })
//         .catch(() => {
//             console.log('OH NO, ERROR!!, A REQUEST FAILED ');
//         })

//USEING WITH DATA RETURNED: PROMISES ARE FULLFILLED OR REJECTED WITH RETURN VALUES 
fakeRequestPromise('yelp.com/api/coffee/page1')
    .then((data) => {
            console.log('IT WORKED!! (page1)');
            console.log(data);
            return fakeRequestPromise('yelp.com/api/coffee/page2')
        })
        .then((data) => {
            console.log('IT WORKED!! (page2)');
            console.log(data);
            return fakeRequestPromise('yelp.com/api/coffee/page3')
        })
        .then((data) => {
            console.log('IT WORKED!! (page3)');
            console.log(data);
        })
        .catch((err) => {
            console.log('OH NO, ERROR!!, A REQUEST FAILED ');
            console.log(err);
        })











































