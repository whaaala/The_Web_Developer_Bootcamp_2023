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

//require the model of mongoose for the DB
const Campground = require('./models/campground');

//Require the catchAsync function to use in waraping the callback in a route
const catchAsync = require('./utils/catchAsync');
//Require the ExpressError Class 
const ExpressError = require('./utils/ExpressError');

// //Require JOY(joi)
// const Joi = require('joi');

//Require campgroundSchema from jsSchemas file
const {campgroundSchema} = require('./jsSchemas.js')
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
   ***********              Create a Middleware               ************
                             for JOI DATA validation
   *********************************************************************** 
****************************************************************************/
const validateCampground = (req, res, next) => {
   /************************************************************************
       * Define a basic Schema Structure for Campground with JOY(joi)
       *      FYI:
       *           This is NOT A mongoose Schema 
       *            this is a JavaScript Schema that is going validate 
       *             the data before you even attempt to save it 
       *               with mongoose
   ****************************************************************************/
   
   // const campgroundSchema = Joi.object({
   //    //Pass in the different DATA attributes you want 
   //     //campground hold the data object and it is required
   //    campground: Joi.object({
   //       //Then pass in different Key that are nested in campground
   //       title: Joi.string().required(),
   //       price: Joi.number().required().min(0),
   //       image: Joi.string().required(),
   //       location: Joi.string().required(),
   //       description: Joi.string().required()
   //    }).required()
   // });
   /************************************************************************
    * End of Define a basic Schema Structure for Campground with JOY(joi)
    *      FYI:
    *           This is NOT A mongoose Schema 
    *            this is a JavaScript Schema that is going validate 
    *             the data before you even attempt to save it 
    *               with mongoose
   ************************************************************************/
   
   //Then pass the actual DATA THROUGH the campgroundSchema created with Joy(Joi)
   // with.validate(req.body),
   const { error } = campgroundSchema.validate(req.body)
   
   //Then if the validation gives an error create a condition that deal with the error
    // And make sure a new Campground is not created
   if(error){
      //error.details is an array, there .map() function will be used on it 
      // and use the: .join(',') to join the error's together in one string
     const msg = error.details.map(el => el.message).join(',')
     //then pass msg to ExpressError
      throw new ExpressError(msg, 400)
   }else{
      next();
   }
}





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
   ***********           Start of Routes Creation            ************
   *********************************************************************** 
****************************************************************************/

    /***************************************
      ***  Get Request for Home Page   ****
      ************************************* 
    ****************************************/
app.get('/', (req, res) => {
   //use res.render('EJS FILE') TO DISPLAY THE HTML FILE FOR THE HOME PAGE
    res.render('home')
});
    /***************************************
      * End of Get Request for Home Page  *
      ************************************* 
    ****************************************/

    /*******************************************
      **** Get Request for campground Home ****
           And display all available camps
                    in the database
      ***************************************** 
    ********************************************/      
app.get('/campgrounds', catchAsync(async (req, res) => {
   //use: .find({}) to get all the campground in the database 
    // use: await on the ..find({}) method as it is like a promise (it a thenable), and it takes time to complete
   const campgrounds = await Campground.find({});

   //The render the campgrounds found 
      /*********************************************************************
        * Pass the EJS html file to use for displaying all campgrounds
        *  in the: res.render() function 
        *  and pass all the campground retrieved for the DB as a second argument
        *  so it can be used in the EJS file
      ***********************************************************************/
   res.render('campgrounds/index', {campgrounds});
        
}));
   /*********************************************
      * End of Get Request for campground Home *
      ****************************************** 
    *********************************************/ 

/**************************************************************
 *        Get Request to: 
 *                  Dispaly form to Create a new campground
 *          And 
 *        Post Request to:
 *                 Create a new campground     
 **************************************************************/
    /***************************************************
       ** Get Request for form to create campground **
       ************************************************ 
    ****************************************************/
app.get('/campgrounds/new', (req, res) => {
   //The render a form that can be used to created a campgrounds 
   res.render('campgrounds/new');
});
    /*********************************************************
       ** End of Get Request for form to create campground **
       ****************************************************** 
    **********************************************************/ 
   
   /***************************************************
       **    Post Request to send DATA from form    **
                   to create campground in the DB
       ************************************************ 
    ****************************************************/
   //Pass in the middleware function for joi data validation as a secnod argument
