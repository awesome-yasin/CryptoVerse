const path = require('path');
var express = require("express");


var app = express();

var port = process.env.PORT || 5000;


app.use(express.json({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
 app.use('/images', express.static(__dirname + '/public/images'));

  app.use(express.static(path.join(__dirname, "/client", "build")));

  app.route('/portfolio')
  .get((req,res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})



 app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});