const express = require('express');
const mongoose = require('mongoose');
//Require Express-session 
const session  = require('express-session');
//Require connect-flash
const flash  = require('connect-flash');
const path = require('path');

//Require the module created for product, as it as been exported
const Product = require('./models/product');

//Require the module created for farm, as it as been exported
const Farm = require('./models/farm');

/********************************************
 * Require method-override in other to 
 * override POST REQUEST of the form 
 ********************************************/
const methodOverride = require('method-override');

/********************************************************** */
// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/flashDemo')
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


/******************************************************
 *    let app use express-session
 *        express session take in an object argument
 * 
*******************************************************/
const sessionOptions = {
    //pass a secret that express-session is going to use 
      //to sign the cookies that it sends back 
      secret: 'thisisnotagoodsecret',
      //add resave and set it to fales
      resave: false,
      //add saveUninitialized and set it to fales
      saveUninitialized: false,

}
//use express-session
app.use(session(sessionOptions));
/******************************************************
 * So now for every single route 
 *   for any request Object at any time 
 *     there should be a session property available
 * 
 * When a request is received by the server
 *  the server will respond with a: connect.sid 
 *    that wil be stored in the cookie of the browser of the user 
 * 
 *  then each time the user send a request to the server
 *       the: connect.sid  will be sent along with the request
 * 
 *    the server will use: connect.sid  to recognise the user 
 *   
********************************************************/

/****************************************************** 
 * After using session 
 *  then use app.use(falsh()) to 
 *  use connect-flash 
*******************************************************/
app.use(flash()) 
/****************************************************
 * All the request will now hae req.flash() function
 *  that can be used for flash messages  
 * 
 * And flash messages is usually done right before
 *  redirecting 
*******************************************************/


/********************************************
 * Use: app.use to start using the method override 
 * with a String called: _method that will be used 
 * as the attribute name
 ********************************************/
app.use(methodOverride('_method'));

/******************************************************
 *    Set up a meddleware  
 *       so flash messages can be accessible by
 *       All EJS templates for the routes
 *        
 *     this is done by using: res.locals
 *        res.locals -> https://expressjs.com/en/4x/api.html#res.locals
 * 
*******************************************************/
app.use((req, res, next)  => {
    //Use flash to get the message that should be passed 
     // When a new farm is created successfully
        //req.flash('<key>')
    res.locals.messages = req.flash('success');

    //then call the next() function to continue
    next();
})

/*******************************************************************************/

/********************************************************************************************
 * ******************************************************************************************
 *                                    SET UP ROUTES 
 * ******************************************************************************************
*********************************************************************************************/
app.get('/', (req, res) => {
    res.send("<h1>Welcome!!!!</h1>")
})

/*************************************************************************************************************** 
 *                                          FARM ROUTES
******************************************************************************************************************/

/***************************************************************
 * Set up a route that displays all farms in the DB
****************************************************************/
app.get('/farms', async (req, res) => {
    //Get all the farms in the database
    const farms = await Farm.find({})
    //Use flash to get the message that should be passed 
    //to an EJS template when a action is carried out
     //req.flash('<key>')
    // res.render('farms/index', {farms, messages: req.flash('success')});
    res.render('farms/index', { farms });
});
/***************************************************************
 * End of Set up a route that displays all farms in the DB
****************************************************************/

/***************************************************************
 * ************************************************************
 *                         CREATE A NEW FARM
 * ************************************************************ 
*****************************************************************
         Set up a router to display the farm a user 
           will use in creating the farm

    FYI: THIS ROUTE MUST BE BEFORE THE: '/farms/:id ROUTE
         OTHERWISE YOU WILL GET AN ERROR
*****************************************************************/
app.get('/farms/new', (req, res) => {
    res.render('farms/new');
});

/******************************************************************
 *        Set up a router for when the product created by the user
 *           is going to be submitted to 
******************************************************************/
app.post('/farms', async (req, res) => {
    //Get the fram sent by the user
      //from req.body (REMEMBER the data needs to be parsed in other to see the actual DATA )
    // And pass it as an argument in the instance to create a new Farm 
    const newFarm = new Farm(req.body);

    //THEN save the new Farm created to the farm collection in the database
     //FYI: the .save() method takes time to await it (has it a thenable (Promise like Object))
    await newFarm.save();

    /******************************************************
     * Before redirecting to the farms page 
     *  use req.flash() to set a success message 
     *  that the farm has been successfully created 
     * 
     * the first arugment is the Key 
     * the second arugment is the the message 
    ********************************************************/
   req.flash('success', 'Farm created successfully');

    //THEN REDIRECT TO the all farms page
    res.redirect(`/farms`);
})
/***************************************************************
 * ************************************************************
 *                       End of CREATE A NEW FARM
 * ************************************************************ 
*****************************************************************


/***************************************************************
 * ************************************************************
 *                         GET ONE FARM
 * ************************************************************ 
*****************************************************************

/***************************************************************
 * Set up a route that display detils for a farm  
****************************************************************/
app.get('/farms/:id', async (req, res) => {
    //Get the Id of the Farm through req.params
     // and use desturturing to create an id variable to save it to
    const { id } = req.params;

    //Then use: findById(id) to get the farm from the database
    const farm = await Farm.findById(id);

    /*********************************************************************
     * Pass the EJS html file to use for displaying the farm found
     *  in the: res.render() function 
     *  and pass all the products retrieved for the DB as a second argument
     *  so it can be used in the EJS file
     ***********************************************************************/
    res.render('farms/show', { farm });
});