app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
   //Get req.body.campground for the Request
   //And create a new Campground with it with campground Model
   //And save the new campground created to the database  
   const campground = new Campground(req.body.campground);
   
   //Then use: .save() method to save the camp create to database 
   // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
   await campground.save();
   
   //THEN REDIRECT to the newly created campground page
   res.redirect(`/campgrounds/${campground._id}`);

   //     /***********************************
   //   *  Use trycatch block
   //   *  to catch errors created 
   //   ************************************/
   // try {
   //    //Get req.body.campground for the Request
   //      //And create a new Campground with it with campground Model
   //        //And save the new campground created to the database  
   //    const campground = new Campground(req.body.campground);
   
   //    //Then use: .save() method to save the camp create to database 
   //    // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
   //    await campground.save();
   
   //    //THEN REDIRECT to the newly created campground page
   //    res.redirect(`/campgrounds/${campground._id}`);
      
   // } catch (e) {
   //    //Use the next() function and pass the error been caught to it and arguments
   //    next(e);
   // }

}));
   /*********************************************************
      **    End of Post Request to send DATA from form    **
      ****************************************************** 
   **********************************************************/ 
/**************************************************************
 *        End of Get Request to: 
 *                  Dispaly form to Create a new campground
 *          And 
 *        Post Request to:
 *                 Create a new campground     
 **************************************************************/

/**************************************************************/       

    /*********************************************
      * Get Request to show a single campground *
      ******************************************* 
    *********************************************/
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    //Get the Id of the campground through req.params.id and pass it in findById(id)
      //Then use: findById(id) to get the campground from the database
    const campground = await Campground.findById(req.params.id);

   //The render the campground found 
      /*********************************************************************
        * Pass the EJS html file to use for displaying one campground
        *  in the: res.render() function 
        *  and pass the campground retrieved for the DB as a second argument
        *  so it can be used in the EJS file
      ***********************************************************************/
      // res.render('campgrounds/index', {campground});
      res.render('campgrounds/show',{campground});
}));
    /****************************************************
      * End of Get Request to show a single campground *
      ************************************************** 
    *****************************************************/

/**************************************************************
 *        Get Request to: 
 *                 Dispaly form to with campground to be Editted
 *          And 
 *        PUT/PATCH Request to:
 *                 Edit the campground     
 **************************************************************/
   /***************************************************
       **          Get Request get campground      **
                 And display it on a form 
                         to be edited
       ************************************************ 
    ****************************************************/
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    //Get the Id of the campground through req.params.id and pass it in findById(id)
      //Then use: findById(id) to get the campground from the database
   const campground = await Campground.findById(req.params.id);

    //The render the campground found to editted form 
      /*********************************************************************
        * Pass the EJS html file to use for displaying one campground
        *  in the: res.render() function 
        *  and pass the campground retrieved for the DB as a second argument
        *  so it can be used in the EJS file
      ***********************************************************************/
      // res.render('campgrounds/index', {campground});
   res.render('campgrounds/edit',{campground});
}));
   /***************************************************
       **   End of Get Request get campground       **
                 And display it on a form 
                         to be edited
       ************************************************ 
    ****************************************************/
 /***************************************************
       **    PUT Request to send DATA from form    **
                   to edit campground in the DB
       ************************************************ 
    ****************************************************/
//Pass in the middleware function for joi data validation as a secnod argument
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
   //Get the Id of the Product through req.params
   // and use desturturing to create an id variable to save it to
   const { id } = req.params;
   
   //Then use: .findByIdAndUpdate(<id>, <data to be updated>) method 
    //To update the camp in the database 
        // use: await on the .findByIdAndUpdate() method 
         // as it is like a promise (it a thenable), and it takes time to complete
      //Use: ...Object Name to spread the properites into single key value pairs
           // Pass {runValidators: true} as a third argument in other to make that 
             // findByIdAndUpdate() validation is enabled (as it is disabled by default) 
              // The:  new: true, is to return the product updated NOT the old product
   const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true}); 

   //THEN REDIRECT TO the page of the campgrund that just been updated
   res.redirect(`/campgrounds/${campground._id}`);
}));
/**************************************************************
 *        End of Get Request to: 
 *                  Dispaly form to Edit a new campground
 *          And 
 *        PUT/PATCH Request to:
 *                  Edit the campground     
 **************************************************************/

    /***************************************
      ****     DELETE Request for      ****
                 deleting a campground
      ************************************* 
    ****************************************/
app.delete('/campgrounds/:id', catchAsync(async (req, res) =>{
   //Get the Id of the Product through req.params
   // and use desturturing to create an id variable to store it
   const { id } = req.params;

   //Then use: findByIdAndDelete(id) to get and Delete the product in the database
    // await the findByIdAndDelete(id), as ti takes long to return (it is a thenable)
   const deleteCampground = await Campground.findByIdAndDelete(id);

      //THEN REDIRECT TO the index page that show all the campgrounds
      res.redirect('/campgrounds');

}));
    /***************************************
      ****     End ofDELETE Request    ****
               for deleting a campground
      ************************************* 
    ****************************************/

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