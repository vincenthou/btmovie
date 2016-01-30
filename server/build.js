var config = require('./config');
var crawler = require('./crawler');
var fs = require('fs');

crawler.parseLatest()
  .then(function(list){
    var file = config.distFolder + '/latest.json';
    var json = JSON.stringify(list, null, 2);
    fs.writeFileSync(file, json, 'utf8')
  });
