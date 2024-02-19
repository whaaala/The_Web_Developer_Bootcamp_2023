const express = require('express');
const morgan = require('morgan');

const app = express();

/*****************************
 * Use morgan as a middleware
 * with app.use(morgan('tiny'))
 *******************************/
// app.use(morgan('tiny'));
app.use(morgan('common'));
/****************************************************
 *  app.use()
 *      THIS IS A WAY OF GETTING CODE TO RUN 
 *         ON EVERY SINGLE REQUEST
******************************************************/

/************ Create my own Middleware **************/
// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE");
//     next();
// }) 

// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE");
//     next();
//     console.log("THIS IS MY FIRST MIDDLEWARE --> AFTER NEXT() CALLED");
// })

// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE");
//     return next();
//     //the retrun here is used to make sure that nothing happens after next() is called
//     console.log("THIS IS MY FIRST MIDDLEWARE --> AFTER NEXT() CALLED");
// })

// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE");
//     next();
// }) 
/**************************************************************************************** */

/******************************************************************************** */
//This will only run with incoming requests with the path of: /dogs. for every verb on the path
app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS");
    next()
});



/********************************************************************************* */
app.get('/', (req, res) => {
    res.send('<h1>HOME PAGE</h1>')
})

app.get('/dogs', (req, res) => {
    res.send('<h1>WOOF! WOOF!!</h1>')
})

/********************************************************************************* */
//use: app.use to define a 404, if nothing is match from the request then app.use should return 404 response
app.use((req, res, next) => {
    //the res.status allows you to change the status code and the send: res.send message
    res.status(404).send('<h1>NOT FOUND!!</h1>')
})

/*********************************************************************************************/
app.listen('3000', () => {
    console.log('App is running on port 3000');
})