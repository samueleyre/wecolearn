var express = require('express'),

app = express(),
port = process.env.PORT || 3000;

bodyParser = require('body-parser');
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/route/route');
routes(app);


app.listen( port );


console.log(' Listen to Google search api on port : ' + port);