import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

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



const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await json(req,res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)