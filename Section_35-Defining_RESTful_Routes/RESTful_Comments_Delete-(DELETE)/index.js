const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
/********************************************
 * Require method-override in other to 
 * override POST REQUEST of the form 
 ********************************************/
const methodOverride = require('method-override');

uuid(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/********************************************
 * Use: app.use to start using the method override 
 * with a String called: _method that will be used 
 * as the attribute name
 ********************************************/
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
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

/*********************************
 *   PATCH /comments/:id - Update one comment
 *********************************/
app.patch('/comments/:id',(req, res) => {
    //Get the id of the comment to be updated 
    const {id} = req.params
    //Get the new comment user updated from req.body
    const newCommentText = req.body.comment;
    //Find the old comment with the id of the comment to be updated
    const foundComment = comments.find(c => c.id === id);
    //Replace the the old comment text with the new comment text
    foundComment.comment = newCommentText;
    //Then redirect back to the comments page
    res.redirect('/comments') 
});

/********************************************
 *   Use get request to get a comment 
 * to be editted and populate it in an form 
 *******************************************/
app.get('/comments/:id/edit', (req, res) => {
    //Get the id of the comment to be updated 
    const {id} = req.params
    //Find the old comment with the id of the comment to be updated
    const comment = comments.find(c => c.id === id);
    //Render a form with the comment found 
    res.render('comments/edit', {comment})
})

/*********************************
 *   DELETE /comments/:id - Delete one comment
 *********************************/
app.delete('/comments/:id',(req, res) => {
    //Get the id of the comment to be updated 
    const {id} = req.params
    //Remove the comment from the list of comments
    comments = comments.filter(c => c.id !== id)
    /*****************************************************
     * comments.fillter will return a new Array without the 
     * comments that is finds
     ******************************************************/
    //Then redirect back to the comments page
    res.redirect('/comments')
})

app.listen(3000, () =>{
    console.log('Listening on port 3000');
});