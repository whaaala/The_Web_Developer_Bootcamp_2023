const mongoose = require('mongoose');

// Connect to mongoDB
/*******************************************************************
 *  FYI: THE moviesApp at the end of the path is a new database
 *       that will be created (if it does not exist already)
 *********************************************************************/
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
 *   for the Movie Model 
 *   
 *   The Keys that are used in the Schema 
 *    will be the key for each document created 
 *    in mongoDB
 * 
 *    And the DATA TYPE set for each key will be the value type 
 *    that can be allowed in the document in mongoDB
 *     The documentation shows the SchemaTypes permitted: 
 *           https://mongoosejs.com/docs/guide.html
 *****************************************************************/
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

/************************************************************************
 * Then use the Schema created to make a model
 *   with:
 *       mongoose.model('<The name you want the model to be>', the schema created)
 *         FYI: The name created in the first argument is VERY important
 *               IT SHOULD BE SINGLAR 
 *               AND THE FIRST LETTER MUST BE IN CAPITAL LETTER
 * 
 *           BECAUSE mogoose will take that name and create a collection
 *            with:
 *             THE LETTER IN SMALL LETTER
 *             AND IT WILL CREATE THE COLLECTION IN PURALS 
 * 
 * Then save the in a variable 
 *        with the same name you used in creating the model, (this is a class)
 *************************************************************************/
const Movie = mongoose.model('Movie', movieSchema);

/*********************************************************************
 * Then create an Instance of the class
 ********************************************************************/
const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'})

/*********************************************************************
 * Then use: <instances created name>.save() to save the instances
 *  as  Document in a collection in the database in mongoDB
 ********************************************************************/
// amadeus.save();