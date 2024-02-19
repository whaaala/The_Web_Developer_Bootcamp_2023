const express = require('express');
const app = express();

/********************************************
 * This is used to tell express to parse 
 * form encoded information from the request body
 * and form json information 
 *************************************************/
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>")
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
})

/******************************************
 * To retrieve DATA FROM A FORM 
 * THE REQUEST OBJECT HAS AN ATTRIBUTE CALL: body
 * THAT CONTAINS THE DATA FROM THE FORM
 *  
 *  THE DATA NEEDS TO BE PARSED IN OTHER 
 *  TO RETRIEVE THE KEY VALUE PAIRS IN THE FORM
 ***********************************************/
// app.post('/tacos', (req, res) => {
//     console.log(req.body);
//     res.send("POST /tacos response");
// })

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`);
})

app.listen(3000, () =>{
    console.log('Listening on port 3000');
})