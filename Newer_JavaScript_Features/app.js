//Add default value for a Parameter for an Arugment
function rollDie(numSides = 6){
    return Math.floor(Math.random() * numSides) + 1
}

//Spread With Array into a fuction as an Arugment for value in the array
const nums = [13, 4, 5, 21, 3, 3, 1, 2, 7, 6, 4, 2, 56784]

const max= Math.max(...nums)
const min= Math.min(...nums)

//Spread With Array Literals
const cats = ['Blue', 'Scout', 'Rocket'];
const dogs = ['Rusty', 'Wyatt'];

const allPets = [...cats, ...dogs]

//Spread With Object Literals
const feline = {legs: 4, family: 'Felidae'};
const canine = {isFurry: true, family: 'Caninae'};

const catDog = {...feline, ...canine}

//REST PARAMs for Functions 
// function sum(){
//     return arguments // All function has an arugments parameter created for us by default But this arguments in not an Array
// }
// function sum(){
//     return arguments.reduce((total, el) => total + el)
// }
function sum(...nums){
    return nums.reduce((total, el) => total + el)
}
const sums = sum(1,3,45,65,67,7,8,8,8,8)

function raceResult(gold, silver, ...everyoneElse){
    console.log(`GOLD MEDAL GOES TO: ${gold}` );
    console.log(`SILVER MEDAL GOES TO: ${silver}` );
    console.log(`AND THANKS TO EVERYONE ELSE: ${everyoneElse}` );
}

// raceResult('Tammy', 'todd', 'Tina', 'Trevor', 'Travis' )

//DESTRUCTURING ARRAYS
const scores = [929321, 899341, 888336, 772739, 543671, 243567, 111934]

//Normal way
const highScore = scores[0];
const secondHighScore = scores[1];

//Destructuring way
// const [gold, silver] = scores

//Destructuring all remaining values in an Array
const [gold, silver, bronze, ...everyoneElse] = scores


//DESTRUCTURING OBJECTS
const user = {
    email: 'baba@gmail.com',
    pawwaord: 'Password123!',
    firstName: 'Terry',
    lastName: 'Mike',
    born: 1930,
    died: 1978,
    bio: 'Terry Mike was an American politician',
    city: 'San Francisco',
    state: 'California'
}

const user2 = {
    email: 'stacy@gmail.com',
    firstName: 'Stacy',
    lastName: 'Gonzalez',
    city: 'Tulsa',
    state: 'Oklahoma',
}

// const firstName = user.firstName;
// const lastName = user.lastName
// const email = user.email

//The variable names HAS to be the name of the property in the Object
// const {email, firstName, lastName, bio} = user;

//To rename the variable to a different name from the property
const {born: birthYear, died: deathYear = 'N/A'} = user;

//Assign a default value to the variable that is not a property in the Object
const {city, state, died ='N/A' } = user2

//DESTRUCTURING PARAMs
// function fullName(user) {
//     return `${user.firstName} ${user.lastName}`
// }
// function fullName(user) {
//     const {firstName, lastName} = user
//     return `${firstName} ${lastName}`
// }
function fullName( {firstName, lastName = 'Not Known'}) {
    return `${firstName} ${lastName}`
}


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
    }
]


// const filterMovies = movies.filter(movie => movie.score >= 90)
const filterMovies = movies.filter(({score}) => score >= 90)

// const mapMovies = movies.map(movie => {
//     return `${movie.title} (${movie.year}) is rated ${movie.score}`
// })
// const mapMovies = movies.map(({title, score, year}) => {
//     return `${title} (${year}) is rated ${score}`
// })
const mapMovies = movies.map(({title, score, year}) => `${title} (${year}) is rated ${score}`)