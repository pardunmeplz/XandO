class api {
    getState = async (move) => {
        const response = await (
            await fetch('http://127.0.0.1:5000/' + '?move=' + move)
        ).json()
        if (response["result"] != undefined) {
            document.getElementById("prompt").innerText = response["result"]
        }
        return response["state"]
    }
}