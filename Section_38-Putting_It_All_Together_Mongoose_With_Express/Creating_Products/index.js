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

//Add parers to app in other to be able to get the data send by the user from a form in the raw form
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/********************************************
/*******************************************************************************/

/********************************************************************************************
 * ******************************************************************************************
 *                                    SET UP ROUTES 
 * ******************************************************************************************
*********************************************************************************************/
app.get('/', (req, res) => {
    res.send("<h1>Welcome!!!!</h1>")
})
/***************************************************************
 * ************************************************************
 *                         GET ALL PRODUCT
 * ************************************************************ 

/***************************************************************
 * Set up a router that displays all Products in the DB
****************************************************************/
app.get('/products', async (req, res) => {
    //Query the Product model, and get all products
    const products = await Product.find({})

    // res.send("<h1>ALL PRODUCTS WILL BE HERE!</h1>")

    /*********************************************************************
     * Pass the EJS html file to use for displaying all products
     *  in the: res.render() function 
     *  and pass all the products retrieved for the DB as a second argument
     *  so it can be used in the EJS file
     ***********************************************************************/
    res.render('products/index', {products});
});
/***********************************************************************************
 * ******************************************************************************
 **********************************************************************************/

/***************************************************************
 * ************************************************************
 *                         CREATE A NEW PRODUCT
 * ************************************************************ 
*****************************************************************

         Set up a router to display the form a user 
           will use in creating the product

    FYI: THIS ROUTE MUST BE BEFORE THE: '/products/:id ROUTE
         OTHERWISE YOU WILL GET AN ERROR
*****************************************************************/
app.get('/products/new', (req, res) => {
    res.render('products/new');
});

/******************************************************************
 *        Set up a router for when the product created by the user
 *           is going to be submitted to 
******************************************************************/
app.post('/products', async (req, res) => {
    //Get the product sent by the user
      //from req.body (REMEMBER the data needs to be parsed in other to see the actual DATA )
    // And pass it as an argument in the instance to create a new Product 
    const newProduct = new Product(req.body);

    //THEN save the new Product created to the product collection in the database
     //FYI: the .save() method takes time to await it (has it a thenable (Promise like Object))
    await newProduct.save();

    console.log(newProduct);
    // console.log(req.body);
    // console.log('MAKING YOUR PRODUCTS!!');
    
    //THEN REDIRECT TO the show page for this new product
    res.redirect(`/products/${newProduct._id}`);
})



/***************************************************************
 * Set up a router that display datils for a Product in 
****************************************************************/
app.get('/products/:id', async (req, res) => {
    //Get the Id of the Product through req.params
     // and use desturturing to create an id variable to save it to
    const { id } = req.params;

    //Then use: findById(id) to get the product from the database
    const product = await Product.findById(id);
    console.log(product);
    // res.re('Details page!')

    /*********************************************************************
     * Pass the EJS html file to use for displaying the product found
     *  in the: res.render() function 
     *  and pass all the products retrieved for the DB as a second argument
     *  so it can be used in the EJS file
     ***********************************************************************/
    res.render('products/show', { product });
});


/************************************************************`**************************
****************************************************************************************/

//Set App to listen to Requests 
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
