var restify = require('restify');
var config = require('./config');
var crawler = require('./crawler');

var server = restify.createServer({
  app: config.appName,
  version: config.version
});

server.use(restify.CORS());

server.get('/search/:keyword', function(req, res){
  crawler.parseSearch(req.params.keyword)
    .then(function(data){
      res.send(data);
    });
});

server.get('/latest', function(req, res){
  crawler.parseLatest()
    .then(function(list){
      res.send(list);
    });
});

server.listen(8003, function(){
  console.log('%s listening at %s', server.name, server.url);
});
