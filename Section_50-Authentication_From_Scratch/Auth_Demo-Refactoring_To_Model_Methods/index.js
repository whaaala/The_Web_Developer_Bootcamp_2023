const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//Require Express-session 
const session  = require('express-session');

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

/******************************************************
 *    let app use express-session
 *        express session take in an object argument
 * 
*******************************************************/
// const sessionOptions = {
//     //pass a secret that express-session is going to use 
//       //to sign the cookies that it sends back 
//       secret: 'notagoodsecret',
//       //add resave and set it to fales
//       resave: false,
//       //add saveUninitialized and set it to fales
//       saveUninitialized: false,

// }
//use express-session
app.use(session({secret: 'notagoodsecret'}));
/******************************************************
 * So now for every single route 
 *   for any request Object at any time 
 *     there should be a session property available
 * 
 * When a request is received by the server
 *  the server will respond with a: connect.sid 
 *    that wil be stored in the cookie of the browser of the user 
 * 
 *  then each time the user send a request to the server
 *       the: connect.sid  will be sent along with the request
 * 
 *    the server will use: connect.sid  to recognise the user 
 *   
********************************************************/

/*********************************************************************************
 *  Create a Middleware that check if a user is logged in 
 *      so the user can access routes that require authentication
 *    
 *           and if  they logged in 
 *                then use the next() function to continue the request
 *              
 *                if they not logged IN 
 *                  then  stop the request in the middleware
**********************************************************************************/
//create a middleware in a function 
const requirelogin = (req, res, next) => {
    console.log('In Middleware');
    if(!req.session.user_id){
        console.log('In Middleware Redirect');
          // If you NOT logged in successfully you will be r
       // to the /login route
      return res.redirect('/login')
    }
    next()   
}

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
   
   //Instead of hashing the password on here, you can create a middleware
     // (A .pre middleware) in the User model to hash the password
      // of a user during the creation of the user 
      //Therefore you pass the actual password to the User model and let the User take care of the hashing
   const user = new User({ username, password});

  //   /*********************************************************************
  //    *  use: .hash(<passsword>, <number of rounds>) function  
  //    *    to hash the password of the user been created       
  //   **********************************************************************/
  //   const hash = await bcrypt.hash(password, 12);

  //   /*********************************************************************
  //    *                Create a new user with the User model 
  //   **********************************************************************/
  //  const user = new User({ username, password: hash });
   

    /*********************************************************************
     *                Save the new user with mongoose to the database
    **********************************************************************/
   await user.save();

       /***************************************
         * Once the user is sing up  
         *  use: req.session to create a user_id
         * to store the user._id from the DB
         *  and send it to browser 
         *   to store it in it's cookie 
        ****************************************/
       req.session.user_id = user._id;

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

    //Use the findAndValidate method add to the user model: in models/users.js file 
     // to find the user in the database and validate the password of the user
    const foundUser = await User.findAndValidate(username, password);

    // //Then use: findOne({username}) to find and the the user from the database
    // const user = await User.findOne({username});
    // console.log(user);


    // /************************************************************************************************************* 
    //  *    Use:  bcrypt.compare(<password the user input>, <Hash password that is saved in the DB for the user>) 
    //  *     to compare if the password the user entered is a correct one
    // ***************************************************************************************************************/
    // const validPassword = await bcrypt.compare(password, user.password);

    // create a condition to do something if the user details are correct or not
    if(foundUser){
        /***************************************
         * Once the user is logged in 
         *  use: req.session to create a user_id
         * to store the user._id from the DB
         *  and send it to browser 
         *   to store it in it's cookie 
        ****************************************/
       req.session.user_id = foundUser._id;

       console.log(req.session)

       // If you logged in successfully you will be 
       // to the /secret routE
       res.redirect('/secret')
       //res.send('<h1>YAY WELCOME!!</h>')

    }else {
         // If you NOT logged in successfully you will be r
       // to the /login route
       res.redirect('/login')
        //res.send('<h1>TRY AGAIN</h>')
    }
})

/**********************************************************
 * Only Users that are logged in will be allowed to 
 *  see the page for the route 
***********************************************************/
app.get('/secret', requirelogin, (req, res) => {
//     //check if req.session.user_id does not exist and redirect to  
//   // the login page
//   if(!req.session.user_id){
//       return res.redirect('/login');
//   }
  //res.send('<h1>THIS IS SECRET! YOU CANNOT SEE ME UNLESS YOU ARE LOGGED IN</h1>')
  //Render the EJS secret page 
  res.render('secret')
});

/*******************************************************************
 *             Create route that can only be accessed
 *              if a user is logged in
********************************************************************/

/*************************************************************************
 *                              Logout A user
*************************************************************************/
 /******************************************************
  *  All you need to do to log a user 
  *     out of the application
  *  is to rem0ve the user_id from the req.session object 
  *     by setting the user_id to NULL
  * 
  * As the  user_id is the only way to prove 
  *   tht a user is currently logged in
 *******************************************************/
 // Create a route to logout a user
   //Generally this will be a post route
app.post('/logout', (req, res) => {
    //Set the user_id to null
    req.session.user_id = null;
    /**********************************
     *  You can also use:
     *     req.session.destroy()
     *      to logout a user
     * 
     *   The difference req.session.destroy()
     *    will remove the entire session object
     * 
     * therefore if there is more information 
     *  on the session for a user that you want to 
     *    get ride of 
     *      then use: req.session.destroy()
    ************************************/
    // req.session.destroy()

    // Then redirect to the login page
    res.redirect('/login')
})

app.listen(3000, () =>{
    console.log('Listening on port 3000');
})