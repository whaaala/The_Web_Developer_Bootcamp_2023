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
    },
    price: {
        type: 'number',
        required: true,
    }

});

/**************************************
 * create a model from the Schema
 **************************************/
const Product = mongoose.model('Product', productSchema);

/*****************************************************
 * create an Instance (an item (OBJECT)) from the Model
 *****************************************************/
const  bike = new Product({name:'Mountain Bike', price: 599})


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