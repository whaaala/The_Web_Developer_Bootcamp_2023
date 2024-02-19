const express = require("express");

/***************************************************
 *                   Create a router
 ****************************************************/
const router = express.Router();

/***************************************************
 *                  End of Create a router
 ****************************************************/

//require the campground model of mongoose for the DB
const Campground = require('../models/campground');

//Require the catchAsync function to use in waraping the callback in a route
const catchAsync = require('../utils/catchAsync');
//Require the ExpressError Class 
const ExpressError = require('../utils/ExpressError');

//Require JOY(joi)
const { campgroundSchema } = require('../schemas.js');
/********************************************
 * Require method-override in other to 
 * override POST REQUEST of the form 
 * to be a PUT or PATCH or DELETE request
 ********************************************/

/***************************************************************************
   ****            Set up middleware for JS Data validation           ****
   *********************************************************************** 
****************************************************************************/
const validateCampground = (req, res, next) => {
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
   ****          End of Set up middleware for JS Data validation      ****
   *********************************************************************** 
****************************************************************************/

/***************************************************
 *           Create a routes for the router
 ****************************************************/
/**************************************
 *      Create All of the routes
 *        related to the router
 *        directly to the router
 ****************************************/

/*******************************************
      **** Get Request for campground Home ****
           And display all available camps
                    in the database
      ***************************************** 
    ********************************************/
router.get("/",catchAsync(async (req, res) => {
    //use: .find({}) to get all the campground in the database
    // use: await on the ..find({}) method as it is like a promise (it a thenable), and it takes time to complete
    const campgrounds = await Campground.find({});

    //The render the campgrounds found
    /*********************************************************************
     * Pass the EJS html file to use for displaying all campgrounds
     *  in the: res.render() function
     *  and pass all the campground retrieved for the DB as a second argument
     *  so it can be used in the EJS file
     ***********************************************************************/
    res.render("../views/campgrounds/index", { campgrounds });
  })
);
            /*********************************************
             * End of Get Request for campground Home *
             ******************************************
            *********************************************/

        /**************************************************************
         *        Get Request to:
         *                  Dispaly form to Create a new campground
         *          And
         *        Post Request to:
         *                 Create a new campground
         **************************************************************/
        /***************************************************
         ** Get Request for form to create campground **
        ************************************************
        ****************************************************/
router.get("/new", (req, res) => {
  //The render a form that can be used to created a campgrounds
  res.render("../views/campgrounds/new");
});
        /*********************************************************
         ** End of Get Request for form to create campground **
        ******************************************************
        **********************************************************/

        /***************************************************
                    **    Post Request to send DATA from form    **
                                to create campground in the DB
                    ************************************************ 
                ****************************************************/
router.post("/", validateCampground, catchAsync(async (req, res, next) => {
    //Get req.body.campground for the Request
    //And create a new Campground with it with campground Model
    //And save the new campground created to the database
    const campground = new Campground(req.body.campground);

    //Then use: .save() method to save the camp create to database
    // use: await on the .save() method as it is like a promise (it a thenable), and it takes time to complete
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
     req.flash('success', 'Campground created successfully');

    //THEN REDIRECT to the newly created campground page
    res.redirect(`/campgrounds/${campground._id}`);
  })
);
        /*********************************************************
         **    End of Post Request to send DATA from form    **
        ******************************************************
        **********************************************************/
        /**************************************************************
         *        End of Get Request to:
         *                  Dispaly form to Create a new campground
         *          And
         *        Post Request to:
         *                 Create a new campground
         **************************************************************/

        /**************************************************************/

                /*********************************************
                 * Get Request to show a single campground *
                 *******************************************
                *********************************************/
router.get("/:id", catchAsync(async (req, res) => {
    //Get the Id of the campground through req.params.id and pass it in findById(id)
    //Then use: findById(id) to get the campground from the database

    //And populate the reviews
    //.populate('<new of the attribute that is referencing the documents with .ref>') to get the reviews
    //And it associted campground from the database
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );

            //The render the campground found
            /*********************************************************************
             * Pass the EJS html file to use for displaying one campground
             *  in the: res.render() function
             *  and pass the campground retrieved for the DB as a second argument
             *  so it can be used in the EJS file
             ***********************************************************************/
            // res.render('campgrounds/index', {campground});
    res.render("../views/campgrounds/show", { campground });
  })
);
                /****************************************************
                 * End of Get Request to show a single campground *
                 **************************************************
                *****************************************************/

                /**************************************************************
                *        Get Request to:
                *                 Dispaly form to with campground to be Editted
                *          And
                *        PUT/PATCH Request to:
                *                 Edit the campground
                **************************************************************/

                /***************************************************
                            **          Get Request get campground      **
                                    And display it on a form 
                                            to be edited
                            ************************************************ 
                ****************************************************/
