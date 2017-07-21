const url = require('url')
const iconv = require('iconv-lite')
const request = require('request')
const cheerio = require('cheerio')

module.exports = class Crawler {

  constructor (listURL, encoding = 'utf8') {
    this.listURL = listURL
    this.host = url.parse(listURL).host
    this.encoding = encoding
  }

  crawlDetailPage (link, data) {
    return new Promise((resolve, reject) => {
      this._getPageSelector(link).then($ => {
        Object.assign(data, this.parseDetail($))
        if (this.extendData) {
          this.extendData(data).then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  crawlListPage () {
    return new Promise((resolve, reject) => {
      this._getPageSelector(this.listURL).then(($) => {
        let promises = []
        this.selectDetailLinks($).each((idx, linkNode) => {
          let $linkNode = $(linkNode)
          let link = 'http://' + this.host + $linkNode.attr('href')
          // Get information from list for detail
          let data = this.parseList($linkNode)
          if (data) {
            data.link = link
            // Get information from detailed page
            promises.push(this.crawlDetailPage(link, data))
          }
        })
        // After all the detail page is parsed
        Promise.all(promises).then(dataList => {
          resolve(dataList)
        }, err => {
          reject(err)
        })
      })
    })
  }

  crawl () {
    return this.crawlListPage()
  }

  _getPageSelector (url) {
    return new Promise((resolve, reject) => {
      request.get({url: url, encoding: null}, (err, resp, body) => {
        if (err === null && resp.statusCode === 200) {
          !this.encoding && (this.encoding = 'utf8')
          let selector = cheerio.load(iconv.decode(body, this.encoding).toString())
          resolve(selector)
        } else {
          reject(err)
        }
      })
    })
  }
}
