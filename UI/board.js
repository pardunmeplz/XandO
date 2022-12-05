/**
 * Class mantains the initialization and state management of the game board
 * Add an element with "prompt" as ID that has innerText to display wins /losses/ties
 */
class Board {

    #rendered = { ... this.#state }
    #getClass = {
        '1': 'X',
        '0': '',
        '-1': 'O',
        '3': 'WIN',
        '-3': 'WIN'
    }


    constructor(websocket) {
        this.websocket = websocket
    }
    /**
     * Makes a grid of 9 buttons in rows of 3 seperated by divs
     * and appends them to parent of the script tag running the function
     * ID of each button is button-i where i is it's index starting from 0 : -
     * |   |   |   |
     * |---|---|---|
     * | 0 | 1 | 2 |
     * | 3 | 4 | 5 |
     * | 6 | 7 | 8 |
     */
    makeBoard() {
        // container div for board
        let main = document.createElement("div")
        main.id = "board"
        document.currentScript.parentElement.append(main)
        document.getElementById("displayPlayer").innerText = "You are playing as ".concat(this.player == 1 ? 'X' : 'O')

        for (let i = 0; i < 9; i++) {

            // new row for every three buttons
            if (i % 3 == 0) {
                var mydiv = document.createElement("div")
                main.append(mydiv)
            }

            // new button
            let button = document.createElement("button")
            let buttonState = this.#state[i]
            button.id = 'button-' + i
            button.className = this.#getClass[buttonState]
            button.innerText = buttonState > 0 ? 'X' : 'O'
            if (buttonState == 0) button.innerText = i
            mydiv.append(button)

            button.onclick = () => {
                let websocket = this.websocket
                // filter out useless inputs
                if (!this.turn || this.gameOver || !isValid(i, this.#state)) return

                // set button state
                this.setState((state) => {
                    state[i] = this.player
                    return state
                })
                this.turn = !this.turn

                // check for victory
                let winObject = winCheck(this.#state)
                if (winObject == null) {
                    this.gameOver = tieCheck(this.#state) // check for tie
                    websocket.send(this.jsonState())
                    this.setPrompt()
                    return
                }

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
        }
    }

    /**
     * Method updates prompt based off known state values
     * if game has a winner, pass it to the method.
     * @param {int} winner 
     */
    setPrompt(winner = 0) {
        let prompt = {
            'win': 'You win!!',
            'loss': 'You lose :(',
            'tie': 'Its a tie :/',
            'turn': 'Play move !',
            'notTurn': 'Playing . . .'
        }
        if (this.gameOver) {
            switch (winner) {
                case -this.player:
                    document.getElementById("prompt").innerText = prompt.loss
                    break
                case this.player:
                    document.getElementById("prompt").innerText = prompt.win
                    break
                default:
                    document.getElementById("prompt").innerText = prompt.tie
            }
            return
        }
        document.getElementById("prompt").innerText = this.turn ? prompt.turn : prompt.notTurn
    }

    /**
     * method called whenever there is a change in state of the board to
     * update the dom based on the changes in board state
     */
    #renderBoard() {
        if (this.#state == this.#rendered) return
        this.#state.forEach((element, index) => {

            if (element == this.#rendered[index]) return

            let button = document.getElementById("button-" + index)
            button.className = this.#getClass[element]
            button.innerText = element > 0 ? 'X' : 'O'
            if (element == 0) button.innerText = index
        })

        this.#rendered = [...this.#state]
    }


    /**
     * method to change state of the board. 
     * pass a function with a single state parameter to the method
     * the function should return the updated state 
     * @param {Function} func 
     */
    setState(func) {
        this.#state = func(this.#state)
        this.#renderBoard()
    }

    /**
     * method to reset board state to blank.
     * Also switches player from X to O and vice-versa.
     */
    reset() {
        this.player = - this.player
        this.turn = this.player == 1

        this.setState(() => [0, 0, 0, 0, 0, 0, 0, 0, 0])
        document.getElementById("displayPlayer").innerText = "You are playing as ".concat(this.player == 1 ? 'X' : 'O')
        this.setPrompt()
        this.websocket.send(this.jsonState())
    }

    /**
     * returns the game state as a json string to use as a message
     * to send to the server.
     * @returns {string} jsonMessage
     */
    jsonState() {
        return JSON.stringify({
            'type': 'move',
            'boardState': this.#state,
            'turn': this.turn,
            'player': this.player,
            'gameOver': this.gameOver
        })
    }
}

