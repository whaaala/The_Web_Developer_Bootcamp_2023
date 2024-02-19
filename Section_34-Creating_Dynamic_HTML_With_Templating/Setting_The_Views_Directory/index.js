const express = require('express');
const app = express();
/*************************************
 * IN ORDER TO FOR EXPRESS TO BE ABLE TO ACCESS
 *  THE VIEWS FOLDER AND THE FILES INSIDE THE FOLDER 
 *       path NEEDS TO BE REQUIRED
 ***************************************************/
const path = require('path');

app.set('view engine', 'ejs')

/**************************************************
 * path HAS A METHOD ON IT CALLED: join() 
 *   AND: __dirname NEEDS TO BE PASSED AS AN ARGUMENT
 *   TO the join() method  AND THE PATH TO THE VIEWS FOLDER
 *   NEEDS TO BE PASSED AS A SECOND ARGUMENT
 * 
 * AND THIS NEEDS TO BE SET WITH: app.set()
 ********************************************************/
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    // res.send('HI')
    res.render('home');
})

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
})

