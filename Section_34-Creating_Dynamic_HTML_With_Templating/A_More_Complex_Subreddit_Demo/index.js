const express = require('express');
const app = express();
const path = require('path');
/**************************
 * Requiring the data.json file
 *************************/
const redditData = require('./data.json');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));


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

// /************************************
//  * Passing the value from req.params
//  *  and using it to get data form redditData.json
//  ************************************/
// app.get('/r/:subreddit', (req, res) => {
//     const {subreddit} = req.params;
//     const data = redditData[subreddit]
//    console.log(data);
//     /*********************************************************
//      * Spread the data object when passing to the EJS template
//      *  in other to have access to each property 
//      **********************************************************/
//     res.render('subreddit', {...data});
// })

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

