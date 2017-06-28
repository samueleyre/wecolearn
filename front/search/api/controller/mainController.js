var service = require('./../service/googleSearch');
  
exports.search = function(req, res) {
  
  service.search( req, function( err, response ) {
    if (err) {
      res.send(err);
    }
    res.json(response);
  });
};