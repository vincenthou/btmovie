const Crawler = require('./crawler')

module.exports = class Eightys extends Crawler {

  constructor(listURL) {
    super(listURL)
  }

  selectDetailLinks($) {
    return $('.list_mov > a')
  }

  parseList($linkNode) {
    let score = $linkNode.children('.poster-score').text()
    let title = $linkNode.siblings('.list_mov_title').find('a').text()
    return {
      score,
      title,
    }
  }

  parseDetail($) {
    let $images = $('.img-responsive')
    let yearRaw = $('.movie-h1').children('small').text().trim()
    return {
      poster: $images.eq(0).attr('src'),
      screencast: $images.eq(1).attr('src'),
      year: yearRaw.slice(1, 5),
      paths: Array.from($('.dl-size').siblings('a').map(function(){
        return $(this).attr('href')
      })).reverse() // make the better at first
    }
  }
}
