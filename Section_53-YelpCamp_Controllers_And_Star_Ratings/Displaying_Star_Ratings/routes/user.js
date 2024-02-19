const express = require("express");

/***************************************************
 *                   Create a router
 ****************************************************/
const router = express.Router();

/***************************************************
 *                  End of Create a router
 ****************************************************/

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

//require the user model of mongoose for the DB
const User = require('../models/user');

//require the controller file for the functions 
const users = require('../controllers/user');


//Require the catchAsync function to use in waraping the callback in a route
const catchAsync = require('../utils/catchAsync');
//Require the ExpressError Class 
const ExpressError = require('../utils/ExpressError');

//require the isLoggedIn middleware function from the middleware file 
const { storeReturnTo } = require('../middleware');


/***************************************************
 *           Create a routes for the router
 ****************************************************/
/***************************************************
 * Use: router.route:
 *   To group together all the verbs 
 *     with the same path
*********************************************************/

/*************************************************************************
 *                               Register A user
*************************************************************************/
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

//   /******************************************************
//    *   Display a registration form to register A user
//   *******************************************************/
// router.get('/register', users.renderRegister)

//   /*****************************************************************
//    *   Create the route the form for register a user will submit to
//   *******************************************************************/
//     /*****************************************************
//      *  Using the catchAsync wrapper, means any error 
//      *  cut from something going wrong with creaing a user 
//      *     (for exmaple the user been created already exist)
//      *  it will be thrown to the errorhandler middleware 
//     ********************************************************/
// router.post('/register', catchAsync(users.register));

/*************************************************************************
 *                              Login A user
*************************************************************************/
router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local',  {failureFlash: true, failureRedirect: '/login'}), users.login)

  /******************************************************
   *   Display a login form to allow a user to login
  *******************************************************/
// router.get('/login', users.renderLogin)


  /*****************************************************************
   *   Create the route that the login DATA will be submit to
  *******************************************************************/
          /*****************************************************************************************
           * Passport provides a middleware that can be used: 
           *     called passport.authenticate()
           *  And passport.authenticate() takes as an argument: local
           *  this is the strategy at when the user is going to be 
           *  authenticated (there an be facebook, twitter authentication also)
           *    
           *  Then an Object can be passed in as a second argument containing: 
           *      {failureFlash: true, failureRedirect: <what path to redirect if the login fails>}
           *    
           *    failureFlash: will flash a message automatically (this is from passport)
           *          
          *****************************************************************************************/
  //add the  storeReturnTo middleware function as an argument
// router.post('/login',  storeReturnTo, passport.authenticate('local',  {failureFlash: true, failureRedirect: '/login'}), users.login)


/*************************************************************************
 *                              Logout A user
*************************************************************************/
  /**************************************************************
   * There is a method provided by passport called: logout()
   *  this method is on the request object  
  ***************************************************************/
 //Create a route to logout a user
router.get('/logout', users.logout)

/***************************************************
 *           Export the router
 ****************************************************/
module.exports = router;
