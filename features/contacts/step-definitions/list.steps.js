
module.exports = function () {
this.World = require("../../support/world");
const expect = require("chai").expect;
  
this.Given(/^I visit ContactList screen$/, function (callback) {
    this.browser.get('http://localhost:8100/')
    .then(callback)
      
  });
};