import { createServer } from '@blued-core/http-server'
console.log('Server start');

// curl http://127.0.0.1:8080
createServer({
  logPath: './log',
  port: 8080
})