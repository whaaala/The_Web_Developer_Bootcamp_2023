/***************************************************************************
   ***********                REQUIRE's                      ************
   *********************************************************************** 
****************************************************************************/
const express = require('express');
const path = require('path'); //THIS IS TO LET JS USE path TO NAVIGATE 
                              // IN THE PROJECT FOR FOLDERS AND FILES IN THEM
const mongoose = require('mongoose');

//require the model of mongoose for the DB
const Campground = require('./models/campground')
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
app.get('/campgrounds', async (req, res) => {
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
        
})
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
app.post('/campgrounds', async (req, res) => {
   //Get req.body.campground for the Request
     //And create a new Campground with it with campground Model
       //And save the new campground created to the database  
   const campground = new Campground(req.body.campground);

   //Then use: .save() method to save the camp create to database 
   // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
   await campground.save();

   //THEN REDIRECT to the newly created campground page
   res.redirect(`/campgrounds/${campground._id}`);
})
   /*********************************************************
      **    End of Post Request to send DATA from form    **
      ****************************************************** 
   **********************************************************/ 

/**************************************************************/       

    /*********************************************
      * Get Request to show a single campground *
      ******************************************* 
    *********************************************/
app.get('/campgrounds/:id', async (req, res) => {
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


})
    /****************************************************
      * End of Get Request to show a single campground *
      ************************************************** 
    *****************************************************/

//     /***************************************
//       * Get Request to make a campground  *
//       ************************************* 
//     ****************************************/
// app.get('/makecampground', async (req, res) => {
//    //Create a new campground object
//    const camp = new Campground({title: 'My Backyard', description: 'Cheap camping!'});
   
//    //Then use: .save() method to save the camp create to database 
//      // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
//    await camp.save()
//     res.send(camp);
// });
//     /***************************************
//       *End of Get Request make a campground*
//       ************************************* 
//     ****************************************/


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