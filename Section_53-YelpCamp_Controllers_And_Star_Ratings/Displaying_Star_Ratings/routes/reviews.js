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

//require the controller file for the functions 
const reviews = require('../controllers/reviews');

/***************************************************************************
   ***         Create a route to create review for a campground        ***
   *********************************************************************** 
****************************************************************************/
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
 /***************************************************************************
    ***     End of Create a route to create review for a campground     ***
    *********************************************************************** 
 ****************************************************************************/
 
 /***************************************************************************
    ***         Create a route to Delete review for a campground        ***
    *********************************************************************** 
 ****************************************************************************/
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));
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
