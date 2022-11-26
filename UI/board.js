/**
 * Class mantains the initialization and state management of the game board
 * along with cross checking game rules
 */
class Board {

    #state = [0, -1, 1, 0, -1, 0, 0, 0, 0]
    #rendered = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    #getClass = {
        '1': 'X',
        '0': '',
        '-1': 'O'
    }
    Turn = false

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
            button.onclick = () => {
                if (!this.Turn) { return }
                this.setState(i, -1)
                this.Turn = !this.Turn
            }
            mydiv.append(button)
        }
    }

    /**
     * method called whenever there is a change in state of the board to
     * update the dom based on the changes in board state
     */
    #renderBoard() {
        if (this.#state == this.#rendered) { return }
        this.#state.forEach((element, index) => {
            if (element != this.#rendered[index]) {
                let button = document.getElementById("button-" + index)
                button.className = this.#getClass[element]
                button.innerText = this.#getClass[element]
            }
        })
        this.#rendered = [...this.#state]
    }

    /**
     * method to set the state of a button on the board
     */
    setState(index, value) {
        this.#state[index] = value
        this.#renderBoard()
    }
}


var myBoard = new Board()