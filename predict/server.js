
const express = require('express')
const app=express()
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');


// template engine  
app.use(express.static('public'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',require('./routes/pred'))

app.set('views','./views')

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});