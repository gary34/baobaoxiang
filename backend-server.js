var http = require('http')
var url = require('url')
var querystring = require('querystring')
var fs = require('fs')

function route (pathname, query, handle, response) {
  console.log('route for ' + pathname)
  if (typeof handle[pathname] === 'function') {
    handle[pathname](query, response)
  } else {
    console.log('No request handler found for ' + pathname)
    response.writeHead(404, {'Content-Type': 'text/plain'})
    response.write('404 not found')
    response.end()
  }
}

function getText (response) {
  var text = 'Winnie the Witch'
  console.log(text)
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write(text)
  response.end()
}

function getImage (response) {
  console.log('getImage')
  fs.readFile('./images/abracadabra.jpg', 'binary', function (error, file) {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'})
      response.write(error + '\n')
      response.end()
    } else {
      response.writeHead(200, {'Content-Type': 'image/jpg'})
      response.write(file, 'binary')
      response.end()
    }
  })
}

function getBigImage (response) {
  console.log('getBigImage')
  fs.readFile('./images/view.jpg', 'binary', function (error, file) {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'})
      response.write(error + '\n')
      response.end()
    } else {
      response.writeHead(200, {'Content-Type': 'image/jpg'})
      response.write(file, 'binary')
      response.end()
    }
  })
}

function get (query, response) {
  console.log('query: ' + query)
  var queryObj = querystring.parse(query)
  for (var key in queryObj) {
    console.log('key: ' + key + ', value: ' + queryObj[key])
  }
  var type = queryObj['type']
  switch (type) {
    case 'text':
      getText(response)
      break
    case 'image':
      getImage(response)
      break
    case 'bigimage':
      getBigImage(response)
      break
    default:
      var text = 'type ' + type + ' is unknown.'
      console.log(text)
      response.writeHead(200, {'Content-Type': 'text/plain'})
      response.write(text)
      response.end()
      break
  }
}

function hello (query, response) {
  console.log('Hello World')
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write('Hello World')
  response.end()
}

function start (route, handle) {
  function onRequest (request, response) {
    var urlObj = url.parse(request.url)
    var pathname = urlObj.pathname
    var query = urlObj.query
    console.log('Request for ' + pathname + ' received.' + ' query: ' + query)

    route(pathname, query, handle, response)
  }

  http.createServer(onRequest).listen(8888)
  console.log('Server has started.')
}

var handle = {}
handle['/'] = hello
handle['/get'] = get

start(route, handle)
