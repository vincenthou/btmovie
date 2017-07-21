const request = require('request')
const domain = 'http://api.douban.com'

module.exports = {
  search (query, tag) {
    return new Promise((resolve, reject) => {
      request.get({
        url: `${domain}/v2/movie/search`,
        qs: {
          q: query,
          tag,
        },
      }, (err, resp, body) => {
        if (err) {
          reject(err)
        }
        if (resp.statusCode !== 200) {
          reject(new Error(JSON.parse(resp.body).msg))
        }
        resolve(body)
      })
    })
  }
}
