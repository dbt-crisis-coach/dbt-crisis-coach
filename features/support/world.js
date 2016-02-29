var pc = require ('protractor-cucumber')
var seleniumAddress = 'http://localhost:4444/wd/hub';
var options = { browser : 'chrome', timeout : 10000 };

module.exports = pc.world(seleniumAddress, options);