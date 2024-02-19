const express = require('express');
const app = express();
const path = require('path');
/********************************************
 * Require uuid to generate a unique identifier
 ********************************************/
const { v4: uuid } = require('uuid');
uuid(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'Sykler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

// app.get('/', (req, res) => {
//     res.send("<h1>Welcome</h1>")
// })

// app.get('/tacos', (req, res) => {
//     res.send("GET /tacos response");
// })

// /******************************************
//  * To retrieve DATA FROM A FORM 
//  * THE REQUEST OBJECT HAS AN ATTRIBUTE CALL: body
//  * THAT CONTAINS THE DATA FROM THE FORM
//  *  
//  *  THE DATA NEEDS TO BE PARSED IN OTHER 
//  *  TO RETRIEVE THE KEY VALUE PAIRS IN THE FORM
//  ***********************************************/
// // app.post('/tacos', (req, res) => {
// //     console.log(req.body);
// //     res.send("POST /tacos response");
// // })

// app.post('/tacos', (req, res) => {
//     const {meat, qty} = req.body;
//     res.send(`OK, here are your ${qty} ${meat} tacos`);
// })

// app.listen(3000, () =>{
//     console.log('Listening on port 3000');
// })

/*****************************************************
 * 
 *    GET /comments  - List all comments
 *    POST /comments - Create a new comment
 *    GET /comments/:id - Get one comment (using ID)
 *    PATCH /comments/:id - Update one comment
 *    DELETE /comments/:id - Delete one comment
 * 
 ********************************************************/

app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>")
});

//GET /comments  - List all comments
app.get('/comments', (req, res) => {
    res.render('comments/index' , {comments})
});

app.get('/comments/new', (req,res) =>{
    res.render('comments/new')
})

//POST /comments - Create a new comment
app.post('/comments', (req,res) =>{
    const {username, comment} = req.body;
    /***************************************
     * Set id with: uuid() and push it
     * with a new comment created by the user
     *****************************************/
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments')
});

/*********************************
 *   GET /comments/:id - Get one comment (using ID)
 *********************************/
app.get('/comments/:id', (req, res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
});

app.listen(3000, () =>{
    console.log('Listening on port 3000');
});