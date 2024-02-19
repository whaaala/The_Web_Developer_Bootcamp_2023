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

/**************************************
 * Define the Product Schema
 *  And ADD Schema Validation 
 *   for each PROPERTY
 **************************************/
const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        maxlength: 20,
    },
    price: {
        type: 'number',
        required: true,
        min: 0,
    },
    onSale: {
        type: 'boolean',
        default: false,
    },
    categories: [String],
    // categories: {
    //     type: [String],
    //     default: ['Cycling']
    // },
    qty: {
        online: {
            type: Number,
            default: 0 
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});

/**************************************
 * create a model from the Schema
 **************************************/
const Product = mongoose.model('Product', productSchema);

/*****************************************************
 * create an Instance (an item (OBJECT)) from the Model
 *****************************************************/
// const  bike = new Product({name:'Mountain Bike', price: 599})
// const  bike = new Product({name:'Bike Helmet', price: 29.50})
// const  bike = new Product({name:'Bike Helmet From Helmet Makers', price: 29.50}) // maxlegth constraints
const  bike = new Product({name:'Bike Helmet', price: 19.50, categories: ['Cycling', 'Safty']}) 


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