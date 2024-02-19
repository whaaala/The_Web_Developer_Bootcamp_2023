const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');

//WITHOUT header  ALL THE URL IS RETURNING IS THE html file according to the API documentation
// const getDadJoke = async () => {
//     try {
//         const res = await axios.get('https://icanhazdadjoke.com/')
//         console.log(res);
//         // console.log(res.data);
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// getDadJoke();

//PASSING HEADER WITH AXIOS
// const getDadJoke = async () => {
//     try {
//         const config = {
//             headers: {Accept: 'application/json'} 
//         }

//         const res = await axios.get('https://icanhazdadjoke.com/', config)
//         console.log(res);
//         console.log(res.data);
//         console.log(res.data.joke);
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// getDadJoke();

//APPENDING THE DATA RECEVIED TO THE PAGE
// const getDadJoke = async () => {
//     try {
//         const config = {
//             headers: {Accept: 'application/json'} 
//         }

//         const res = await axios.get('https://icanhazdadjoke.com/', config)
//         console.log(res);
//         console.log(res.data);
//         console.log(res.data.joke);
//         const newLI = document.createElement('LI');
//         newLI.append(res.data.joke);
//         jokes.append(newLI)
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// getDadJoke();

//adding Event listener to cliclk on the button and APPENDING THE DATA RECEVIED TO THE PAGE
const addNewJokes = async () => {
    const jokeText = await getDadJoke()
    const newLI = document.createElement('LI');
    newLI.append(jokeText);
    jokes.append(newLI)
}

const getDadJoke = async () => {
    try {
        const config = {
            headers: {Accept: 'application/json'} 
        }
        const res = await axios.get('https://icanhazdadjoke.com/', config)
        return res.data.joke;
    } catch (error) {
        console.log(error);
        return `NO JOKES AVALABLE SORRY :(`;
    }
}


button.addEventListener('click', addNewJokes)