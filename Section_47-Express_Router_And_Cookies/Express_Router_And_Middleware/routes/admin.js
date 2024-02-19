const express = require('express');

/***************************************************
 *                   Create a router
****************************************************/
const router = express.Router()
/***************************************************
 *                  End of Create a router
****************************************************/

/***************************************************
 *    Create a Middleware to validate the routes
****************************************************/
//To add a middleware for the routes to use 
 // use: router.use
    // then all routes in the router will use 
     // the middleware
router.use((req, res, next) => {
    if(req.query.isAdmin){
        next();
    }
    res.send('<h1>SORRY NOT AN ADMIN</h1>');
})
/***************************************************
 *  End of Create a Middleware to validate the routes
****************************************************/
/***************************************************
 *           Create a routes for the router
****************************************************/
        /**************************************
         *      Create All of the routes
         *        related to the router
         *        directly to the router
        ****************************************/
router.get('/topsecret', (req, res)=>{
    res.send('<h1>THIS IS TOP SECRET</h1>');
})

router.get('/deleltEeverything', (req, res)=>{
    res.send('<h1>OK DELETED IT ALL</h1>');
})
/***************************************************
 *          End of Create a routes for the router
****************************************************/

/***************************************************
 *           Export the router
****************************************************/
module.exports = router;