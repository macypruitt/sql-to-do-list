const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const PORT = 5000;
const toDoRouter = require('./routes/todorouter.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/todo', toDoRouter);

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});