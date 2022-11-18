const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs')
app.use(cors())



app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(5000, function () {
    console.log('server running at http://localhost:' + 5000)
})