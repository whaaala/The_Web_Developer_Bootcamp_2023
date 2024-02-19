const express = require("express");
/***************************************************
 *                   Create a router
 ****************************************************/
 /*******************************************
  * In other to have access to the id 
  *  in the req.params attribute of request object 
  *  that is passed in the route  
  *    the one that is been used in:
  *           app.use('/campgrounds/:id/reviews', reviewsRoutes);
  * 
  *   AS by default you wont have access to the id 
  *   as routers get separate params 
  *       (they get there own params) 
  * 
  * You will need to pass an arugment object
  *   :{mergeParams: true}
  *  to the router 
  *     in other to have access to the id 
  *      in the req.params attribute of request object 
  *    for express itself
***********************************************/
//passing {mergeParams: true} to merge params 
 // from express application to router
const router = express.Router({mergeParams: true});

/***************************************************
 *                  End of Create a router
 ****************************************************/

//require the campground model of mongoose for the DB
const Campground = require('../models/campground');

//require the review model of mongoose for the DB
const Review = require('../models/review');

//Require JOY(joi)
const { reviewSchema } = require('../schemas.js');

//Require the catchAsync function to use in waraping the callback in a route
const catchAsync = require('../utils/catchAsync');
//Require the ExpressError Class 
const ExpressError = require('../utils/ExpressError');

//require the isLoggedIn middleware function from the middleware file 
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

/***************************************************************************
   ***         Create a route to create review for a campground        ***
   *********************************************************************** 
****************************************************************************/
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    //Get the Id of the campground through req.params.id and pass it in findById(id)
       //Then use: findById(id) to get the campground from the database
    const campground = await Campground.findById(req.params.id);
 
    //Then create a new review for the campground found
     //Pass req.body.review: as the DATA is grouped together in a rview object
    const review = new Review(req.body.review);

      /************************************
       * Then asociate the reivew created 
       * to the user that created it
       * 
      * By:
     *   passing the req.user._id to the review.author attribute 
     *   in the review model  
       ************************************/
      review.author = req.user._id
 
     //Then push the new review created to the campground reviews attribute array
     campground.reviews.push(review);
     
    //THEN save the new review created to the review collection in the database
      //FYI: the .save() method takes time to await it (has it a thenable (Promise like Object))
    await review.save();
 
    //THEN save the updated campground to the campground collection in the database
     //FYI: the .save() method takes time to await it (has it a thenable (Promise like Object))
    await campground.save();

    
     /******************************************************
     * Before redirecting to the campground page 
     *  use req.flash() to set a success message 
     *  that the campground has been successfully created 
     * 
     * the first arugment is the Key 
     * the second arugment is the the message 
     * 
     * FYI:
     *    THIS SHOULD BE DONE AFTER campground HAS BEEN 
     *    SUCCESSFUL SAVED TO THE DB
    ********************************************************/
     req.flash('success', 'New review created successfully');
 
    //THEN REDIRECT TO the show of the campground found 
    res.redirect(`/campgrounds/${campground._id}`);
 
    // res.send('YOU MADE IT')
 }));
 /***************************************************************************
    ***     End of Create a route to create review for a campground     ***
    *********************************************************************** 
 ****************************************************************************/
 
 /***************************************************************************
    ***         Create a route to Delete review for a campground        ***
    *********************************************************************** 
 ****************************************************************************/
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) =>{
    //Get the Id of the campground and the reviewId through req.params
    // and use desturturing to create an id variable to store it
    const { id, reviewId } = req.params;
 
    //Get the Id of the campground through req.params.id and delete a the review from it
     //Then use: findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
      // {$pull: {reviews: reviewId}} will remove the reference of review 
       // from the campground will updating it
      /*********************************************************************
       * To DO THIS: 
       *         Use: $pull operator
       *              $pull: 
       *                   operator removes from an existing array
       *                   all instances of a value or values
       *                   that match the a specified condition 
       *********************************************************************/
    const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    
    //Get the Id of the review through req.params.reviewId and pass it in findByIdAndDelete(id)
     //Then use: findById(id) to get the campground from the database
    const reviewToDelete = await Review.findByIdAndDelete(reviewId);

    /******************************************************
     * Before redirecting to the campground page 
     *  use req.flash() to set a success message 
     *  that the campground has been successfully created 
     * 
     * the first arugment is the Key 
     * the second arugment is the the message 
     * 
     * FYI:
     *    THIS SHOULD BE DONE AFTER campground HAS BEEN 
     *    SUCCESSFUL SAVED TO THE DB
    ********************************************************/
    req.flash('success', 'Review deleted successfully');
 

     //THEN REDIRECT TO the show page of the campground found 
     res.redirect(`/campgrounds/${campground._id}`);
 }));
 /***************************************************************************
    ***     End of Create a route to Delete review for a campground     ***
    *********************************************************************** 
 ****************************************************************************/
 
 /*******************************************************************************************************************
  *                                End of CREATE REIVW ROUTE FOR a campground
 *********************************************************************************************************************/

 
/***************************************************
 *           Export the router
 ****************************************************/
module.exports = router;
