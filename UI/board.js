/**
 * Class mantains the initialization and state management of the game board
 */
class Board {

    #state = [0, -1, 1, 0, -1, 0, 0, 0, 0]
    #rendered = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    #getClass = {
        '1': 'X',
        '0': '',
        '-1': 'O',
        'w': 'WIN'
    }
    turn = true
    gameOver = false
    player = 1

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
        document.getElementsByTagName('body')[0].append(main)

        for (let i = 0; i < 9; i++) {

            // new row for every three buttons
            if (i % 3 == 0) {
                var mydiv = document.createElement("div")
                main.append(mydiv)
            }

            // new button
            let button = document.createElement("button")
            button.id = 'button-' + i
            button.innerText = i
            mydiv.append(button)

            button.onclick = () => {

                if (!this.turn || this.gameOver) return
                if (!isValid(i, this.#state)) return

                this.setState((state) => {
                    state[i] = this.player
                    return state
                })
                this.turn = !this.turn

                if (tieCheck(this.#state)) {
                    this.gameOver = true
                    return
                }

                let winObject = winCheck(this.#state)
                if (winObject == null) return

                this.setState((state) => {
                    winObject.sequence.forEach((index) => {
                        state[index] = 'w'
                    })
                    return state
                })
                this.gameOver = true

            }
        }
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
            if (element != 'w') button.innerText = this.#getClass[element]
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

    reset() {
        this.player = - this.player
        this.turn = this.player == 1
        this.setState(() => [0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
}

var myBoard = new Board()