import http from 'node:http';
import { json } from './middlewares/json.js';

/**
 * - Criar usuário
 * - Listar usuário
 * - Editar usuário
 * - Deletar usuário
 * 
 * 
 * - HTTP
 *  - Método HTTP
 *  - URL
 * 
 * GET, POST, PATCH, PUT, DELETE
 * 
 * GET - buscar recurso do back-end
 * POST - criar um recurso no back-end
 * PATCH - atualiza uma informação específica no back-end
 * PUT - atualiza um recurso no back-end
 * DELETE - remove um recurso no back-end
 * 
 * Statefull - Stateless
 * 
 * Cabeçalhos (Requisições/respostas) => Metadados
 * HTTP Status Code
 */

const users = [];

const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await json(req,res)

  if(method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users))
  }
  
  if(method === 'POST' && url === '/users') {
    const {name, email} = req.body
    users.push({
      id: users.length + 1,
      name,
      email,
    })
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)