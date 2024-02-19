const express = require('express');
const session  = require('express-session');

const app = express();


/******************************************************
 *    let app use express-session
 *        express session take in an object argument
 * 
*******************************************************/
//use express-session
app.use(session({
    //pass a secret that express-session is going to use 
      //to sign the cookies that it sends back 
    secret: 'thisisnotagoodsecret',
}));
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
app.get('/viewcount', (req, res) =>{
    //Now anything you want can be added to the 
     //session that be stored in the cookie of  
       //user's browser
    if(req.session.count){
        req.session.count += 1;
    }else{
        req.session.count = 1;
    }

    res.send(`You have viewed this page ${req.session.count} times`)
})

app.listen('3000', () => {
    console.log('Listening on port 3000');
})