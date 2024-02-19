const express = require('express');

/***************************************************
 *                   Create a router
****************************************************/
const router = express.Router()

/***************************************************
 *                  End of Create a router
****************************************************/

/***************************************************
 *           Create a routes for the router
****************************************************/
        /**************************************
         *      Create All of the routes
         *        related to the router
         *        directly to the router
        ****************************************/
// //Add a get request to get all dogs
// router.get('/dogs', (req, res) => {
//     res.send('<h1>ALL DOGS</h1>');
// })

// //Add a post request to create a dog
// router.post('/dogs', (req, res) => {
//     res.send('<h1>CREATING A DOG</h1>');
// })

// //Add a get request to get a dogs
// router.get('/dogs/:id', (req, res) => {
//     res.send('<h1>VIEWING ONE DOG</h1>');
// })

// //Add a get request to get a form to edit a dogs
// router.get('/dogs/:id/edit', (req, res) => {
//     res.send('<h1>EDITTING A DOG</h1>');
// })
/******************************************* */
//Add a get request to get all shelters
router.get('/', (req, res) => {
    res.send('<h1>ALL DOGS</h1>');
})

//Add a post request to create a shelter
router.post('/', (req, res) => {
    res.send('<h1>CREATING A DOG</h1>');
})

//Add a get request to get a shelter
router.get('/:id', (req, res) => {
    res.send('<h1>VIEWING ONE DOG</h1>');
})

//Add a get request to get a form to edit a shelter
router.get('/:id/edit', (req, res) => {
    res.send('<h1>EDITTING A DOG</h1>');
})
/***************************************************
 *          End of Create a routes for the router
****************************************************/

/***************************************************
 *           Export the router
****************************************************/
module.exports = router;