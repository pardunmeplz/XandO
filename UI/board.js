
class board {

    state = []

    constructor(init, player) {
        init.forEach((element, index) => {
            this.state[index] = init
            document.getElementById(index).innerText = element;
            document.getElementById(index).className = this.getClass(element)
            document.getElementById(index).onclick = () => this.changeButton(index, player)
        })
    }

    changeButton = (id, player) => {
        if (this.state[id] != player) {
            this.state[id] = player
            document.getElementById(id).innerText = this.state[id]
            document.getElementById(id).className = this.getClass(this.state[id])
        }
    }

    getClass = (element) => {
        switch (element) {
            case 'o': return 'zero'
            case 'x': return 'X'
            default: return ''
        }
    }


}