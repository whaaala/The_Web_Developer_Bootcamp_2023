const express = require('express');
const morgan = require('morgan');

const app = express();

/*****************************
 * Use morgan as a middleware
 * with app.use(morgan('tiny'))
 *******************************/
app.use(morgan('tiny'));
// app.use(morgan('common'));
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
/******************************************************************** */
//Logging request Method and path from request (Creating what morgan does parcially)
app.use((req, res, next) => {
    req.requestTime = Date.now()
    console.log(req.method.toLocaleUpperCase(), req.path, req.requestTime);
    next();
});
/******************************************************************** */

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('<h1>HOME PAGE</h1>')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('<h1>WOOF! WOOF!!</h1>')
})


app.listen('3000', () => {
    console.log('App is running on port 3000');
})