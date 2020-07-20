const express = require('express');
const morgan = require('morgan')//Show app params 



const app = express();

app.use(express.json()); //Make express read JSON format 
app.use(express.urlencoded({extended:true}))// Read req in URLuncoded, it's easy way for send archives 
app.use(morgan('dev'))

app.use(require("./routes"));// Call archive Routes.js
app.listen(3000);
