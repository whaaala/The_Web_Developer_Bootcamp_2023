const express = require('express');
const morgan = require('morgan');

const app = express();

/*****************************
 * Use morgan as a middleware
 * with app.use(morgan('tiny'))
 *******************************/
// app.use(morgan('tiny'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('<h1>HOME PAGE</h1>')
})

app.get('/dogs', (req, res) => {
    res.send('<h1>WOOF! WOOF!!</h1>')
})


app.listen('3000', () => {
    console.log('App is running on port 3000');
})