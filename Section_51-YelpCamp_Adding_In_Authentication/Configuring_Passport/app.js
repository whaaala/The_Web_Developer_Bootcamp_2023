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

//require the user model of mongoose for the DB
const User = require('./models/user');

//Require the catchAsync function to use in waraping the callback in a route
const catchAsync = require('./utils/catchAsync');
//Require the ExpressError Class 
const ExpressError = require('./utils/ExpressError');

//Require the campgrounds router
const camgroundsRoutes = require('./routes/campgrounds');

//Require the campgrounds router
const reviewsRoutes = require('./routes/reviews');

/***************************************************
 *             Require the passport  
 ****************************************************/
//Require passport
const passport = require('passport');

//Require passport local 
const LocalStrategy = require('passport-local');
/***************************************************
 *          End of Require the passport  
 ****************************************************/


/********************************************
 * Require method-override in other to 
 * override POST REQUEST of the form 
 * to be a PUT or PATCH or DELETE request
 ********************************************/
const methodOverride = require('method-override');

//Require Express-session 
const session  = require('express-session');

//Require connect-flash
const flash  = require('connect-flash');
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
   *   Use app.use(express.static('<name of directory (which is public)>')) 
   *      to let the app use the    
   *      folder to serve CSS or javascript for EJS files to use           
   *********************************************************************** 
****************************************************************************/
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

/******************************************************
 *    let express app use express-session
 *        express session take in an object argument
 * 
*******************************************************/
const sessionConfig = {
   //pass a secret that express-session is going to use 
     //to sign the cookies that it sends back 
     secret: 'thisshoulbeabettersecret',
     //add resave and set it to fales
     resave: false,
     //add saveUninitialized and set it to true
     saveUninitialized: true,
     //add fancy options for the cookie that is sent back to the server
     cookie: {
      //Add httpOnly and set it to true --> see doc https://owasp.org/www-community/HttpOnly
      httpOnly: true,
      //Set an expiration date for the cookie
        /**********************************************************************************************
         *  Date.now() is used to get the timestamp of the current date and time in milliseconds
         *    then  it added to 
         *      1000 milliseconds (that is a second)
         *        multiple by 60 seconds (that is 1 minute)
         *        multiple by 60 minutes (that is 1 hour)
         *        multiple by 24 hours (that is 1 day)
         *        multiple by 7 day 
         *    this will make the cookie expire in 7 days
        *********************************************************************************************/
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, 
       //Set a maxAge for the cookie
       maxAge: 60 * 60 * 24 * 7

     }

}
//use express-session
app.use(session(sessionConfig));
/******************************************************
* So now for every single route 
*   for any request Object at any time 
*     there should be a session property available
* 
* When a request is received by the server
*  the server will respond with a: connect.sid 
*    that wil be stored in the cookie of the browser of the user 
* 
*  then each time the user send a request to the server
*       the: connect.sid  will be sent along with the request
* 
*    the server will use: connect.sid  to recognise the user 
*   
********************************************************/

/****************************************************** 
 * After using session 
 *  then use app.use(falsh()) to 
 *  use connect-flash 
*******************************************************/
app.use(flash()) 
/****************************************************
 * All the request will now hae req.flash() function
 *  that can be used for flash messages  
 * 
 * And flash messages is usually done right before
 *  redirecting 
*******************************************************/

/*****************************************************
 *  Let the app use passport 
 *   by using: 
 *         app.use(passport.initialize())
 * 
 * Let it also use passport session
 *  by using: 
 *      app.use(passport.session())
 *  for presistent authentication 
 *           so logged in user can again access 
 *           to routes they are allowed to access
 *            without logging in for each request
 *  FYI: MAKE SURE: 
 *              app.use(session(<data>));
 *       IS USED BEFORE:
 *              app.use(passport.session())
**********************************************************/
app.use(passport.initialize())
app.use(passport.session())

  /*************************************************************
   *  Then use passport.use(new LocalStrategy(<user model>.authenticate()))
   *  
   *   This is tell passport to use the localStrategy that is required
   *   and for that locaStrategy the authentication method 
   *    is going to be located on the User model 
   *     and its called: authenticate
   *    
   *     this authenticate method is from passport
  **************************************************************/
passport.use(new LocalStrategy(User.authenticate()))

  /*************************************************************
   *  Then use passport.serializeUser(<user model>.serializeUser())
   *  
   *   This is telling passport how to serialize a user
   * 
   *  serialization 
   *     refers to how to store a user in the session
   * 
   *  this serializeUser method is from passport
  **************************************************************/
  passport.serializeUser(User.serializeUser())

  /*************************************************************
   *  Then use passport.deserializeUser(<user model>.serializeUser())
   *  
   *   This is telling passport how to deserialize a user
   * 
   *  deserialization 
   *     refers to how to get a user out of the session
   * 
   * this deserializeUser method is from passport
  **************************************************************/
  passport.deserializeUser(User.deserializeUser())

/**********************************************************
 *  End of Let the app use passport 
**********************************************************/

/******************************************************
 *    Set up a meddleware  
 *       so flash messages can be accessible by
 *       All EJS templates for the routes
 *        
 *     this is done by using: res.locals
 *        res.locals -> https://expressjs.com/en/4x/api.html#res.locals
 * 
*******************************************************/
app.use((req, res, next)  => {
   //Use flash to get the message that should be passed 
    // When a new capground is created successfully
       //req.flash('<key>')
   res.locals.success = req.flash('success');

   //Use flash to get the message that should be passed 
     // When a new capground is not created successfully
       //req.flash('<key>')
   res.locals.error = req.flash('error');

   //then call the next() function to continue
   next();
})

/***************************************************************
 *    Create a fake dummy user with: .register method 
 *         provided by passport
*****************************************************************/
app.get('/fakeUser', async (req, res) => {
   //create a user instance from User model, but DO NOT pass in the pasword
   const user = new User({ email: 'foo@bar.com', username: 'baba'});
   console.log(user);
   
   //Then use: .register(<pass in the user created>, '<the password to be created for the user in the DB>')
    //On the User model and await it
   const newUser = await User.register(user, 'Password123!');

   res.send(newUser)
})


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

    /***************************************
      ***  Get Request for Home Page   ****
      ************************************* 
    ****************************************/
app.get('/', (req, res) => {
   //use res.render('EJS FILE') TO DISPLAY THE HTML FILE FOR THE HOME PAGE
    res.render('home')
});


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