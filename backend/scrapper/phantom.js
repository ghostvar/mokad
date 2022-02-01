"use strict";
var system = require('system');
var args = system.args;
var page = require('webpage').create();
var data = args[2];

var app = {
  authenticated: false,
  login: function(callback) {
    page.open('https://siakad.utdi.ac.id/index.php?pModule=zdKbnKU=&pSub=zdKbnKU=&pAct=0dWjppyl', 'post', data, function (status) {
      if (status !== 'success') {
        callback('['+JSON.stringify(status)+','+JSON.stringify(page.content)+']');
      } else {
        var res = page.evaluate(function () {
          try {
            return ['success', document.querySelector('div.front-content-full-left').innerHTML];
          } catch (error) {
            return ['error', document.querySelector('div#login-box-info').innerHTML];
          }
        });
        if(res[0] == 'success') this.authenticated = true;
        callback(JSON.stringify(res));
      }
    });
  },
  
  krs: function(callback) {
    var ex = function() {
      page.open('https://siakad.utdi.ac.id/index.php?pModule=wsaVl5yfncmQptGaoA==&pSub=wsaVl5yfncmQptGaoA==&pAct=18yZqg==', 'get', '', function (status) {
        if (status !== 'success') {
          callback('['+JSON.stringify(status)+','+JSON.stringify(page.content)+']');
        } else {
          var res = page.evaluate(function () {
            try {
              return ['success', document.querySelector('form[name=frmKRS]').innerHTML];
            } catch (error) {
              return ['error', error];
            }
          });
          callback(JSON.stringify(res));
        }
      });
    }

    if(this.authenticated) {
      ex();
    } else {
      this.login(function (obj) {
        if(JSON.parse(obj)[0] == 'success') {
          ex();
        } else {
          callback(obj);
        }
      });
    }
  },

  transkip: function(callback) {
    var ex = function () {
      page.open('https://siakad.utdi.ac.id/index.php?pModule=wsaVl5yfncmQqMqpoaal&pSub=wsaVl5yfncmQqteaoKeU1qKppA==&pAct=18yZqg==', 'get', '', function (status) {
        if(status !== 'success') {
          callback('['+JSON.stringify(status)+','+JSON.stringify(page.content)+']');
        } else {
          var res = page.evaluate(function () {
            try {
              return ['success', document.querySelector('div#content').innerHTML];
            } catch (error) {
              return ['error', error];
            }
          });
          callback(JSON.stringify(res));
        }
      });
    }

    if(this.authenticated) {
      ex();
    } else {
      this.login(function (obj) {
        if(JSON.parse(obj)[0] == 'success') {
          ex();
        } else {
          callback(obj);
        }
      });
    }
  }
}


app[args[1]](function(res) {
  console.log(res);
  phantom.exit();
});