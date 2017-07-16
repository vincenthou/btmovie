const config = require('./config');
const crawler = require('./crawler');
const fs = require('fs');

crawler.parseLatest()
  .then(list => {
    let filePath = config.distFolder + '/movies.json'
    let json = JSON.stringify(list, null, 2)
    if (!fs.existsSync(config.distFolder)) {
      fs.mkdirSync(config.distFolder)
    }
    if (!fs.existsSync(filePath)) {
      fs.close(fs.openSync(filePath, 'w+'))
    }
    let ws = fs.createWriteStream(filePath, {
      encoding: 'utf8'
    })
    ws.write(json)
    ws.end()
  })
  .catch(err => {
    console.error(err)
  })
