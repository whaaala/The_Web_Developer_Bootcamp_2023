const express = require("express");
//Require Multer
const multer  = require('multer');

/***************************************
 * Require the storage from the index.js file
 *  cloudinary
*****************************************/
const { storage } = require('../cloudinary'); // not need to include the index.js file, as node automatically looks for the index.js file
/*****************************************
 * Execute multer 
 * and set the destination for the files
 *   uploaded to be stored
******************************************/
// const upload = multer({ dest: 'uploads/' })

/***************************************
 * set the destination for the files
 *  to the storage variable 
 *  so the files can be uploaded to 
 *   cloudinary
***************************************/
const upload = multer({storage})

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

//require the isLoggedIn middleware function from the middleware file 
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');

//require the controller file for the functions 
const campgrounds= require('../controllers/campgrounds');

/***************************************************
 *           Create a routes for the router
 ****************************************************/
/**************************************
 *      Create All of the routes
 *        related to the router
 *        directly to the router
 ****************************************/

/***************************************************
 * Use: router.route:
 *   To group together all the verbs 
 *     with the same path
*********************************************************/
router.route('/')
        .get(catchAsync(campgrounds.index))
        //Add upload.array('image') as a middleware to upload the image
        .post( isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
        // .post(upload.single('image'), (req, res) => {
        //        console.log(req.file, req.body)
        // })
        //This to allow multiple files to be uploaded
        // .post(upload.array('image'), (req, res) => {
        //        console.log(req.files, req.body)
        // })

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
        .get(catchAsync(campgrounds.showCampground))
        .put(isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))
        .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// /*******************************************
//       **** Get Request for campground Home ****
//            And display all available camps
//                     in the database
//       ***************************************** 
//     ********************************************/
// router.get("/",catchAsync(campgrounds.index));
//             /*********************************************
//              * End of Get Request for campground Home *
//              ******************************************
//             *********************************************/

//         /**************************************************************
//          *        Get Request to:
//          *                  Dispaly form to Create a new campground
//          *          And
//          *        Post Request to:
//          *                 Create a new campground
//          **************************************************************/
//         /***************************************************
//          ** Get Request for form to create campground **
//         ************************************************
//         ****************************************************/

//       //Pass the middleware function, isloggedIn as this route will on be accessible
//        // to a user that is logged in 
//        // if not logged in, the user will be redirected to the login page
// router.get("/new", isLoggedIn, campgrounds.renderNewForm);
//         /*********************************************************
//          ** End of Get Request for form to create campground **
//         ******************************************************
//         **********************************************************/

//         /***************************************************
//                     **    Post Request to send DATA from form    **
//                                 to create campground in the DB
//                     ************************************************ 
//                 ****************************************************/
//          //Pass the middleware function: isloggedIn as this route will on be accessible
//        // to a user that is logged in 
//        // if not logged in, the user will be redirected to the login page
// router.post("/", validateCampground, isLoggedIn, catchAsync(campgrounds.createCampground));
//         /*********************************************************
//          **    End of Post Request to send DATA from form    **
//         ******************************************************
//         **********************************************************/
//         /**************************************************************
//          *        End of Get Request to:
//          *                  Dispaly form to Create a new campground
//          *          And
//          *        Post Request to:
//          *                 Create a new campground
//          **************************************************************/

//         /**************************************************************/

//                 /*********************************************
//                  * Get Request to show a single campground *
//                  *******************************************
//                 *********************************************/
// router.get("/:id", catchAsync(campgrounds.showCampground));
//                 /****************************************************
//                  * End of Get Request to show a single campground *
//                  **************************************************
//                 *****************************************************/

//                 /**************************************************************
//                 *        Get Request to:
//                 *                 Dispaly form to with campground to be Editted
//                 *          And
//                 *        PUT/PATCH Request to:
//                 *                 Edit the campground
//                 **************************************************************/

                /***************************************************
                            **          Get Request get campground      **
                                    And display it on a form 
                                            to be edited
                            ************************************************ 
                ****************************************************/
      //Pass the middleware function: isloggedIn as this route will on be accessible
       // to a user that is logged in 
       // if not logged in, the user will be redirected to the login page
// router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
            /***************************************************
                        **   End of Get Request get campground       **
                                And display it on a form 
                                        to be edited
                        ************************************************ 
                    ****************************************************/
//             /***************************************************
//                         **    PUT Request to send DATA from form    **
//                                     to edit campground in the DB
//                         ************************************************ 
//                     ****************************************************/

//       //Pass the middleware function: isloggedIn as this route will on be accessible
//        // to a user that is logged in 
//        // if not logged in, the user will be redirected to the login page
// router.put("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground));
//             /**************************************************************
//              *        End of Get Request to:
//              *                  Dispaly form to Edit a new campground
//              *          And
//              *        PUT/PATCH Request to:
//              *                  Edit the campground
//              **************************************************************/

//             /***************************************
//                      ****     DELETE Request for      ****
//                                 deleting a campground
//                     ************************************* 
//                     ****************************************/
//           //Pass the middleware function: isloggedIn as this route will on be accessible
//        // to a user that is logged in 
//        // if not logged in, the user will be redirected to the login page
// router.delete( "/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));
//                 /***************************************
//                          ****     End of DELETE Request    ****
//                                     for deleting a campground
//                         ************************************* 
//                         ****************************************/

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
