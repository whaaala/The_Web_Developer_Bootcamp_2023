const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//Require the module created for product, as it as been exported
const Product = require('./models/product');

/********************************************************** */
// Connect to mongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() => {
    console.log('MONGO CONECTION OPEN');
})
.catch(err =>{
    console.log('ERROR CONNECTING TO MONGODB');
    console.log(err)
})
/**********************************************************************/

//Use Express
const app = express();

//Set up EJS and EJS views folder 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/*******************************************************************************/

/******** Set up Routes ********************************************************/
app.get('/', (req, res) => {
    res.send("<h1>Welcome!!!!</h1>")
})
app.get('/dog', (req, res) => {
    res.send("<h1>WOOF!!!!</h1>")
})
/**************************************************************************************/

//Set App to listen to Requests 
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
