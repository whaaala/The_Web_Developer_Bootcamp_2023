const mongoose = require('mongoose');

/************************************** */
//Destructure Schema 
const { Schema } = mongoose


/************************************** */
//Create a Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    //Add the reference of the farm the product belongs to
    farm: [{
        //The first thing to do is set the type of each product to be an ObjectID 
          // by using: mongoose.Schema.Types.ObjectId (this is prodivided by mongoose)
           // But put:mongoose.Schema into its own variable    
        type: Schema.Types.ObjectId,
        
         //Then use: ref, and use it to set the name of the model that whose document
          //ObjectId will be referenced
            // ref option is what tells Mongoose which model to use duirng population
        ref: 'Farm'
    }]
});
/********************************************************* */

//Create a Model with the Schema created
// (Remember: the first argument is the the Collection name and it need to be in Capital and singlar)
 // And the name of the variabe needs to be the same name as the first argument
const Product = mongoose.model('Product',productSchema);

/****************************************************************** */
//Expport the Model created so you can use it in another file 
module.exports = Product;