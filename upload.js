const express = require('express');
const morgan = require('morgan')//Show app params 



const app = express();

app.use(express.json()); //Make express read JSON format 
app.use(express.urlencoded({extended:true}))// Read req in URLuncoded, it's easy way for send archives 
app.use(morgan('dev'))

app.use(require("./routes"));// Call archive Routes.js
app.listen(3000);

================================================
  #Pasta routes.js#
-----------------------------------------------
  //Archive routes in browser 
const routes = require('express').Router()// Import routes app 
const multer = require('multer') // Import multer 
const multerConfig = require('./config/multer')



routes.post('/posts',multer(multerConfig).single('file'), (req,res) => {
    console.log(req.file)
    
    return res.json({message:'Hello World'});
});//routes...


module.exports = routes; //export for server.js 

===========================================================
  # src > config > multer.js #
-----------------------------------------------------------
  
  //Export a object with multer config 
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    dest:path.resolve(__dirname,'..','..','temp','uploads'), // Upload destination 
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, path.resolve(__dirname,'..','..','temp','uploads'))
        },
        filename:(req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{//Random 16 words for ID. 
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);

            })            

        },
    }),
    limits:{//Archive Limits 
      fileSize: 2* 1024 * 1024,
    },
    fileFilter:(req, file, cb) =>{ //Type and formts for archive,mimetype
        const allowedMimes = [
            'application/json',
            'application/rtf',
            'application/msword',
            'application/pdf',
        ]
        if(allowedMimes.includes(file.mimetype)){ //if the format not run... 
            cb(null, true)
        } else {
            cb(new Error("Invalid File type."))
        }
    },
};
