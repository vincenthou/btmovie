const config = require('./config')
const fs = require('fs')
const Eightys = require('./crawlers/80s')
const Dytt = require('./crawlers/dytt')

const fetchLists = function(promises) {
  return new Promise(function(resolve, reject){
    Promise.all(promises).then(lists => {
      // Merge lists
      resolve(lists.reduce(function(newList, list){
        return newList.concat(list)
      }, []))
    }, err => {
      reject(err)
    })
  })
}

const fetchMovies = function() {
  return fetchLists([
    new Eightys('https://m.80s.tw/movie/1-0-0-0-0-0-0').crawl(),
    new Dytt().crawl(),
  ])
}

const fetchTvPlays = function() {
  return fetchLists([
    new Eightys('https://m.80s.tw/movie/2-0-0-0-0-0-0').crawl(),
  ])
}

const writeFile = function(fileName) {
  return function(data) {
    let filePath = config.distFolder + fileName
    let json = JSON.stringify(data, null, 2)
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
    console.log('Data is written to file ' + filePath)
  }
}

fetchMovies()
  .then(writeFile('/movies.json'))
  .catch(err => {
    console.error(err)
  })

fetchTvPlays()
  .then(writeFile('/tvplays.json'))
  .catch(err => {
    console.error(err)
  })
