//require the user model of mongoose for the DB
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
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
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = async (req, res) => {
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

    
  /**********************************************************************************
   *  Get the path that the user is trying to access before the user 
   *   is logged in 
   *     
   *      FYI: 
   *          This path is already saved to the session in the isLoggedIn middleware
   *          function in the middleware.js file
  *************************************************************************************/
 // Get the page the user is try to access before the user logged in or get the: /campgrounds, page
 const redirectUrl = res.locals.returnTo || '/campgrounds';
//  console.log(req.session);
//  console.log(res.locals);
 
 //After you gett the path the user is trying to access before the user logged in, once that path  is used
  // Delete that path from the locals
 delete res.locals.returnTo

//  console.log(req.session);
//  console.log(res.locals);


// //Redirect a user to the page the user is trying to login to or get the: /campgrounds, page
// res.redirect(redirectUrl);


      //THEN REDIRECT to the newly created campground page
      // res.redirect(`/campgrounds`);
 res.redirect(redirectUrl);
   
}

module.exports.logout = (req, res) => {
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
}