var path = require('path')
var chokidar = require('chokidar')
var watcher = chokidar.watch(path.join(__dirname, '../src'))

require('babel-core/register')({
  'presets': [
    'es2015',
    'stage-3'
  ]
})

require('babel-polyfill')
require('./index.js')

watcher.on('change', function () {
  console.log('reload')
  require('./index.js')
})
