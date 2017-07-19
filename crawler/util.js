const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

module.exports = {
  trim (str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
}
