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
// //Add a get request to get all shelters
// router.get('/shelters', (req, res) => {
//     res.send('<h1>ALL SHELTERS</h1>');
// })

// //Add a post request to create a shelter
// router.post('/shelters', (req, res) => {
//     res.send('<h1>CREATING A SHELTER</h1>');
// })

// //Add a get request to get a shelter
// router.get('/shelters/:id', (req, res) => {
//     res.send('<h1>VIEWING ONE SHELTER</h1>');
// })

// //Add a get request to get a form to edit a shelter
// router.get('/shelters/:id/edit', (req, res) => {
//     res.send('<h1>EDITTING A SHELTER</h1>');
// })
/**************************************************** */
//Add a get request to get all shelters
router.get('/', (req, res) => {
    res.send('<h1>ALL SHELTERS</h1>');
})

//Add a post request to create a shelter
router.post('/', (req, res) => {
    res.send('<h1>CREATING A SHELTER</h1>');
})

//Add a get request to get a shelter
router.get('/:id', (req, res) => {
    res.send('<h1>VIEWING ONE SHELTER</h1>');
})

//Add a get request to get a form to edit a shelter
router.get('/:id/edit', (req, res) => {
    res.send('<h1>EDITTING A SHELTER</h1>');
})
/***************************************************
 *          End of Create a routes for the router
****************************************************/

/***************************************************
 *           Export the router
****************************************************/
module.exports = router;