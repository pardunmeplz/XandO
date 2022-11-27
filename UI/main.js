var myBoard = new Board()
const websocket = new WebSocket("ws://localhost:8765/")
window.addEventListener("DOMContentLoaded", async () => {

    websocket.addEventListener('open', () => {
        console.log('connection established!!')
        websocket.addEventListener('message', ({ data }) => {
            console.log('got message ' + data)
            message = JSON.parse(data)
            myBoard.turn = message.turn
            myBoard.gameOver = message.gameOver
            myBoard.setState(() => message.boardState)
            myBoard.player = message.player
        })
        websocket.send(JSON.stringify({ 'type': 'request' }))
        console.log('request sent')
    })
    // initial stuff in here
})