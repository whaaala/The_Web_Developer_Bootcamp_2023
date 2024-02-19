const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//Require the module created for product, as it as been exported
const Product = require('./models/product');

/********************************************
 * Require method-override in other to 
 * override POST REQUEST of the form 
 ********************************************/
const methodOverride = require('method-override');

//Require the AppError class you created 
const AppError = require('./AppError'); 


/********************************************************** */
// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
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
 * Use: app.use to start using the method override 
 * with a String called: _method that will be used 
 * as the attribute name
 ********************************************/
app.use(methodOverride('_method'));

/*******************************************************************************/

/**********************************************************************************
 *                   Set of wrappers to be used insted of try-catch
 *                   for Async callback function in a route
 **********************************************************************************/

function wrapAsync(fn){
    //fn refers to the async callback function that is passed in 
    //this function NEEDS to return a function 
      // And the function returned will have a parameter of req, res, next
       //has that is been passed an arguments to the fn function: 
             //the async callback function in the request
       //Then a .catch is chained to fn function
         // this will catch any errors that occurs in of fn function
          // And then pass it as an argument to the next function
    return function(req, res, next){
        fn(req, res, next).catch(e => next(e));
    }
}
/**********************************************************************************
 *                  End of Set of wrappers to be used insted of try-catch
 *                   for Async callback function in a route
 **********************************************************************************/


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
 
      ******************************************************
      *          Add code a list of Categories             *
      * ****************************************************/
const categories = ['fruit', 'vegetable', 'dairy'];


/***************************************************************
 * Set up a router that displays all Products in the DB
****************************************************************/
app.get('/products', wrapAsync(async (req, res, next) => {
    
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
}));
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
app.post('/products',  wrapAsync(async (req, res, next) => {
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
}));
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

       /***************************************************
        * Pass the async callback function 
        * in a wrapper called: wrapAsync(callback)
        *    wrapAsync(callback) returns a function 
        *    And the function is going to called 
        *      the callback function of the
        *              get request
        * 
       ****************************************************/
app.get('/products/:id', wrapAsync(async(req, res, next) => {
    //Get the Id of the Product through req.params
    // and use desturturing to create an id variable to save it to
    const { id } = req.params;
    
    //Then use: findById(id) to get the product from the database
    const product = await Product.findById(id);
    
    /*********************************************
    *     Create a conditon that will handle
    *        the error if a product is  not 
    *                 found
    *  and pass the custom error created into 
    *      next() function
    ********************************************/
    if(!product){
        throw new AppError('Product not found', 404);
    }
        
    /*********************************************************************
    * Pass the EJS html file to use for displaying the product found
    *  in the: res.render() function 
    *  and pass all the products retrieved for the DB as a second argument
    *  so it can be used in the EJS file
    ***********************************************************************/
    res.render('products/show', { product });
}));

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
app.get('/products/:id/edit',  wrapAsync(async (req, res, next) => {
    //Get the Id of the Product through req.params
    // and use desturturing to create an id variable to save it to
    const { id } = req.params;
    
    //Then use: findById(id) to get the product from the database
    const product = await Product.findById(id);
    
    /*********************************************
    *     Create a conditon that will handle
    *        the error if a product is  not 
    *                 found
    *  and pass the custom error created into 
    *      next() function
    ********************************************/
    if(!product){
        throw new AppError('Product not found', 404);
    }
    
    //The pass it as a second argument to the render function 
    // in other to able to use it to display the product on the 
    // form of the EJS file
    res.render('products/edit', {product, categories}) ;
}));

     /********************************************* 
      *     send the update product to the DB     *
     **********************************************/
app.put('/products/:id/',  wrapAsync(async (req, res, next) => {
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
}));
/***********************************************************************************
 * ******************************************************************************
 **********************************************************************************/

/***************************************************************
 * ************************************************************
 *                         DELETE A PRODUCT
 * ************************************************************ 
*****************************************************************/
app.delete('/products/:id',  wrapAsync(async (req, res, next) => {
   //Get the Id of the Product through req.params
   // and use desturturing to create an id variable to save it to
   const { id } = req.params;
    
    //Then use: findByIdAndDelete(id) to get and Delete the product in the database
    // await the findByIdAndDelete(id), as ti takes long to return (it is a thenable)
    const deleteProduct = await Product.findByIdAndDelete(id);
    
    //THEN REDIRECT TO the index page that show all the products
    res.redirect('/products');
}));
/***************************************************************
 * ************************************************************
 *                       End of DELETE A PRODUCT
 * ************************************************************ 
*****************************************************************/

/***************************************************************
 * ************************************************************
 *                      Custom Error Handler
 * ************************************************************ 
*****************************************************************/
//You can handle the error in the way you want
app.use((err, req, res, next)=>{
    //give status a default value
    //give message a default value
   const {status = 500, message = 'Something Went Wrong'} = err
   res.status(status).send(message);
})


/************************************************************`**************************
****************************************************************************************/

//Set App to listen to Requests 
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
