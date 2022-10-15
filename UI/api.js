class api {
    getState = async (move) => {
        const response = await (await fetch('http://127.0.0.1:5000/' + '?move=' + move)).json()
        console.log(response)
    }
}

const bridge = new api()
bridge.getState()