const Crawler = require('./crawler')
const douban = require('../douban')

module.exports = class Dytt extends Crawler {

  constructor () {
    super('http://www.ygdy8.com', 'gb2312')
  }

  selectDetailLinks ($) {
    return $('.co_content8').eq(0).find('a')
  }

  extendData (data) {
    return new Promise((resolve, reject) => {
      data.score = 0
      douban.search(data.title).then(result => {
        result = JSON.parse(result)
        if (result.total) {
          data.score = result.subjects[0].rating.average
        }
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  parseList ($linkNode) {
    let title = $linkNode.text()
    return this._parseTitle(title)
  }

  parseDetail ($) {
    let $detail = $('#Zoom')
    let images = []
    $detail.find('img').each(function () {
      images.push($(this).attr('src'))
    })
    let data = {
      poster: images[0],
      screencast: images[1],
      paths: []
    }
    $detail.find('table a').each(function () {
      data.paths.push($(this).text())
    })
    return data
  }

  _parseTitle (title) {
    let matches = title.match(/(\d+年)(.+)《(.+)》(.+)/)
    if (!matches) {
      return null
    }
    return {
      year: matches[1],
      tag: matches[2],
      title: matches[3],
      type: matches[4]
    }
  }
}
