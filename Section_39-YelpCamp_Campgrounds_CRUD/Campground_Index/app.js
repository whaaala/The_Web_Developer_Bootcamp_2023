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