const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// //let express app use cookie parser
// //by executing cookie parser in app.use
// app.use(cookieParser());

/******************************************
 *  To use Signed cookies
 *       A SECERT NEEDS TO BE
 *        PASSED AS AN ARGUMENT
 *         IN cookie parser
*******************************************/
//let express app use cookie parser
//by executing cookie parser in app.use
  // And pass a secret as an argument
app.use(cookieParser('thisismysecret'));



//Set up a route
app.get('/greet',(req, res) => {
    //req.cookies contains the cookies from the browser
     // that made the request
    //console.log(req.cookies);
    const { name = 'No-name'} = req.cookies
    res.send(`HEY THERE!!!! ${name}`)
})

//Set up a route
app.get('/setname',(req, res) => {
    //Set a cookie to be stored in a user's browser
    res.cookie('name',"Baba's World");
    res.send('OK, SENT YOU A COOKIE!!!!')
})

//Send signed cookie route
app.get('/getsignedcookie', (req, res) => {
    //Send a signed cookie
     //by addding a third argument to:
     // res.cookie which is: {signed: true}
    res.cookie('fruit', 'grape', {signed: true});
    res.send('COOKIES SIGNED');
})

//Get signed cookie route
app.get('/verifyfruit', (req, res) => {
    /*****************************
     * To get a signed cookie
     *    you have to get from 
     *    :req.signedCookies 
     *       property
     * 
     * FYI: 
     *    This property only exit 
     *    on the req object 
     *    if you are using cookie-parser
     *    and passing a secret key 
     *     as an argument in 
     *      cookie-parser
    *******************************/
    console.log(req.signedCookies);
    console.log(req.cookies);
    res.send(req.signedCookies)
})

app.listen('3000', () => {
    console.log('Listening on 3000');
});