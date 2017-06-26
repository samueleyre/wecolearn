'use strict';
module.exports = function(app) {
  	var controller = require('../controller/mainController');

	app.route('/search')
    	.get(controller.search );
    
};