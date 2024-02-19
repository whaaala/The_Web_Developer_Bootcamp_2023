/***************************************************************************
   ***********                REQUIRE's                      ************
   *********************************************************************** 
****************************************************************************/
const mongoose = require('mongoose');

//require the model of mongoose for the DB
const Campground = require('../models/campground')

//require the cities array
const cities = require('./cities')

//require the descriptors and places array
const {descriptors, places} = require('./seedHelper')

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
   ***********       PICK RANDOM PLACES AND DESCRIPTORS       ************
                     FROM THE seedHelper.js file
   *********************************************************************** 
****************************************************************************/
            /*****************************************************
                 **  To pick a random Element from an Array **
                              Pick a random number
                       multiple by the length of the array
                            then floor the total number
                    then use the result to access an Element
                                 out of the array 
                 *********************************************    
            ******************************************************/
const sample = (array) =>{
    return array[Math.floor(Math.random() * array.length)]
} 
/***************************************************************************
   ***********    End of PICK RANDOM PLACES AND DESCRIPTORS   ************
   *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ***********            REMOVEE ALL DOCUMENTS               ************
                     FROM THE COLLECTION IN THE DATABASE
                              And ADD NEW ONE's
   *********************************************************************** 
****************************************************************************/
const seedDB = async () => {
    //Then use: .deleteMany() method to delete all the camp documents that exist in database 
     // use: await on the .deleteMany() method as it is like a promise (it a thenable), and it takes time to complete
    await Campground.deleteMany({});
    
/*     //Create a new campground object
    const c = new Campground({title: 'Purple Fields'});

    //Then use: .save() method to save the camp create to database 
     // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
   await c.save() */

   //LOOP THROUGH TO CREATE SEED DOCUMENTS IN THE DB
   for(let i = 0; i <50; i++) {
      //generate a random number
      const random1000 = Math.floor(Math.random() * 1000);

      //Create a new campground object
      const camp = new Campground({
        //Set the location of the campground to city and state
        location: `${cities[random1000].city} , ${cities[random1000].state}`,

        // the random elemet position generated from the: sample function 
          //to pick descriptor and place from the arrays of seedHelpers
        title: `${sample(descriptors)} ${sample(places)}`,
      });
      //Then use: .save() method to save the camps create to database 
     // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
     await camp.save();

   }
}

// Execute the seedDB function and close the database connection
 // seedDB function returns a promise because it and asynchronous function
seedDB()
    .then(() => {
        //Close database connection
        mongoose.connection.close(); 
    });
/***************************************************************************
   ***********         End of REMOVEE ALL DOCUMENTS           ************
   *********************************************************************** 
****************************************************************************/