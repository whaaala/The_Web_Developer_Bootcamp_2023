// axios.get("https://swapi.dev/api/people/1")
// .then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

//USING ASYNC WITH AXIOS
const getStarWarsStar = async function (id) {
    try {
        const star = await axios.get(`https://swapi.dev/api/people/${id}`)
        console.log(star.data);
    } catch (error) {
        console.log(error);
    }
}

getStarWarsStar(5);
getStarWarsStar(10);
// "https://swapi.dev/api/people/1"