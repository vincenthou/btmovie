const config = require('./config')
const urlencode = require('urlencode')

const parseFields = ($) => {
  let fields = []
  $('.co_content8 table tr').each(function () {
    let $tableData = $(this).find('td')
    // 0, 3, 6... index is title
    // 2, 5, 8... index is description
    let field = $tableData.text().trim()
    field && fields.push(field)
    // 1, 4, 7... index is link;
    let link = $tableData.find('a').attr('href')
    link && fields.push('http://www.ygdy8.com' + link)
  })
  return fields
}

const formatSearchResult = (fields) => {
  let item = {}
  let contents = []
  let descriptions = []
  let mod = 0
  fields.forEach(function (field, idx) {
    mod = idx % 3
    if (mod == 0) {
      item.title = field
    } else if (mod == 1) {
      item.link = field
    } else {
      descriptions = field.split('◎').slice(1)
      if (!descriptions.length) {
        // Handle xxx: xxx xxx: xxx format
        descriptions = field.replace(/([^0-9a-z:])\s(.+?:)\s/g, '$1◎$2 ').split('◎')
        if (descriptions.length === 1) {
          field = trim(field)
          // Handle xxx xxx\r\n format
          descriptions = field.split(/\r\n/).slice()
        }
      }
      item.descriptions = descriptions
      contents.push(item)
      // Create new object
      item = {}
    }
  })
  return contents
}

const parseSearch = (keyword) => {
  return new Promise(function (resolve, reject) {
    let url = config.searchPath + urlencode(keyword, 'gb2312')
    console.log('request url: ' + url)
    util.getSelector(url).then(function ($) {
      let fields = parseFields($)
      if (fields.length) {
        resolve(formatSearchResult(fields))
      } else {
        reject('no fields')
      }
    })
  })
}
