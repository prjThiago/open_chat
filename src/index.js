const app = require('./config/server')
const _ = require('lodash')
const chats = {}

app.listen(3000, () => {
  console.log('Server is running on 3000')
})

app.get('/', (req, res) => {
  res.status(200).json({
    chats
  })
})

app.use((req, res, next) => {
  let urlPath = req.path

  // Configurando as salas.
  if (_.has(chats, urlPath)) {
  } else {
    chats[urlPath] = require('./api/controllers/chat/chatService')(app, urlPath)
  }
})
