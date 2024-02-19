/***************************************************************************
   ***********                REQUIRE's                      ************
   *********************************************************************** 
****************************************************************************/
const express = require('express');
const path = require('path'); //THIS IS TO LET JS USE path TO NAVIGATE 
                              // IN THE PROJECT FOR FOLDERS AND FILES IN THEM
const mongoose = require('mongoose');

//require EJS-Mate
const ejsMate = require('ejs-mate');

//require the campground model of mongoose for the DB
const Campground = require('./models/campground');

//require the review model of mongoose for the DB
const Review = require('./models/review');

//Require the catchAsync function to use in waraping the callback in a route
const catchAsync = require('./utils/catchAsync');
//Require the ExpressError Class 
const ExpressError = require('./utils/ExpressError');

//Require the campgrounds router
const camgroundsRoutes = require('./routes/campgrounds');

//Require the campgrounds router
const reviewsRoutes = require('./routes/reviews');

//Require JOY(joi)
const { campgroundSchema, reviewSchema } = require('./schemas.js');
/********************************************
 * Require method-override in other to 
 * override POST REQUEST of the form 
 * to be a PUT or PATCH or DELETE request
 ********************************************/
const methodOverride = require('method-override');

/***************************************************************************
   ***********                End of REQUIRE's                ************
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********            CONNECT TO MONGOOSE DB              ************
   *********************************************************************** 
****************************************************************************/
// Connect to mongoDB and pass the DATABASE NAME: yelp-camp 
const db = mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log('Database connected -> MONGODB');
})
.catch(err =>{
    console.log('Error connecting to database -> MONGODB');
    console.log(err)
})
/***************************************************************************
   ***********         End of CONNECT TO MONGOOSE DB          ************
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********             Initialize Express for use         ************
   *********************************************************************** 
****************************************************************************/
const app = express();
/***************************************************************************
   ***********       End of Initialize Express for use        ************
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********             Set up EJS for use                 ************
   *********************************************************************** 
****************************************************************************/
//Then tell Express to use for the EJS Engine: EJS-Mate
app.engine('ejs', ejsMate); // this is one of the egnine that is use to 
                            // run and parse and basically make sense of EJS
                             // so tell express to use this instead of 
                                // of the default engine
                                
//Set up EJS and EJS views folder 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/***************************************************************************
   ***********          End of Setting up EJS for use         ************
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********               Set up Parser for:               ************
                              application/json
                        application/x-www-form-urlencoded
   *********************************************************************** 
****************************************************************************/
//Add parers to app in other to be able to get the data sent by the user from a form in the raw form
// app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/***************************************************************************
   ***********            End of Set up Parser for:           ************
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********            Set up Method Override             ************
                      To pass PUT OR PATH AND DELETE 
                             AS A POST REQUEST
                                FOR A FROM 
   *********************************************************************** 
****************************************************************************/

/********************************************
 * Use: app.use to start using the method override 
 * with a String called: _method that will be used 
 * as the attribute name
 ********************************************/
app.use(methodOverride('_method'));

/***************************************************************************
   ***********         End of Set up EJS-Mate to use          ************
   *********************************************************************** 
****************************************************************************/

/******************************************************
 *   Use the campgtound router
 *           The way to do this is create a routes
 *            the first arugment is to tell
 *               express what PRE FIX PATH to follow 
 *                 when using the router
 *            the second arugment is the name 
 *               name of the router to use
*******************************************************/
app.use('/campgrounds', camgroundsRoutes);

app.use('/campgrounds/:id/reviews', reviewsRoutes);


/***************************************************************************
   ****        Add a Baisc 404 Error for routes that dont exist       ****
   *********************************************************************** 
****************************************************************************/
//app.all is for all the request 
  // the * is for every path that is not yet a route
  app.all('*', (req, res, next) => {
   /*******************************************
    *      Pass the custom error created into 
    *      next() function
   ********************************************/
  next(new ExpressError('Page Not Found', 404))

});
/***************************************************************************
   ****    End of Add a Baisc 404 Error for routes that dont exist   ****
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********        Create an Error Handler meddleware      ************
   *********************************************************************** 
****************************************************************************/
app.use((err, req, res, next) => {
   //Destructure from error to get error message and statuscode and give them default values
   // const {statusCode= 500, message= 'Something went wrong!'} = err;
   const {statusCode= 500} = err;
   //If the is no message passed throuhg the created a default message
   if(!err.message) err.message = 'Oh No, Something Went Wrong!'
   //Use the error message and status code thrown by the ExpressError class
   //By passing it to the EJS File to be used in the template  
   res.status(statusCode).render('error', {err})
   res.send('OH BOY, Something went wrong!')
});
/***************************************************************************
   *******         End of Create an Error Handler meddleware      ********
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********          Create App to listen for Request      ************
   *********************************************************************** 
****************************************************************************/
app.listen('3000', () => {
    console.log('Serving on PORT 3000');
});
/***************************************************************************
   ***********         End of App to listen for Request       ************
   *********************************************************************** 
****************************************************************************/