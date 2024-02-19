//Require JOY(joi)
const { campgroundSchema, reviewSchema } = require('./schemas.js');
//Require the ExpressError Class 
const ExpressError = require('./utils/ExpressError');

//require the campground model of mongoose for the DB
const Campground = require('./models/campground');

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

module.exports.validateCampground = (req, res, next) => {
  //Then pass the actual DATA THROUGH the campgroundSchema created with Joy(Joi)
 // with.validate(req.body),
 const { error } = campgroundSchema.validate(req.body);

 //Then if the validation gives an error create a condition that deal with the error
 // And make sure a new Campground is not created
 if(error){
    //error.details is an array, there .map() function will be used on it 
    // and use the: .join(',') to join the error's together in one string
   const msg = error.details.map(el => el.message).join(',')
   //then pass msg to ExpressError
    throw new ExpressError(msg, 400)
 }else{
    next()
 }
}

/***************************************************************************
 ****      Set up middleware for User permission for actions        ****
 *********************************************************************** 
****************************************************************************/
module.exports.isAuthor = async (req, res, next) => {
//Get the Id of the can=mpground through req.params
 // and use desturturing to create an id variable to save it to
const { id } = req.params;

/*************************************************************
     *  In other to make sure the user that created the campground 
     *  is the only one that can update the campground 
     *  
     *  you will need to :
     *   - first fined the campground in the database
     *   - then compare the campground.author id reference
     *   - to the req.user.id of the user currently logged in
     *   
****************************************************************/
//find the campground
const campground = await Campground.findById(id)
    
//then compare the campground.author id reference to the req.user._id
 // if they are not equals then show the user a flash error message
  // and redirect to the user to the show page of the campground
if(!campground.author.equals(req.user._id)) {
  req.flash('error','You do not have permission to do that')
  return res.redirect(`/campgrounds/${id}`)
}

//called the next function
next()
}

/***************************************************************************
 ****    End of Set up middleware for User permission for actions   ****
 *********************************************************************** 
****************************************************************************/

/***************************************************************************
   ****            Set up middleware for JS Data validation           ****
   *********************************************************************** 
****************************************************************************/
/***************************************************************************
   ****            Set up middleware for JS Data validation           ****
   *********************************************************************** 
****************************************************************************/
module.exports.validateReview = (req, res, next) => {
  //Then pass the actual DATA THROUGH the reviewSchema created with Joy(Joi)
 // with.validate(req.body),
 const { error } = reviewSchema.validate(req.body);

 //Then if the validation gives an error create a condition that deal with the error
 // And make sure a new Review is not created
 if(error){
    //error.details is an array, there .map() function will be used on it 
    // and use the: .join(',') to join the error's together in one string
   const msg = error.details.map(el => el.message).join(',')
   //then pass msg to ExpressError
    throw new ExpressError(msg, 400)
 }else{
    next()
 }
}
/***************************************************************************
 ****          End of Set up middleware for JS Data validation      ****
 *********************************************************************** 
****************************************************************************/