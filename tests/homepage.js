var zombie = require('zombie'),
    vows = require('vows'),
    assert = require('assert');

var baseUrl = 'http://www.microsoft.com/en-us/cloud/cloudconversations.aspx?fbid=jogAIfm6cHP';
var baseUrl2 = 'http://www.visionaustralia.org.au/info.aspx';
var baseUrl3 = 'http://windows.microsoft.com/en-US/windows/home';
var baseUrl4 = 'http://www.starbucks.com/';
var window;

vows.describe('Zombie Tests on Microsoft page').addBatch({
    'Navigate to MS page': {
        topic: function() {
            browser = new zombie.Browser({ debug: true });
            window = browser.window;
            browser.runScripts = false;
            browser.on('error', function(err) {
                browser.log(browser.response);
            });
            //browser.on('loaded', function (loaded){});
            browser.on('done', function(done) {
                //console.log(done.document.cookie);
                window.history._loadPage(1);
                browser.log(browser.dump());
            });
            browser.visit(baseUrl, this.callback);
        },
        'Should be on MS cloud conversation page': function(browser) {
            assert.equal(browser.location.href, baseUrl);
        },
        'Title should be correct': function(browser) {
            assert.equal(browser.text("title"), "Cloud Computing News | Microsoft Blogs and News | Cloud conversations");
        },
        'Browser is not redirected': function(browser) {
            var redirect = browser.redirected;
            assert.equal(redirect, false);
        }
    }
})['export'](module);