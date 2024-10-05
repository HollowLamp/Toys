const net = require('net')

const client = net.createConnection({
  host: '127.0.0.1', port: 9000
})

client.on('connect', () => {
  console.log('连接到服务器')

  //client.write('Hello')
  //client.end()

  let username

  process.stdout.write('请输入用户名：')

  process.stdin.on('data', chunk => {
    //console.log('接收用户输入', chunk, chunk.toString())

    const data = chunk.toString().trim()
    if (!username) {
      username = data
      client.write(JSON.stringify({
        type: 'enter',
        username
      }))
      return
    }
    if (data !== 'exit') {
      client.write(
        JSON.stringify({
          type: 'chat',
          username,
          msg: data
        })
      )
    } else {
      client.end(
        JSON.stringify({
          type: 'leave',
          username
        })
      )
    }
  })
})

client.on('data', chunk => {
  //console.log('接收到服务端数据', chunk, chunk.toString())

  const { type, username, msg, total } = JSON.parse(chunk.toString())

  if (type === 'welcome') {
    console.log(`欢迎 ${username} 进入聊天室 当前一共 ${total} 人`)
  } else if (type === 'chat') {
    console.log(`${username}: ${msg}`)
  } else if (type === 'leave') {
    console.log(`${username}离开，当前聊天室有${total}人`)
  }
})

client.on('end', () => {
  console.log(`断开连接`)
})

client.on('error', err => {
  console.log(`连接出错`)
})