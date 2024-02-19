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

const Person = mongoose.model('Person', PersonSchema);

