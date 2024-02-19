const express = require('express');
const app = express();

// console.dir(app)
//THIS WE RUN FOR ALL INCOMING REQUESTS EXPRESS RECEIVES
app.use(() => {
    console.log("WE GOT A NEW REQUEST!!");
})

//THIS IS USED TO LISTEN FOR ALL REQUESTS ON THE SPECIFIED PORT NUMBER
app.listen(8080, () => {
    console.log("LISTENING ON PORT 8080" );
})