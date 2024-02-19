const express = require('express');
const app = express();

//app.get('<path that is matching>', A callback function)
app.get('/', (req, res) => {
    res.send('<h1>This the home page</h1>');
})



// /***********************************
//  * Paths Parameters ARE USED TO DIFINE PATTERNS THAT CAN BE USED
//  * TO GENERATE DYNAMIC URLs using :<pattern name>
// */
// app.get('/r/:subreddit', (req, res) => {
//     res.send("THIS IS A SUBREDDIT")
// })

/******************************************
 * QUERY STRING IS A PORTION OF THE URL 
 * THAT COMES AFTER A QUESTON MARK 
 *  
 *  INFORMATIONS CAN BE INCLUDED IN KEY VALUE PIARS
 * 
 *    APPLICATIONS ARE OFTEN SET UP SO THAT THEY ARE EXPECTING
 *     SOMETHING IN THE QUERY STRING
 *  
 * THE REQUEST OBJECT HAS A PORPERTY CALLED: query
 *  THIS PROPERTY CONTAINS KEY VALUE PAIRS BASED ON THE QUERY STRING
 **********************************************************************/
// app.get('/search', (req, res) => {
//     console.log(req.query);
//     res.send(`HI!`)
// })

/****************************************************** */
app.get('/search', (req, res) => {
    const {q} = req.query;
    if(!q){
        res.send("NOTHING FOUND IF NOTHING SEARCHED")
    }
    res.send(`<h1>Search results for: ${q}</h1>`)
})

/***********************************
 * THEN THE <pattern name> CAN BE ACCESS IN THE REQUEST 
 * OBJECT, WITH A PROPERTY CALLED: params
*/
app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params
    console.log(subreddit);
    res.send(`<h1>Browing the ${subreddit} subreddit</h1>`)
})

/***********************************
 * MULTIPLE DYNAMIC PATTERNS in a url and 
 * the params PROPERTY IN THE REQUEST WILL THEN
 * CONTAIN ARE KEY VALUE PAIR property FOR THE 
 * value IN THE REQUEST SENT
*/
app.get('/r/:subreddit/:postId', (req, res) => {
    const {subreddit, postId} = req.params
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})

/*********************** */
app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

/*************** */
app.get('/dogs', (req, res) => {
    res.send('WOOF!!')
})

//app.post('<path that is matching>', A callback function)
app.post('/cats', (req, res) => {
    res.send('POST REQUEST TO /cats');
})



//Used for all requests 
//app.get('*', A callback function)
app.get('*', (req, res) => {
    res.send(`I don't know that path`)
})



//THIS IS USED TO LISTEN FOR ALL REQUESTS ON THE SPECIFIED PORT NUMBER
app.listen(8080, () => {
    console.log("LISTENING ON PORT 8080" );
})