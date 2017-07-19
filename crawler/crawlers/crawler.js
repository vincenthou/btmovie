const url = require('url')

export default class Crawler {

  constructor(listURL, encoding = 'utf8') {
    this.listURL = listURL
    this.host = url.parse(listURL).host
    this.encoding = encoding
  }

  crawlDetailPage(link, data) {
    return new Promise((resolve, reject) => {
      this._getPageSelector(link).then(($) => {
        Object.assign(data, parseDetail($))
        resolve(data)
      })
    })
  }

  crawListPage() {
    let promises = []
    this._getPageSelector(this.listURL).then(($) => {
      this.selectDetailLinks($).each((linkNode) => {
        let $linkNode = $(linkNode)
        let link = this.host + $linkNode.attr('href')
        // Get information from list for detail
        let data = this.parseList($linkNode)
        data.link = link
        // Get information from detailed page
        promises.push(thils.crawlDetailPage(link, data))
      })
    })
    return promises
  }

  crawl() {
    return new Promise((resolve, reject) => {
      let promises = this.crawlListPage()
      // After all the detail page is parsed
      Promise.all(promises).then(dataList => {
        resolve(dataList)
      }, err => {
        reject(err)
      })
    })
  }

  _getPageSelector(url) {
    return new Promise((resolve, reject) => {
      request.get({url: url, encoding: null}, (err, resp, body) => {
        if (err == null && resp.statusCode == 200) {
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
