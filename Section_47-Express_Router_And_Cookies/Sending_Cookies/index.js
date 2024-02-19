const express = require('express');
const app = express();

//Set up a route
app.get('/greet',(req, res) => {
    res.send('HEY THERE!!!!')
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