const app = require('./config/server')
const _ = require('lodash')
const chats = {}
const arrChats = []
const server = app.listen(3000, () => {
  console.log('Server is running on 3000')
})

app.get('/', (req, res) => {
  res.status(200).json({chats: arrChats})
})

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
  let urlPath = req.path,
    io = require('./api/controllers/chat/chatService');

  // Configurando as salas.
  if (!_.has(chats, urlPath)) {
    chats[urlPath] = io(server, urlPath)
    arrChats.push(urlPath);
    res.status(200).send({status: 'OK', url: `${urlPath}`});
  }
})
