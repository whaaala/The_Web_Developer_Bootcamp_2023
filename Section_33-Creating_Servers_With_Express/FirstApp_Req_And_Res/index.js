const express = require('express');
const app = express();

/*****************************************************************
   FOR ALL INCOMING REQUEST, YOU HAVE IMPORTANT PARAMETERS 
   THAT ARE AUTOMATICALLY PASSED IN
    THE FIRST ONE IS THE OBJECT THAT REPRESENTS THE REQUEST (the incoming request)
    THE SECOND ONE IS THE OBJECT THAT REPRESENTS THE OUTGOING RESPONSES (the outgoing response)

      THIS OBJECT ARE MADE BY EXPRESS AND PASSED IN TO THE app.use CALLBACK
         an http request is not a JAVASCRIPT OBJECT, it is text information and not perticular to 
         any programming language

         EXPRESS TURNS THE text information INTO AN OBJECT, THAT IT PASSES INTO THE CALLBACK
 * 
*********************************************************************************/
// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST!!");
//     // res.send("HELLO WE GOT YOUR REQUEST, THIS IS A RESPONSES!!!!!!!!!")
//     // res.send({color: 'red'})
//     res.send('<h1>This is my webpage!</h1>') // FYI: res.send() can only be sent once for a path
// });

//ROUNTING 
/*********************************************************************
 * ROUNTING
 *   refers to takeing INCOMING REQUEST and a PATH that is requested
 *   and MATCHINH it so some CODE and some RESPONSE
 * 
 **********************************************************************/
//app.get('<path that is matching>', A callback function)
app.get('/', (req, res) => {
    res.send('<h1>This the home page</h1>');
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

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