const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//Require the user module
const User = require('./models/user');

//Require path 
const path = require('path');

/********************************************************** */
// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
.then(() => {
    console.log('MONGO CONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
})
/**********************************************************************/

const app = express();

//Add parers to app in other to be able to get the data send by the user from a form in the raw form
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/*********************************************
 *  Set up EJS
**********************************************/
//Set up EJS and EJS views folder 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




/************************************************************************
 *                   HASH A PASSWORD WITH SALT ADDED
*************************************************************************/
// const hashPassword = async (pw) => {
//     /***********************************************************
//      * gensalt: generate the salt 
//      *  that is added to each password
//      *   before hashing
//     *********************************************************************/
//     const salt = await bcrypt.genSalt(12)
//     console.log(salt);

//     /*********************************************************************
//      *  then use: .hash(<passsword>, <salt generated>) function       
//     **********************************************************************/
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(hash);
// }

  /***********************************************************
   *     You can combine the salt generation and hashing 
   *               in on code block
  ************************************************************/
 const hashPassword = async (pw) => {
    /***********************************************************
     *  Add the number of rounds to .hash method
     *   and the .hash method will do the salt generation
     *    add to the password and the hash it in one goal
    *********************************************************************/
    /*********************************************************************
     *  then use: .hash(<passsword>, <number of rounds>) function       
    **********************************************************************/
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

/************************************************************************
 *                  End of HASH A PASSWORD WITH SALT ADDED
*************************************************************************/

/************************************************************************
 *                   VERIFY A HASH A PASSWORD SALTED STORED 
 *                              WITH A USER'S DETAILS 
*************************************************************************/
      /*************************************************************
       *  Use the: .compare method to compare user details inputted
       *    against the details saved for the user in the DB
       * 
       * FYI: .compare takes in: 
       *       first argument as the plan password te
       *       second argument as the hash password
       * 
       *  the .compare method will return a boolean 
       *     true if the password matches
       *     false if the password does not match
      **************************************************************/
const login = async (pw, hashPw) => {
    //The .
    const result = await bcrypt.compare(pw, hashPw)
    if(result){
        console.log('LOGGED YOU IN! SUCCESSFUL MATCH!!');
    }else {
        console.log('INCORRECT MATCH!!');
    }
}

/************************************************************************
 *                  End of VERIFY A HASH A PASSWORD SALTED STORED 
 *                              WITH A USER'S DETAILS 
*************************************************************************/

// // hashPassword('money');
// login('money', '$2b$12$aOZhdoO1ZpPQN73zdcXam.6yZHiFE9J7ea33BgDpIRV9txo.0DGYO');

/*******************************************************************
 *                        CREATE ROUTES
********************************************************************/

app.get('/', (req, res) => {
    res.send('<h1>THIS IS THE HOME PAGE</h1>')
})


app.get('/secret', (req, res) => {
    res.send('<h1>THIS IS SECRET! YOU CANNOT SEE ME UNLESS YOU ARE LOGGED IN</h1>')
});

/*************************************************************************
 *                               Register A user
*************************************************************************/
  /******************************************************
   *   Display a registration form to register A user
  *******************************************************/
app.get('/register', (req, res) => {
    res.render('register')
})

  /*****************************************************************
   *   Create the route the form for register a user will submit to
  *******************************************************************/
 app.post('/register', async (req, res) => {
    //Desturcture the username and password  to varibles 
     // inthe req.body object
   const  {username, password } = req.body;

    /*********************************************************************
     *  use: .hash(<passsword>, <number of rounds>) function  
     *    to hash the password of the user been created       
    **********************************************************************/
    const hash = await bcrypt.hash(password, 12);

    /*********************************************************************
     *                Create a new user with the User model 
    **********************************************************************/
   const user = new User({ username, password: hash });

    /*********************************************************************
     *                Save the new user with mongoose to the database
    **********************************************************************/
   await user.save();

    /*********************************************************************
     *            Then redirect to the howe page 
    **********************************************************************/
    res.redirect('/');
 })

/*************************************************************************
 *                              Login A user
*************************************************************************/
  /******************************************************
   *   Display a login form to allow a user to login
  *******************************************************/
app.get('/login', (req, res) => {
    res.render('login')
})

  /*****************************************************************
   *   Create the route that the login DATA will be submit to
  *******************************************************************/
app.post('/login', async (req, res) => {
    //Desturcture the username and password  to varibles 
    // in the req.body object
    const  {username, password } = req.body;

    //Then use: findOne({username}) to find and the the user from the database
    const user = await User.findOne({username});
    console.log(user);

    /************************************************************************************************************* 
     *    Use:  bcrypt.compare(<password the user input>, <Hash password that is saved in the DB for the user>) 
     *     to compare if the password the user entered is a correct one
    ***************************************************************************************************************/
    const validPassword = await bcrypt.compare(password, user.password);

    // create a condition to do soething if the user details are correct or not
    if(validPassword){
        res.send('<h1>YAY WELCOME!!</h>')
    }else {
        res.send('<h1>TRY AGAIN</h>')
    }

})

app.listen(3000, () =>{
    console.log('Listening on port 3000');
})