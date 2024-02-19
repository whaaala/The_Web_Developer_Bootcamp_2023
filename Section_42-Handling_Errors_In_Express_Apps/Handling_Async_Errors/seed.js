/****************************************************************************************
 * This is a file that will be run on it own to create Dummy documents in the collecetion 
 ****************************************************************************************/

const mongoose = require('mongoose');

//Require the module created for product, as it as been exported
const Product = require('./models/product');

/********************************************************** */
// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
.then(() => {
    console.log('MONGO CONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
});

/*****************************************************
 * Create DATA
 ******************************************************/
// const p = new Product ({
//     name: 'Ruby Grapefruit',
//     price: 199,
//     category: 'fruit'
// });

// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(err =>{
//         console.log(err);
//     });

/*****************************************************
 * Create More than one Product with: insertMany()
 ******************************************************/
//Create an Array of Products 
const seedProducts = [
    {
        name: 'Fairy  Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

//Then pass the Array of Products into: insertMany(<Products>)
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });
/***********************************************************
 * FYI:
 *    For: insertMany() in mongoose, if any of the property 
 *         in the Product array DOES NOT PASS VALIDATION
 *         THEN no product will be inserted in the database
 *        
 *          Because Mongoose validate all the properties of 
 *          each product in the Array before insert them 
 *          in one go
*************************************************************/