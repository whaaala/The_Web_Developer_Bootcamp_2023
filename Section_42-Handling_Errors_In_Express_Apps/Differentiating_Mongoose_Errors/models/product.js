const mongoose = require('mongoose');

/************************************** */
//Create a Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    price: {
        type: Number,
        required: [true, 'price cannot be blank'],
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});
/********************************************************* */

//Create a Model with the Schema created
// (Remember: the first argument is the the Collection name and it need to be in Capital and singlar)
 // And the name of the variabe needs to be the same name as the first argument
const Product = mongoose.model('Product',productSchema);

/****************************************************************** */
//Expport the Model created so you can use it in another file 
module.exports = Product;