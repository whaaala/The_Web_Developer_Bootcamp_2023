const express = require('express');
const morgan = require('morgan');

//Require the AppError class 
const AppError = require('./AppError')

const app = express();

/*****************************
 * Use morgan as a middleware
 * with app.use(morgan('tiny'))
 *******************************/
// app.use(morgan('tiny'));
app.use(morgan('common'));
/****************************************************
 *         CREATE A FUNCTION FOR 
 *           MIDDLEWARE TO 
 *             VERIFY PASSWORD
******************************************************/
const verifyPassword = (req, res, next) => {
    //look for and get query String in req.query
    const { password } = req.query;

    //Check if the query value is equals to chickennugget and call next function to continue
     //If not then send a message to the page
    if (password === 'chickennugget'){
        next();
    }else {
        // res.send('SORRY YOU NEED A PASSWORD')
        
        //Send a status code of unauthorised
        res.status(401);
        
        // An error can be thrown from here with a CustomError class you created
        throw new AppError('Password Required', 401)
    }
    next();
};

/********************************************************************************* */
app.get('/', (req, res) => {
    res.send('<h1>HOME PAGE</h1>')
});

//Creating a force error route
app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    res.send('<h1>WOOF! WOOF!!</h1>')
});

/*********************************************************************
 *  Instead of using app.use middleware to protect the routes
 *  middle can actually be passed into a GET route as a second argument
 *  that will then protect the the routes
 ************************************************************************/
app.get('/secret', verifyPassword, (req, res) => {
    res.send('<h1>MY SERECT IS: Sometimes it get to be too much fun and i just cannot stop.</h>')
})

/*********************************************************************
 *  CREATE AN ADMIN ROUTE - > And throw an error if a user is not an Administrator
 ***********************************************************************/
app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin', 403 )
})

// //Middleware Error Handler route (THIS HAS TO BE THE LAST ROUTE ON THE LIST-> IT SHOULD BE JUST ABOVE app.listen function)
// // THIS WILL OVERRIDE THE DEFAULT ERROR CREATED BY EXPRESS
// app.use((err, req, res, next)=>{
//     console.log('************************************************************************');
//     console.log('******************************ERROR*****************************');
//     console.log('************************************************************************');
// })

// //You can also send a status code and use re.send() to send an error message
// app.use((err, req, res, next)=>{
//     console.log('************************************************************************');
//     console.log('******************************ERROR*****************************');
//     console.log('************************************************************************');
//     res.status(500).send('OH BOY, WE GOT AN ERROR!!!!!!!!')
// })

// //IF YOU STILL WANT TO SEE EXPRESS BUILT IN ERROR HANDLER, then Called THE next(err) function
//   // And pass the err argument to it
// app.use((err, req, res, next)=>{
//     console.log('************************************************************************');
//     console.log('******************************ERROR*****************************');
//     console.log('************************************************************************');
//     // res.status(500).send('OH BOY, WE GOT AN ERROR!!!!!!!!');
//     next(err);
// })
/********************************************************************** */

//You can handle the error in the way you want
app.use((err, req, res, next)=>{
    //give status a default value
   const {status = 500, message = 'Something Went Wrong'} = err
   res.status(status).send(message);
   next(err);
})

/********************************************************************************* */

/*********************************************************************************************/
app.listen('3000', () => {
    console.log('App is running on port 3000');
})