const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

//let express app use cookie parser
//by executing cookie parser in app.use
app.use(cookieParser());

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

app.listen('3000', () => {
    console.log('Listening on 3000');
});