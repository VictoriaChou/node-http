const http = require('http')

const agent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 4, // 最多可以使用的socket
  maxFreeSockets: 1 // 当处于空闲状态时允许打开的socket数量
})

const test = () => {
  return new Promise((resolve, reject) => {
    const option = {
      protocol: 'http:',
      host: 'localhost',
      port: 9990,
      agent: agent,
      headers: {
        'Connection': 'keep-alive'
      },
      method: 'GET'
    }

    const req = http.request(option, function(res) {
      res.setEncoding('utf8')
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        resolve(body)
      })
    })

    req.on('error', (e) => {
      console.error(e)
      console.log(e.stack)
    })
    req.end()
  })
}

const sendReq = (count) => {
  let arr = []
  for(let i=0; i<count; i++) {
    arr.push(test())
  }
  Promise.all(arr).then(() => {
    console.log('======end=======')
  })
}

sendReq(1)