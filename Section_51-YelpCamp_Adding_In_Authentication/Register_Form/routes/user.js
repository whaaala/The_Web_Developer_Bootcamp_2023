const express = require("express");

/***************************************************
 *                   Create a router
 ****************************************************/
const router = express.Router();

/***************************************************
 *                  End of Create a router
 ****************************************************/

//require the user model of mongoose for the DB
const User = require('../models/user');

/***************************************************
 *           Create a routes for the router
 ****************************************************/
/*************************************************************************
 *                               Register A user
*************************************************************************/

  /******************************************************
   *   Display a registration form to register A user
  *******************************************************/
router.get('/register', (req, res) => {
    res.render('users/register')
})

  /*****************************************************************
   *   Create the route the form for register a user will submit to
  *******************************************************************/
router.post('/register', async (req, res) => {
    res.send(req.body)
})

/***************************************************
 *           Export the router
 ****************************************************/
module.exports = router;
