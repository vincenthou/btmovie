const config = require('./config');
const util = require('./util');
const urlencode = require('urlencode');

const parseTitle = (data, title) => {
  let matches = title.match(/(\d+年)(.+)《(.+)》(.+)/);
  data.year = matches[1];
  data.tag = matches[2];
  data.title = matches[3];
  data.type = matches[4];
  return data;
}

const parseFields = ($) => {
  let fields = [];
  $('.co_content8 table tr').each(function(){
    let $tableData = $(this).find('td');
    //0, 3, 6... index is title
    //2, 5, 8... index is description
    let field = util.trim($tableData.text());
    field && fields.push(field);
    //1, 4, 7... index is link;
    let link = $tableData.find('a').attr('href');
    link && fields.push(config.targetDomain + link);
  });
  return fields;
}

const formatSearchResult = (fields) => {
  let item = {};
  let contents = [];
  let descriptions = [];
  let mod = 0;
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

const parseSearch = (keyword) => {
  return new Promise(function(resolve, reject){
    let url = config.searchPath + urlencode(keyword, 'gb2312');
    console.log('request url: ' + url);
    util.getSelector(url).then(function($){
      let fields = parseFields($);
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
      let $detail = $('#Zoom');
      let images = [];
      $detail.find('img').each(function(){
        images.push($(this).attr('src'));
      });
      let data = {
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

const parseLatest = () => {
  return new Promise(function(resolve, reject){
    util.getSelector(config.targetDomain)
      .then(function($){
        let list = []
        let promises = []
        $('.co_content8').eq(0).find('a').each(function(idx){
          if (idx % 2) {
            let linkDOM = $(this)
            let title = linkDOM.text()
            let link = config.targetDomain + linkDOM.attr('href')
            promises.push(new Promise(function(resolve, reject){
              //Get logo and path from detailed page
              formatDetailPage(link).then(function(data){
                parseTitle(data, title)
                data.link = link
                resolve(data)
              })
            }))
          }
        })

        //Wait for all the promises
        Promise.all(promises).then(list => {
          resolve(list)
        }, err => {
          reject(err)
        })
      })
  })
}

module.exports = {
  parseLatest,
  parseSearch
}
