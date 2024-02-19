const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>")
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
})

app.post('/tacos', (req, res) => {
    res.send("POST /tacos response");
})

app.listen(3000, () =>{
    console.log('Listening on port 3000');
})