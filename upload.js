const express = require('express'); // Install express
const morgan = require("morgan");//Install morgan for requisition log of http

const app = express(); //express call

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

app.use(require("./routes"));


app.listen(3001); // Web gate localhost

