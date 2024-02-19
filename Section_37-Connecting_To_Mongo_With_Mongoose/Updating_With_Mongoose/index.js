const mongoose = require('mongoose');

// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/moviesApp')
.then(() => {
    console.log('COONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
})

/************************************************************
 * Defining a Schema
 *****************************************************************/
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

/************************************************************************
 * Then use the Schema created to make a model
 *************************************************************************/
const Movie = mongoose.model('Movie', movieSchema);

/*********************************************************************
 * Then create an Instance of the class
 ********************************************************************/
// const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'})

/*********************************************************************
 * Create mutiple Instance of the class
 *  With:
 *       insertMany([{}])
 *          THIS RETURNS A PROMISE 
 *            THEREFORE .save() does not needs to be called on it 
 *       A .then/catch can be used on it 
 *  
 *   THIS NOT A COMMON USE METHOD FOR WEB
 ********************************************************************/
// Movie.insertMany([
//     {title: 'Amadeus', year: 2001, score: 8.3, rating: 'R'},
//     {title: 'Aliens', year: 1979, score: 8.1, rating: 'R'},
//     {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
//     {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
//     {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'}
// ])
// .then(data => {
//     console.log("IT WORKED");
//     console.log(data);
// })

/***********************************************************************
 * RUN: Movie.find({}).then(data => console.log(data)) 
 * in the console  to find all movies
 * 
 * Run:  Movie.find({rating: 'PG-13'}).then(data => console.log(data))
 * to get a specific movie
 * 
************************************************************************/