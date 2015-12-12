var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var config = require('./config');

function trim(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function loadParser(url, cb) {
  request.get({url: url, encoding: null}, function(err, resp, body){
    if (err == null && resp.statusCode == 200) {
      console.log('Got body content');
      var $ = cheerio.load(iconv.decode(body, 'gb2312').toString());
      cb && 'function' == typeof(cb) && cb($);
    }
  });
}

function parseFields($) {
  var fields = [];
  $('.co_content8 table tr').each(function(){
    var $tableData = $(this).find('td');
    //0, 3, 6... index is title
    //2, 5, 8... index is description
    var field = trim($tableData.text());
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

function formatDetailPage(url, cb) {
  var data = {};
  loadParser(url, function($){
    var $detail = $('#Zoom');
    var images = [];
    $detail.find('img').each(function(){
      images.push($(this).attr('src'));
    });
    data.poster = images[0];
    data.screencast = images[1];
    data.paths = [];
    $detail.find('table a').each(function(){
      data.paths.push($(this).text());
    });
    cb && 'function' == typeof(cb) && cb(data);
  });
}

module.exports = {
  trim: trim,
  loadParser: loadParser,
  parseFields: parseFields,
  formatSearchResult: formatSearchResult,
  formatDetailPage: formatDetailPage
}
