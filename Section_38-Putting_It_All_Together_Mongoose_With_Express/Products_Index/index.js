const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//Require the module created for product, as it as been exported
const Product = require('./models/product');

/********************************************************** */
// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() => {
    console.log('MONGO CONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
})
/**********************************************************************/

//Use Express
const app = express();

//Set up EJS and EJS views folder 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/*******************************************************************************/

/******** Set up Routes ********************************************************/
app.get('/', (req, res) => {
    res.send("<h1>Welcome!!!!</h1>")
})

/***************************************************************
 * Set up a router that displays all Products in the DB
****************************************************************/
app.get('/products', async (req, res) => {
    //Query the Product model, and get all products
    const products = await Product.find({})
    console.log(products);
    // res.send("<h1>ALL PRODUCTS WILL BE HERE!</h1>")

    /*********************************************************************
     * Pass the EJS html file to use for displaying all products
     *  in the: res.render() function 
     *  and pass all the products retrieved for the DB as a second argument
     *  so it can be used in the EJS file
     ***********************************************************************/
    res.render('products/index', {products});
})
/************************************************************`**************************/

//Set App to listen to Requests 
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
