import http from 'node:http';
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js';
import { Database } from './database.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  
  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .end(JSON.stringify(database.select('users')))
  }

  if (method === 'POST') {
    database.insert('users', {
      id: randomUUID(),
      name: req.body.name,
      email: req.body.email
    })
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()

})

server.listen(3333)