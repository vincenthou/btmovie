const Crawler = require('./crawler')

module.exports = class Dytt extends Crawler {

  constructor () {
    super('http://www.ygdy8.com', 'gb2312')
  }

  selectDetailLinks ($) {
    return $('.co_content8').eq(0).find('a')
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
