const mongoose = require('mongoose');

// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(() => {
    console.log('COONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
})

/*******************************************************************
 * The built in validators provides 
 *  an error handling message 
 *   as shown in the:
 *        min and max of price property
 *   
 *    if an array is passed in:
 *          The First value is constrained  value
 *          The Second value is String that is be the error message
 ********************************************************************/
const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        maxlength: 20,
    },
    price: {
        type: 'number',
        required: true,
        min: [0, 'Price must be positive'],
    },
    onSale: {
        type: 'boolean',
        default: false,
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0 
        },
        inStore: {
            type: Number,
            default: 0
        }
    }, 
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

/**************************************
 * create a model from the Schema
 **************************************/
const Product = mongoose.model('Product', productSchema);

/*****************************************************
 * create an Instance (an item (OBJECT)) from the Model
 *****************************************************/
const  bike = new Product({name:'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'XS'}) 

/*********************************************************
 * Save the Instance (an item (OBJECT)) create to mongoDB
 *********************************************************/
bike.save()
    .then(data => {
        console.log("IT WORKED!!!");
        console.log(data);
    })
    .catch(err => {
        console.log("OH NO ERROR!!!");
        console.log(err.errors);
        // console.log(err.errors.name.properties.message);
    });


// /*********************************************
//  * Update a documents in a collection
//  * The: 
//  *    new: true
//  *       is used to make sure the new updated document
//  *        is returned NOT the old one
//  *  
//  *    runValidators: true 
//  *       is used to make sure the constraints are applied
//  *******************************************/
// Product.findOneAndUpdate({name:'Tire Pump' }, {price: -10}, {new: true, runValidators: true})
//     .then(data => {
//         console.log("IT WORKED!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!!");
//         console.log(err.errors);
//         // console.log(err.errors.name.properties.message);
//     });