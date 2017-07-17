const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

module.exports = {
  trim (str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  },
  getSelector (url, encoding) {
    return new Promise(function(resolve, reject){
      request.get({url: url, encoding: null}, function(err, resp, body){
        if (err == null && resp.statusCode == 200) {
          console.log('Got body content from ' + url)
          !encoding && (encoding = 'utf8')
          resolve(cheerio.load(iconv.decode(body, encoding).toString()))
        } else {
          reject(err)
        }
      })
    })
  }
}
