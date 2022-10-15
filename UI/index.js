
const arr = ['o', 'o', 'o', '', '', '', 'o', 'o', 'x']
const player = 'x'

const getClass = (element) => {
    switch (element) {
        case 'o': return 'zero'
        case 'x': return 'X'
        default: return ''
    }
}

const button = () => {
    arr.forEach((_, index) => {
        document.getElementById(index).onclick = () => onClick(index, player)
    })
}

const renderAll = () =>
    arr.forEach((element, index) => {
        document.getElementById(index).innerText = element;
        document.getElementById(index).className = getClass(element)
    })

const renderButton = (id) => {
    document.getElementById(id).innerText = arr[id]
    document.getElementById(id).className = getClass(arr[id])
}

const onClick = (id, player) => {
    arr[id] = player
    renderButton(id)
    alert('Hi')
}

button();
renderAll();
