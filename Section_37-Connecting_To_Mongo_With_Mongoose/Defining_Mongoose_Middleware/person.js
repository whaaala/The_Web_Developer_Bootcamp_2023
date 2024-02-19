const mongoose = require('mongoose');

// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(() => {
    console.log('COONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
});

const PersonSchema = new mongoose.Schema({
    first: String,
    last: String
})

/***************************************
 * Define a virtual on the PersonSchema
 *  And use it to create a new property
 *  as though it exists in the schema
 *
 *  The .get method below
 *       is used as a getter
 *  and only exists on Mongoose Not on mongodb
***********************************************/
PersonSchema.virtual('fullName',).get(function(){
    return `${this.first} ${this.last}`;
});

/*****************************************************************
 *  Running .pre middleware before you save a person
 *         and .post middleware after you save a person
 * 
 *  For the Middleware
 *      it is IMPORTANT  to have next argument passed 
 *         and execute next as a function at the very end 
 *         in the function
 *      
 *      OR 
 *      
 *      alternatively: you need to return a Promise from the 
 *                      function
 * 
 * THE reason FOR THIS: 
 *              IS TO MAKE SURE TTHE FUNCTION CREATED RUNS 
 *              IN THE MIDDLE OF SOMETHING 
 *             AND ONCE IT DONE 
 *                 THAT SOMETHING CONTINUES
*****************************************************************/
PersonSchema.pre('save', async function(){
    // this.first = 'Yo'
    // this.last= 'MAMA'
    console.log("ABOUT TO SAVE!!!!");
})

PersonSchema.post('save', async function(){
    console.log("JUST SAVED!!!!");
})

const Person = mongoose.model('Person', PersonSchema);

