const config = require('./config')
const fs = require('fs')
const Eightys = require('./crawlers/80s')
const Dytt = require('./crawlers/dytt')

const parseMovies = () => {
  return new Promise(function(resolve, reject){
    Promise.all([
      new Eightys().crawl(),
      new Dytt().crawl(),
    ]).then(lists => {
      // Merge two arrays
      resolve(lists.reduce(function(newList, list){
        return newList.concat(list)
      }, []))
    }, err => {
      reject(err)
    })
  })
}

const writeFile = (list) => {
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
}

parseMovies()
  .then(writeFile)
  .catch(err => {
    console.error(err)
  })
