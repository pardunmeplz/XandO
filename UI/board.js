function makeBoard() {

    // container div for board
    main = document.createElement("div")
    main.id = "board"
    document.getElementsByTagName("body")[0].append(main)

    for (i = 0; i < 9; i++) {

        // new row for every three buttons
        if (i % 3 == 0) {
            mydiv = document.createElement("div")
            main.append(mydiv)
        }

        // new button
        button = document.createElement("button")
        button.id = i
        button.innerText = i
        mydiv.append(button)
    }
}