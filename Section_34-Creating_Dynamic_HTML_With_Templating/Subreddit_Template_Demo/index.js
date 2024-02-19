const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    // res.send('HI')
    res.render('home');
})


app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    /********************************
     * INFORMATION CAN BE PASSED IN AS AN OBJECT
     * TO EJS
     * AND CAN THEN BE USED IN THE FILE OF EJS
     *****************************************/
    //res.render('random', {random: num});
    res.render('random', {num});
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    res.render('subreddit', {subreddit});
})





app.listen(3000, () => {
    console.log('Listening on PORT 3000');
})

