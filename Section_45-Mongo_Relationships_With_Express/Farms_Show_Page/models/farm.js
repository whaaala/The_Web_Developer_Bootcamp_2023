const mongoose = require('mongoose');

/************************************** */
//Destructure Schema 
const { Schema } = mongoose

/************************************** */
//Create a Schema
const farmSchema = new Schema({
    name: {
        type: String,
        required:[true, 'Farm must have a name']
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    //Add the reference of the products belonging to farm
    products: [{
        //The first thing to do is set the type of each product to be an ObjectID 
          // by using: mongoose.Schema.Types.ObjectId (this is prodivided by mongoose)
           // But put:mongoose.Schema into its own variable
        type: Schema.Types.ObjectId,

         //Then use: ref, and use it to set the name of the model that whose document
          //ObjectId will be referenced
            // ref option is what tells Mongoose which model to use duirng population
        ref: 'Product'
    }]

});

//Create a Model with the Schema created
const Farm = mongoose.model('Farm', farmSchema);

/****************************************************************** */
//Export the Model created so you can use it in another file 
module.exports = Farm;