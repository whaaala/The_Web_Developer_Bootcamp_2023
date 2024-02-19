
function singSong() {
    console.log("DO");
    console.log("RE");
    console.log("MI");
}

// Returning function --> Factory function 
function makeBetweenFunc(min, max) {
    return function(val){
        return val >= min && val <= max;
    }
}

//Method are functions created as a property in an object
// const myMath = {
//     PI: 3.14159,
//     square: function(num) {
//         return num *num;
//     },
//     cube: function(num) {
//         return num ** 3;
//     },
// }

//SHORTHAND of  function IN AN OBJECT
// const myMath = {
//     PI: 3.14159,
//     square(num) {
//         return num *num;
//     },
//     cube(num) {
//         return num ** 3;
//     },
// }

//ForEach
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const exams = [80, 98, 92, 78, 70, 90, 89, 84, 81, 77]


// numbers.forEach(function(el){
//     console.log(el);
// })

// const doubles = numbers.map(function(num){
//     return num * 2
// });

// exams.every(score => score >= 75)
// exams.some(score => score >= 75)

//REDUCE
const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

//get total prices with for loop
let total = 0;
for(let price of prices) {
    total += price;
}

//get total prices with reduce
const totalPrice = prices.reduce((total,price) => total + price)

//Min Price with Reduce
const minPrice = prices.reduce((minPrice, price) =>{
    if(price < minPrice) {
        return price
    }
    return minPrice  
})

//PAssing a starting initial value for reduce method
const evens = [2, 4, 6, 8]
evens.reduce((sum, num) => sum + num, 100)




const filter = numbers.filter(n => {
    return n < 10
})

const movies = [
    {
        title: 'Amadeus',
        score: 99,
        year: 1984
    },
    {
        title: 'Sharknado',
        score: 35,
        year: 2013
    },
    {
        title: '13 Going On 30',
        score: 70,
        year: 2004
    },
    {
        title: 'Stand By Me',
        score: 85,
        year: 1986
    },
    {
        title: 'Waterworld',
        score: 62,
        year: 1995
    },
    {
        title: 'Jingle All The Way',
        score: 71,
        year: 1996
    },
    {
        title: 'Parasite',
        score: 95,
        year: 2019
    },
    {
        title: 'Notting Hill',
        score: 77,
        year: 1999
    },
    {
        title: 'Alien',
        score: 90,
        year: 1979
    },
]

// const goodmovies = movies.filter(movie => {
//     return movie.score > 80
// })
const goodMovies = movies.filter(m => m.score > 80)
const goodTitles = movies.map(m => m.title)

//Chaining 
const filteredTitles = movies.filter(m => m.score > 80).map(m => m.title)

const badMovies = movies.filter(m => m.score < 70)
const recentMovies = movies.filter(m => m.year > 2000)

movies.some(movie => movie.year > 2015)


// movies.forEach(function(movie){
//     console.log(`${movie.title} - ${movie.score}/100`);
// })

// const titles = movies.map(function(movie){ 
//     return movie.title.toUpperCase()
// })

// const newMovies = movies.map(function(movie){ 
//     return `${movie.title} - ${movie.score/10}`;
// })
// const newMovies = movies.map((movie) => { 
//     return `${movie.title} - ${movie.score/10}`;
// })
const newMovies = movies.map(movie => `${movie.title} - ${movie.score/10}`)

const bestMovie = movies.reduce((bestMovie, currMovie) => {
    if(currMovie.score > bestMovie.score){
        return currMovie
    }
    return bestMovie
})

//Arrow Function with Implicte return 
const rollDie = () => Math.floor(Math.random() * 5) + 1


//setTimeout
// console.log('Hello');
// setTimeout(() =>{ console.log('Are you still there?'), 3000})
// console.log('BYE');

//setInterval
// const id = setInterval(() =>{console.log(Math.random())}, 3000)

//clearInterval
//clearInterval(id)

