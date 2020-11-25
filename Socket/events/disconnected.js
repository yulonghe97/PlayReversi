const disconnectEvent = (socket) => {
    socket.on('disconnect', () => {
        console.log(socket.id + " Disconnected!");
    })
}

module.exports = disconnectEvent;