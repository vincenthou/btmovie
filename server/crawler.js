var config = require('./config');
var util = require('./util');
var urlencode = require('urlencode');

function parseTitle(data, title) {
  var matches = title.match(/(\d+年)(.+)《(.+)》(.+)/);
  data.year = matches[1];
  data.tag = matches[2];
  data.title = matches[3];
  data.type = matches[4];
  return data;
}

function parseFields($) {
  var fields = [];
  $('.co_content8 table tr').each(function(){
    var $tableData = $(this).find('td');
    //0, 3, 6... index is title
    //2, 5, 8... index is description
    var field = util.trim($tableData.text());
    field && fields.push(field);
    //1, 4, 7... index is link;
    var link = $tableData.find('a').attr('href');
    link && fields.push(config.targetDomain + link);
  });
  return fields;
}

function formatSearchResult(fields) {
  var item = {};
  var contents = [];
  var descriptions = [];
  var mod = 0;
  fields.forEach(function(field, idx){
    mod = idx % 3;
    if (0 == mod) {
      item.title = field;
    } else if (1 == mod) {
      item.link = field;
    } else {
      descriptions = field.split('◎').slice(1);
      if (!descriptions.length) {
        //Handle xxx: xxx xxx: xxx format
        descriptions = field.replace(/([^0-9a-z:])\s(.+?:)\s/g, '$1◎$2 ').split('◎')
        if (1 === descriptions.length) {
          field = trim(field);
          //Handle xxx xxx\r\n format
          descriptions = field.split(/\r\n/).slice();
        }
      }
      item.descriptions = descriptions;
      contents.push(item);
      //Create new object
      item = {};
    }
  });
  return contents;
}

function parseSearch(keyword) {
  return new Promise(function(resolve, reject){
    var url = config.searchPath + urlencode(keyword, 'gb2312');
    console.log('request url: ' + url);
    util.getSelector(url).then(function($){
      var fields = parseFields($);
      if (fields.length) {
        resolve(formatSearchResult(fields));
      } else {
        reject('no fields');
      }
    });
  });
}

function formatDetailPage(url) {
  return new Promise(function(resolve, reject){
    util.getSelector(url).then(function($){
      var $detail = $('#Zoom');
      var images = [];
      $detail.find('img').each(function(){
        images.push($(this).attr('src'));
      });
      var data = {
        poster: images[0],
        screencast: images[1],
        paths: []
      };
      $detail.find('table a').each(function(){
        data.paths.push($(this).text());
      });
      resolve(data);
    });
  });
}

function parseLatest () {
  return new Promise(function(resolve, reject){
    util.getSelector(config.targetDomain)
      .then(function($){
        var list = [];
        var promises = [];
        $('.co_content8').eq(0).find('a').each(function(idx){
          if (idx % 2) {
            var $this = $(this);
            var title = $this.text();
            var link = config.targetDomain + $this.attr('href');
            promises.push(new Promise(function(resolve, reject){
              //Get logo and path from detailed page
              formatDetailPage(link).then(function(data){
                parseTitle(data, title);
                data.link = link;
                resolve(data);
              });
            }));
          }
        });

        //Wait for all the promises
        Promise.all(promises).then(function(list){
          resolve(list)
        }, function(err){
          reject(err)
        });

      });
  })
}

module.exports = {
  parseLatest: parseLatest,
  parseSearch: parseSearch
}
