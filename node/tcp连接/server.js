const net = require('net')

const server = net.createServer()

let sockets = []

server.on('connection', clientSocket => {
  console.log('有新的连接')

  const { remoteAddress, remotePort } = clientSocket
  console.log(`客户端 ${remoteAddress}:${remotePort} 和服务器建立连接`)

  clientSocket.on('data', chunk => {
    //console.log('接收到客户端数据', chunk, chunk.toString())
    console.log(JSON.parse(chunk.toString()))

    const { type, username, msg } = JSON.parse(chunk.toString())

    if (type === 'enter') {
      sockets.push(clientSocket)
      clientSocket.username = username

      sockets.forEach(socket => {
        socket.write(
          JSON.stringify({
            type: 'welcome',
            username,
            total: sockets.length
          })
        )
      })

    } else if (type === 'chat') {
      sockets.forEach(socket => {
        if (socket !== clientSocket) {
          socket.write(
            JSON.stringify({
              type: 'chat',
              username,
              msg
            })
          )
        }
      })
    } else if (type === 'leave') {
      const username = clientSocket.username
      sockets = sockets.filter(socket => {
        return socket !== clientSocket
      })

      sockets.forEach(socket => {
        socket.write(
          JSON.stringify({
            type: 'leave',
            username,
            total: sockets.length
          })
        )
      })
    }

  })

  //clientSocket.write('Hi')
  //clientSocket.end('886')

  clientSocket.on('end', () => {
    console.log(`客户端 ${remoteAddress}:${remotePort} 断开连接`)
  })

  clientSocket.on('error', err => {
    console.log(`客户端 ${remoteAddress}:${remotePort} 连接出错`)

    const username = clientSocket.username
    sockets = sockets.filter(socket => {
      return socket !== clientSocket
    })

    sockets.forEach(socket => {
      socket.write(
        JSON.stringify({
          type: 'leave',
          username,
          total: sockets.length
        })
      )
    })
  })
})

server.listen(9000, '127.0.0.1', () => {
  console.log('服务器已在127.0.0.1:9000 启动')
})

server.on('error', err => {
  console.log('服务器出错', err)
})
