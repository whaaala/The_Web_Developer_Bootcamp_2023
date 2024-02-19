const express = require('express');
const app = express();

/***************************************
 * use app.set() (TAKEs IN TWO ARGUMENT: A propery, and it value)
 *  to set EJS configuration
 * 
 *   ejs DOES NOT NEED TO BE REQUIRED, 
 *      IT NEEDS TO BE SET WITH app.set() 
 *        and EXPRESS BEHIND THE SCENE WITH REQUIRE IT
 *****************************************/
app.set('view engine', 'ejs')
/**************************************
 * NOTE:
 *    BY DEFULT WHEN USING A VIEW ENGINE 
 *        EXPRESS IS GOING TO ASSUME THAT THE views ARE TEMPLATES 
 *        THAT EXIST IN A DIRECTORY CALLED: views
 * 
 * THE extention OF THE FILES IN THE VIEWS DIRECTORY 
 * NEEDS TO BE: .ejs
 * 
 *************************************/

/***********************************************
 * res.render(<file name>),
 *  is used to render a view file to the client 
 *   BY PASSING IN THE FILE NAME REQUIRED 
 *      FROM THE VIEWS DIRECTORY
 **********************************************/
app.get('/', (req, res) => {
    // res.send('HI')
    res.render('home');
})

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
})

