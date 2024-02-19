const express = require('express');
const app = express();
const path = require('path');

const redditData = require('./data.json');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
app.set(path.join(__dirname, '/public'));

app.use(express.static('public'));


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

