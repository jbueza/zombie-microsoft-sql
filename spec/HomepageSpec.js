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



/*
vows.describe('Microsoft SQL Homepage').addBatch({
  'When I navigate to the homepage': {
      topic: function() {
          browser = new zombie.Browser({ debug: true });
          window = browser.window;
          browser.runScripts = false;
          browser.on('error', function(err) {
            browser.log(browser.response);
          });
          browser.on('done', function(done) {
              window.history._loadPage(1);
          });
          browser.visit(target, this.callback);
      },
      'Should be on MS cloud conversation page': function(browser) {
          assert.equal(browser.location.href, target);
      },
      'Title should be correct': function(browser) {
        jsdom.env(browser.response[2], function(err, doc) {
          assert.equal(doc.document.title, "Database Management | Data Mining & Warehousing | Microsoft SQL Server");
        });
      },
      'Browser is not redirected': function(browser) {
          //var redirect = browser.redirected;
          //assert.equal(redirect, false);
      }
  }
}).run();*/
