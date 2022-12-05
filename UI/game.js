
class game {

    constructor(websocket) {
        this.websocket = websocket
    }

    state = {
        Boardstate: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        turn: true,
        gameOver: false,
        player: 1
    }

    setMove(move, board, pc = false) {

        const websocket = this.websocket
        const { player, gameOver, turn, Boardstate } = this.state

        // ignore garbage
        if (!turn || gameOver || !isValid(i, this.#state)) return

        // set move
        board.setState((state) => {
            state[move] = player * pc ? -1 : 1
            return state
        })
        this.state.turn = !turn

        // check for victory
        let winObject = winCheck(Boardstate)
        if (winObject == null) {
            this.gameOver = tieCheck(this.#state) // check for tie
            websocket.send(this.jsonState())
            this.setPrompt()
            return
        }



    }
}

{

    // filter out useless inputs


    // set button state
    this.setState((state) => {
        state[i] = this.player
        return state
    })




    // someone won!!!
    this.setState((state) => {
        winObject.sequence.forEach((index) => {
            state[index] = winObject.winner * 3
        })
        return state
    })
    this.gameOver = true
    this.setPrompt(winner = winObject.winner)
    websocket.send(this.jsonState())
}