const express = require('express');
const app = express();
const path = require('path');

const redditData = require('./data.json');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
/*********************************************
 * use app.set to set the path of public directory
 * in other for Express to be able to access 
 * from anywhere
 **************************************************/
app.set(path.join(__dirname, '/public'));
/***********************************
 * Using app,use and express.static
 * to get: CSS and JavaScript Assets
 *  in the public directory
 ************************************/
app.use(express.static('public'));
/*************************************
 * Then refer to the any of the Assets 
 * in any of the EJS Template 
 *  for examples: 
 *    <link rel="stylesheet" href="/app.css">
 *       in the subreddit EJS templates
 **************************************/

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Rockets', 'Monty', 'Stephanie', 'Winston'];
    res.render('cats', {cats});
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', {num});
})

/************************************
 * Make sure there is DATA 
 * otherwise error will be thrown 
 * and display the page
 ************************************/
app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit]
    if(data) {
        res.render('subreddit', {...data});
    }else{
        res.render('notfound', {subreddit});
    }
})


app.listen(3000, () => {
    console.log('Listening on PORT 3000');
})

