import { createServer } from '@blued-core/http-server'


// curl http://127.0.0.1:8080
createServer({
  logPath: './log',
  port: 8081
})

console.log('Server start at http://localhost:8081/api/get');