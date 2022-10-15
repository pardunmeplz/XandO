const getClass = (element) => {
    switch (element) {
        case 'o': return 'zero'
        case 'x': return 'X'
        default: return ''
    }
}

export const render = (arr) =>
    arr.forEach((element, index) => {
        document.getElementById(index).innerText = element;
        document.getElementById(index).className = getClass(element)
    })