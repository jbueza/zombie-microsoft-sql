var sys = require('util')
  , jsdom = require('jsdom')
  , assert = require('assert')
  , zombie = require('zombie')
  , target = 'http://www.microsoft.com/sqlserver/en/us/default.aspx'; //move into configuration

describe('When a user goes to the Microsoft SQL Evergreen Homepage', function() { 
  
  var config = { debug: false, runScripts: false };
    
  it('should be the correct location', function() {
    var browser = new zombie.Browser(config);
    browser.visit(target, function(err, doc) {
      expect(doc.document.location.href).toEqual(target);
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it('should be the correct title', function() {
    var browser = new zombie.Browser(config);
    browser.visit(target, function(err, doc) {
      expect(doc.document.title).toEqual('Database Management | Data Mining & Warehousing | Microsoft SQL Server');
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it('should not redirect the user', function() {
    var browser = new zombie.Browser(config);
    browser.visit(target, function(err, doc) {
      expect(doc.redirected).toBeFalsy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
});