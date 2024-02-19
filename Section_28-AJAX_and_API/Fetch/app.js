// fetch("https://swapi.dev/api/people/1")
//     .then(res => {
//         console.log("FULFILLED", res);
//         res.json()
//             .then(data => {
//                 console.log(data);
//             })
//     })
//     .catch(err => {
//         console.log("ERROR", err);
//     })

//REFACTORED VERSION
// fetch("https://swapi.dev/api/people/1")
//     .then(res => {
//         console.log("FULFILLED", res);
//         return res.json()
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("ERROR", err);
//     })

//SECOND REQUEST FROM THE FULFILLED FIRST REQUEST
// fetch("https://swapi.dev/api/people/1")
//     .then(res => {
//         console.log("FULFILLED", res);
//         return res.json()
//     })
//     .then(data => {
//         console.log(data);
//         return fetch("https://swapi.dev/api/people/2")
//     })
//     .then((res) => {
//         console.log('SECOND REQUEST FULFILLED!!!');
//         return res.json()
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("ERROR", err);
//     })

//USING ASYNC FUNCTION
const loadStarWarCastMember = async function () {
    try {
        const res = await fetch("https://swapi.dev/api/people/1")
        const data = await res.json()
        console.log(data);
        const resSecond = await fetch("https://swapi.dev/api/people/2")
        const data1 = await resSecond.json()
        console.log(data1);
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

loadStarWarCastMember();

// "https://swapi.dev/api/people/1"