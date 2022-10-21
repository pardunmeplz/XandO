
class board {

    bridge = new api()
    state = []

    constructor() {
        const init = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
        console.log(init)
        init.forEach((element, index) => {
            this.state[index] = init
            document.getElementById(index).innerText = element;
            document.getElementById(index).className = this.getClass(element)
            document.getElementById(index).onclick = async () => {
                let newState = await this.bridge.getState(index).then((x) => x.map((element, index) => {
                    switch (element) {
                        case -1: return 'o'
                        case 1: return 'x'
                        case 0: return index
                    }
                }))
                console.log(newState['PromiseResult'])
                this.render(newState)
            }
        })
    }

    render = (newState) => {
        this.state.forEach((element, id) => {
            if (element != newState[id]) {
                this.state[id] = newState[id]
                document.getElementById(id).innerText = this.state[id]
                document.getElementById(id).className = this.getClass(this.state[id])
            }
        })
    }

    getClass = (element) => {
        switch (element) {
            case 'o': return 'zero'
            case 'x': return 'X'
            default: return ''
        }
    }


}