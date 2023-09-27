import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      res.end(JSON.stringify(database.select('users')))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      database.insert('users', {
        id: randomUUID(),
        name: req.body.name,
        email: req.body.email
      })

      return res.writeHead(201).end()
    }
 }
]