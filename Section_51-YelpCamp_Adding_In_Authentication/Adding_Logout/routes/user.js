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


//Require the catchAsync function to use in waraping the callback in a route
const catchAsync = require('../utils/catchAsync');
//Require the ExpressError Class 
const ExpressError = require('../utils/ExpressError');


/***************************************************
 *           Create a routes for the router
 ****************************************************/
/*************************************************************************
 *                               Register A user
*************************************************************************/

  /******************************************************
   *   Display a registration form to register A user
  *******************************************************/
router.get('/register', (req, res) => {
    res.render('users/register')
})

  /*****************************************************************
   *   Create the route the form for register a user will submit to
  *******************************************************************/
    /*****************************************************
     *  Using the catchAsync wrapper, means any error 
     *  cut from something going wrong with creaing a user 
     *     (for exmaple the user been created already exist)
     *  it will be thrown to the errorhandler middleware 
    ********************************************************/
router.post('/register', catchAsync(async (req, res) => {
     /*******************************************************
      *  BUT just going to the default error handler
      * and sending the user to any error page 
      *
      *  a try-catch block can be created to catch any error
      *   that occurrs there and then handle the error 
      *   by flashing the error message with: .flash()
      *   and redirecting to the the same register page
     ***********************************************************/
  try{
    //Desturcture the username and password  to varibles 
    // inthe req.body object
    const  {email, username, password } = req.body;
    
    //Instead of hashing the password on here, you can create a middleware
    // (A .pre middleware) in the User model to hash the password
    // of a user during the creation of the user 
    //Therefore you pass the actual password to the User model and let the User take care of the hashing
    const user = new User({email, username});
    
    //Then use: .register(<pass in the user created>, '<the password to be created for the user in the DB>')
    //On the User model and await it
    const registeredUser = await User.register(user, password);

    console.log(registeredUser);

    /******************************************************
    * Before redirecting to the campground page 
    *  use req.flash() to set a success message 
    *  that the campground has been successfully created 
    * 
    * the first arugment is the Key 
    * the second arugment is the the message 
    * 
    * FYI:
    *    THIS SHOULD BE DONE AFTER USER HAS BEEN 
    *    SUCCESSFUL SAVED TO THE DB
   ********************************************************/
   req.flash('success','Welcome to Yelp Camp!');

   //THEN REDIRECT to the newly created campground page
   res.redirect(`/campgrounds`);

  }catch(err){
    req.flash('error', err.message);
    res.redirect(`/register`);
  }
}));

/*************************************************************************
 *                              Login A user
*************************************************************************/
  /******************************************************
   *   Display a login form to allow a user to login
  *******************************************************/
router.get('/login', (req, res) => {
    res.render('users/login')
})


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
router.post('/login', passport.authenticate('local',  {failureFlash: true, failureRedirect: '/login'}), async (req, res) => {
    /******************************************************
    * Before redirecting to the campground page 
    *  use req.flash() to set a success message 
    *  that the campground has been successfully created 
    * 
    * the first arugment is the Key 
    * the second arugment is the the message 
    * 
    * FYI:
    *    THIS SHOULD BE DONE AFTER USER HAS BEEN 
    *    SUCCESSFUL LOGGED IN 
   ********************************************************/
    req.flash('success','Welcome back!!');

      //THEN REDIRECT to the newly created campground page
      res.redirect(`/campgrounds`);
   
})


/*************************************************************************
 *                              Logout A user
*************************************************************************/
  /**************************************************************
   * There is a method provided by passport called: logout()
   *  this method is on the request object  
  ***************************************************************/
 //Create a route to logout a user
router.get('/logout', (req, res) => {
  //Use: req.logout and pass a callback function that handles the error of the logout
  req.logout(function (err) {
    if (err) {
        return req.flash('error', 'There is an error logging you out');;
    }

   /******************************************************
    * Before redirecting to the campground page 
    *  use req.flash() to set a success message 
    *  that the campground has been successfully created 
    * 
    * the first arugment is the Key 
    * the second arugment is the the message 
    * 
    * FYI:
    *    THIS SHOULD BE DONE AFTER USER HAS BEEN 
    *    SUCCESSFUL LOGGED OUT 
   ********************************************************/
    req.flash('success', 'Goodbye!');
  
    //THEN REDIRECT to the newly created campground page
    res.redirect('/campgrounds');
  });
})

/***************************************************
 *           Export the router
 ****************************************************/
module.exports = router;
