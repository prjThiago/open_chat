const IO = (app, urlPath) => {
  const io = require('socket.io').listen(app)

  io.on('connection', socket => {
    console.log('conectou')

    socket.on('disconect', () => {
      console.log('Usuário desconectoun')
    })

    socket.on(urlPath + 'MsgToServer', data => {
      socket.emit('msgToClient', {
        nickname: data.nickname,
        message: data.message
      })

      socket.broadcast.emit(urlPath + 'msgToClient', {
        nickname: data.nickname,
        message: data.message
      })

      if (parseInt(data.refresh_members) === 0) {
        socket.emit(urlPath + 'membersToClient', { apelido: data.apelido })

        socket.broadcast.emit(urlPath + 'membersToClient', {
          apelido: data.apelido
        })
      }
    })
  })

  return io;
}

module.exports = IO;
