const form = document.querySelector('#searchForm');
const container = document.querySelector('.imgContainer');

//GETTING RESPOND AND APPENDING A SINGLE DATA TO THE PAGE
// form.addEventListener('submit', async function(e){
//     e.preventDefault();
//     console.log('SUMBITED');
//     const searchTerms = form.elements.query.value;
//     const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerms}`)
//     // console.log(res.data);
//     console.log(res.data[0].show.image.medium);
//     // console.dir(this);
//     const img = document.createElement('IMG');
//     img.src = res.data[0].show.image.medium;
//     document.body.append(img)
// })

// //GETTING RESPOND AND APPENDING ALL DATA FROM RESPONSE TO THE PAGE
// form.addEventListener('submit', async function(e){
//     e.preventDefault();
//     console.log('SUMBITED');
//     const searchTerms = form.elements.query.value;
//     const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerms}`)
//     makeImages(res.data);
//     form.elements.query.value = '';
    
// })

// const makeImages = shows => {
//     for(let result of shows) {
//         if( result.show.image){
//             const img = document.createElement('IMG');
//             img.src = result.show.image.medium;
//             document.body.append(img)
//         }
//     }
// }

//ADDING MULTIPLE PARAMETERS FOR SEARCH QUERIES IN AXIOS
form.addEventListener('submit', async function(e){
    e.preventDefault();
    console.log('SUMBITED');
    const searchTerms = form.elements.query.value;
    const config = {
        params: {q: searchTerms},
        headers: {}
    }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
    makeImages(res.data);
    form.elements.query.value = '';
    
})

//Clean up the container and add the new search result
const makeImages = shows => {
    if(container.children.length > 0){
          container.innerHTML = '';
     }
    for(let result of shows) {
        if(result.show.image){
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            container.append(img)
        }
    }
}