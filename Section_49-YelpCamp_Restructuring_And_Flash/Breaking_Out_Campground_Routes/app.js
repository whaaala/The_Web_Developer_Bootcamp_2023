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

/***************************************************************************
   ****            Set up middleware for JS Data validation           ****
   *********************************************************************** 
****************************************************************************/

const validateReview = (req, res, next) => {
    //Then pass the actual DATA THROUGH the reviewSchema created with Joy(Joi)
   // with.validate(req.body),
   const { error } = reviewSchema.validate(req.body);

   //Then if the validation gives an error create a condition that deal with the error
   // And make sure a new Review is not created
   if(error){
      //error.details is an array, there .map() function will be used on it 
      // and use the: .join(',') to join the error's together in one string
     const msg = error.details.map(el => el.message).join(',')
     //then pass msg to ExpressError
      throw new ExpressError(msg, 400)
   }else{
      next()
   }
}

/***************************************************************************
   ****          End of Set up middleware for JS Data validation      ****
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


// /***************************************************************************
//    ***********           Start of Routes Creation            ************
//    *********************************************************************** 
// ****************************************************************************/

    /***************************************
      ***  Get Request for Home Page   ****
      ************************************* 
    ****************************************/
app.get('/', (req, res) => {
   //use res.render('EJS FILE') TO DISPLAY THE HTML FILE FOR THE HOME PAGE
    res.render('home')
});

/***************************************************************************
   ***         Create a route to create review for a campground        ***
   *********************************************************************** 
****************************************************************************/
app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
   //Get the Id of the campground through req.params.id and pass it in findById(id)
      //Then use: findById(id) to get the campground from the database
   const campground = await Campground.findById(req.params.id);

   //Then create a new review for the campground found
    //Pass req.body.review: as the DATA is grouped together in a rview object
   const review = new Review(req.body.review);

    //Then push the new review created to the campground reviews attribute array
    campground.reviews.push(review);
    
   //THEN save the new review created to the review collection in the database
     //FYI: the .save() method takes time to await it (has it a thenable (Promise like Object))
   await review.save();

   //THEN save the updated campground to the campground collection in the database
    //FYI: the .save() method takes time to await it (has it a thenable (Promise like Object))
   await campground.save();

   //THEN REDIRECT TO the show of the campground found 
   res.redirect(`/campgrounds/${campground._id}`);

   // res.send('YOU MADE IT')
}));
/***************************************************************************
   ***     End of Create a route to create review for a campground     ***
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***         Create a route to Delete review for a campground        ***
   *********************************************************************** 
****************************************************************************/
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) =>{
   //Get the Id of the campground and the reviewId through req.params
   // and use desturturing to create an id variable to store it
   const { id, reviewId } = req.params;

   //Get the Id of the campground through req.params.id and delete a the review from it
    //Then use: findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
     // {$pull: {reviews: reviewId}} will remove the reference of review 
      // from the campground will updating it
     /*********************************************************************
      * To DO THIS: 
      *         Use: $pull operator
      *              $pull: 
      *                   operator removes from an existing array
      *                   all instances of a value or values
      *                   that match the a specified condition 
      *********************************************************************/
   const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   
   //Get the Id of the review through req.params.reviewId and pass it in findByIdAndDelete(id)
    //Then use: findById(id) to get the campground from the database
   const reviewToDelete = await Review.findByIdAndDelete(reviewId);

    //THEN REDIRECT TO the show page of the campground found 
    res.redirect(`/campgrounds/${campground._id}`);
}));
/***************************************************************************
   ***     End of Create a route to Delete review for a campground     ***
   *********************************************************************** 
****************************************************************************/

/*******************************************************************************************************************
 *                                End of CREATE REIVW ROUTE FOR a campground
*********************************************************************************************************************/

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