/***************************************************************
 * ************************************************************
 *                        End of GET ONE FARM
 * ************************************************************ 
*****************************************************************


/*************************************************************************************************************** 
 *                                          PRODUCT ROUTES
******************************************************************************************************************/

/***************************************************************
 * ************************************************************
 *                         GET ALL PRODUCT
 * ************************************************************ 
 
      ******************************************************
      *          Add code a list of Categories             *
      * ****************************************************/
const categories = ['fruit', 'vegetable', 'dairy'];


/***************************************************************
 * Set up a router that displays all Products in the DB
****************************************************************/
app.get('/products', async (req, res) => {

        /***************************************************************
         * ************************************************************
         *                   CREATE A FILTER TO FILTER THROUGH 
         *                        CATEGORY FOR PRODUCTS
         * ************************************************************ 
        *****************************************************************/
    //Look in: req.query to see the query as a category and get it
    const {category} = req.query;

/********************************************************************************** */
    //Then use an if statement to get all products for the category in the DB
    // and else to get all products in the DB if the is no category in: req.query
    if(category){
        //Query the Product model, and get all products thar matches the category
        const products = await Product.find({category})
        
        //The render the products found for the category

            /*********************************************************************
            * Pass the EJS html file to use for displaying all products
            *  in the: res.render() function 
            *  and pass all the products retrieved for the DB as a second argument
            *  so it can be used in the EJS file
            * 
            *     PASS THE category for the EJS file in other to be able 
            *      to use it to display the category the product belongs to
            *      on the page
            ***********************************************************************/
        res.render('products/index', {products, category});
        
    }else {
        //Query the Product model, and get all products
        const products = await Product.find({})

        /*********************************************************************
         * Pass the EJS html file to use for displaying all products
         *  in the: res.render() function 
         *  and pass all the products retrieved for the DB as a second argument
         *  so it can be used in the EJS file
         * 
         * *     PASS category:'All' for the EJS file in other to be able 
            *      to use it to display the category the product belongs to
            *      on the page
         ***********************************************************************/
        res.render('products/index', {products, category:'All'});
    }

    // res.send("<h1>ALL PRODUCTS WILL BE HERE!</h1>")

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
    //pass in the categories Array created to the EJS file
    res.render('products/new', {categories});
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
/***********************************************************************************
 * ******************************************************************************
 **********************************************************************************/


/***************************************************************
 * ************************************************************
 *                         GET ONE PRODUCT
 * ************************************************************ 
*****************************************************************

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

/***********************************************************************************
 * ******************************************************************************
 **********************************************************************************/

/***************************************************************
 * ************************************************************
 *                         UPDATE A PRODUCT
 * ************************************************************ 
*****************************************************************/
     /********************************************* 
      *     Display the product to be updated     *
     **********************************************/
app.get('/products/:id/edit', async (req, res) => {
    //Get the Id of the Product through req.params
     // and use desturturing to create an id variable to save it to
     const { id } = req.params;

    //Then use: findById(id) to get the product from the database
    const product = await Product.findById(id);

    //The pass it as a second argument to the render function 
     // in other to able to use it to display the product on the 
      // form of the EJS file
    res.render('products/edit', {product, categories}) ;
})

     /********************************************* 
      *     send the update product to the DB     *
     **********************************************/
app.put('/products/:id/', async (req, res) => {
    //Get the Id of the Product through req.params
     // and use desturturing to create an id variable to save it to
     const { id } = req.params;

     //Then use: findByIdAndUpdate(id, req.body) to get and update the product in the database
      // Pass {runValidators: true} as a third argument in other to make that 
        // findByIdAndUpdate() validation is enabled (as it is disabled by default) 
        // The:  new: true, is to return the product updated NOT the old product
     const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});

     //THEN REDIRECT TO the show page for this new product
    res.redirect(`/products/${product._id}`);

    // console.log(req.body);
    // res.send('PUT!!!!');
}),
/***********************************************************************************
 * ******************************************************************************
 **********************************************************************************/

/***************************************************************
 * ************************************************************
 *                         DELETE A PRODUCT
 * ************************************************************ 
*****************************************************************/
app.delete('/products/:id', async (req, res) => {
    //Get the Id of the Product through req.params
     // and use desturturing to create an id variable to save it to
     const { id } = req.params;

     //Then use: findByIdAndDelete(id) to get and Delete the product in the database
      // await the findByIdAndDelete(id), as ti takes long to return (it is a thenable)
    const deleteProduct = await Product.findByIdAndDelete(id);

     //THEN REDIRECT TO the index page that show all the products
     res.redirect('/products');
    
});

/************************************************************`**************************
****************************************************************************************/

//Set App to listen to Requests 
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
