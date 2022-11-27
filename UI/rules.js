
/**
 * Function checks if a played move is valid or not
 * @param {int} move 
 * @param {int[]} state 
 */
function isValid(move, state) {
    if (state[move] != 0) return false
    return true
}

/**
 * Function checks if either player have won the current game
 * in case of victory returns object with winner and winning sequence
 * else returns null
 * @param {int[]} state 
 */
function winCheck(state) {
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    for (let i = 0; i < wins.length; i++) {
        [x, y, z] = wins[i]
        winner = (state[x] + state[y] + state[z]) / 3

        if (winner == -1) return { winner: -1, sequence: wins[i] }
        if (winner == 1) return { winner: 1, sequence: wins[i] }
    }
    return null
}

/**
 * Function checks if the game state reached a tie, returns true if game tied
 * @param {int[]} state 
 * @returns 
 */
function tieCheck(state) {
    let zeros = state.filter((element) => element == 0)
    return zeros.length == 0
}

