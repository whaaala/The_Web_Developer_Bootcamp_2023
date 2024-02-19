const express = require('express');

const app = express();

//Require the shelters router
const shelterRoutes = require('./routes/shelters');
//Require the dogs router
const dogRoutes = require('./routes/dogs');


/******************************************************
 *   Use the shelter router
 *           The way to do this is create a routes
 *            the first arugment is to tell
 *               express what PRE FIX PATH to follow 
 *                 when using the router
 *            the second arugment is the name 
 *               name of the router to use
*******************************************************/
// app.use('/', shelterRoutes);

//Instead of haveing /shelters in the shelters.js file (as it is common in all the paths),
 // you can prefix it here and remove it on all the routes in the shelters.js file
app.use('/shelters', shelterRoutes);


/******************************************************
 *   Use the dog router
 *           The way to do this is create a routes 
 *            the first arugment is to tell
 *               express what PRE FIX PATH to follow 
 *                 when using the router
 *            the second arugment is the name 
 *               name of the router to use
*******************************************************/
// app.use('/', shelterRoutes);

//Instead of haveing /shelters in the shelters.js file (as it is common in all the paths),
 // you can prefix it here and remove it on all the routes in the shelters.js file
app.use('/dogs', dogRoutes);


app.listen('3000', () => {
    console.log('listening on Port 3000');
});