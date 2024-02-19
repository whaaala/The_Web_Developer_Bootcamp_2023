//Create a middleware function that will check if a user is logged 
 //and then allow the user to access different routes
  // and export the function
module.exports.isLoggedIn = (req, res, next) => {
    /*****************************************************************************
   * PROTECT THIS ROUTE -> SO only LOGGED IN USERS CAN CREATE CAMPGROUND
   * 
   *   To do this: 
   *      passport provides an helper method called: isAuthenticated() 
   *         (passport still uses session to store is own details in there) 
   *   this method is automatically added to the request Object 
  ******************************************************************************/
  //create a condition to check if the user is NOT authenticated 
   // then the user should not be able to create campground
      //(if the user is authenticated the request object will contain: isAuthenticated() property)
  if(!req.isAuthenticated()){
    //Display a flash message
    req.flash('error', 'You must be logged in first.');

    //then redirect the user to the login page
    return res.redirect('/login');
  }
  //called the next function if the user is authenticated and logged in
  next();
}