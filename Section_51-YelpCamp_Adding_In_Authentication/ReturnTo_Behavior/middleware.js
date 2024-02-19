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
    /****************************************************************************************
     * Store the URL the user is trying to get to when the user is logged in
     * 
     * To get the URL the user go to 
     *     on the request Object, there is req.path and req.originalUrl
     *    
     * path: is the path route in the for the request like: /new
     * originalUrl: is the full path of the request to the to the path like: /campgrounds/new 
     * 
     * Use the originalUrl to the full path of the request and store on the session
     *     so it can be accessed from any route
    ******************************************************************************************/
   //Store the path the user is trying to access without logging in the seesion
   req.session.returnTo = req.originalUrl;

    //Display a flash message
    req.flash('error', 'You must be logged in first.');

    //then redirect the user to the login page
    return res.redirect('/login');
  }
  //called the next function if the user is authenticated and logged in
  next();
}

//Create a Middleware to store the path a user is trying to access before logging in 
/****************************************************************************************
     * Store the URL the user is trying to get to when the user is logged in
     * 
     * To get the URL the user go to 
     *     on the request Object, there is req.path and req.originalUrl
     *    
     * path: is the path route in the for the request like: /new
     * originalUrl: is the full path of the request to the to the path like: /campgrounds/new 
     * 
     * Use the originalUrl to the full path of the request and store on the session
     *     so it can be accessed from any route
******************************************************************************************/
//Store the path the user is trying to access without logging in the seesion
 // in the session
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
}