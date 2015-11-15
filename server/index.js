var restify = require('restify');
var urlencode = require('urlencode');
var util = require('./util');
var config = require('./config');
var q = require('q');

var server = restify.createServer({
  app: config.appName,
  version: config.version
});

server.get('/search/:keyword', function(req, res){
  var params = req.params;
  var url = config.searchPath + urlencode(params.keyword, 'gb2312');

  console.log('request url: ' + url);
  util.loadParser(url, function($){
    var fields = util.parseFields($);
    if (fields.length) {
      res.send(util.formatSearchResult(fields));
    } else {
      res.send([]);
    }
  });
});

server.get('/latest', function(req, res){
  util.loadParser(config.targetDomain, function($){
    var list = [];
    var promises = [];
    $('.co_content8').eq(0).find('a').each(function(idx){
      if (idx % 2) {
        var $this = $(this);
        var title = $this.text();
        var link = config.targetDomain + $this.attr('href');
        //Get logo and path from detailed page
        var defered = q.defer();
        util.formatDetailPage(link, function(data){
          data.title = title;
          data.link = link;
          defered.resolve(data);
        });
        promises.push(defered.promise);
      }
    });
    //Wait for all the promises
    q.all(promises).then(function(list){
      res.send(list);
    });
  });
});

server.listen(8003, function(){
  console.log('%s listening at %s', server.name, server.url);
});