router.get("/:id/edit", catchAsync(async (req, res) => {
    //Get the Id of the campground through req.params.id and pass it in findById(id)
    //Then use: findById(id) to get the campground from the database
    const campground = await Campground.findById(req.params.id);

            //The render the campground found to editted form
            /*********************************************************************
             * Pass the EJS html file to use for displaying one campground
             *  in the: res.render() function
             *  and pass the campground retrieved for the DB as a second argument
             *  so it can be used in the EJS file
             ***********************************************************************/
    // res.render('campgrounds/index', {campground});
    res.render("../views/campgrounds/edit", { campground });
  })
);
            /***************************************************
                        **   End of Get Request get campground       **
                                And display it on a form 
                                        to be edited
                        ************************************************ 
                    ****************************************************/
            /***************************************************
                        **    PUT Request to send DATA from form    **
                                    to edit campground in the DB
                        ************************************************ 
                    ****************************************************/
router.put("/:id", catchAsync(async (req, res) => {
    //Get the Id of the can=mpground through req.params
    // and use desturturing to create an id variable to save it to
    const { id } = req.params;

    //Then use: .findByIdAndUpdate(<id>, <data to be updated>) method
    //To update the camp in the database
    // use: await on the .findByIdAndUpdate() method
    // as it is like a promise (it a thenable), and it takes time to complete
    //Use: ...Object Name to spread the properites into single key value pairs
    // Pass {runValidators: true} as a third argument in other to make that
    // findByIdAndUpdate() validation is enabled (as it is disabled by default)
    // The:  new: true, is to return the product updated NOT the old product
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });

    //THEN REDIRECT TO the page of the campgrund that just been updated
    res.redirect(`/campgrounds/${campground._id}`);
  })
);
            /**************************************************************
             *        End of Get Request to:
             *                  Dispaly form to Edit a new campground
             *          And
             *        PUT/PATCH Request to:
             *                  Edit the campground
             **************************************************************/

            /***************************************
                     ****     DELETE Request for      ****
                                deleting a campground
                    ************************************* 
                    ****************************************/
router.delete( "/:id", catchAsync(async (req, res) => {
    //Get the Id of the campground through req.params
    // and use desturturing to create an id variable to store it
    const { id } = req.params;

    //Then use: findByIdAndDelete(id) to get and Delete the product in the database
    // await the findByIdAndDelete(id), as ti takes long to return (it is a thenable)
    const deleteCampground = await Campground.findByIdAndDelete(id);

    //THEN REDIRECT TO the index page that show all the campgrounds
    res.redirect("/campgrounds");
  })
);
                /***************************************
                         ****     End of DELETE Request    ****
                                    for deleting a campground
                        ************************************* 
                        ****************************************/

/*******************************************************************************************************************
 *                                CREATE REIVW ROUTE FOR a campground
 *********************************************************************************************************************/

/***************************************************
 *          End of Create a routes for the router
 ****************************************************/

/***************************************************
 *           Export the router
 ****************************************************/
module.exports = router;
