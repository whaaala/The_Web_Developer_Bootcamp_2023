const express = require('express');
const app = express();
const path = require('path');

/********************************************
 * This is used to tell express to parse 
 * form encoded information from the request body
 * and form json information 
 *************************************************/
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
    {
        id: 1,
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: 2,
        username: 'Sykler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: 3,
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: 4,
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
    comments.push({username, comment});
    res.redirect('/comments')
});

/*********************************
 *   GET /comments/:id - Get one comment (using ID)
 *********************************/
app.get('/comments/:id', (req, res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === parseInt(id))
    res.render('comments/show', {comment})
});

app.listen(3000, () =>{
    console.log('Listening on port 3000');
});