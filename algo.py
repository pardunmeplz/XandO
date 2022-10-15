import numpy as np
from gameplay import gameplay
import random as r

rules = gameplay(1)

def minimax(state):
    rules.state = state
    player = 1 if state.sum() == 0 else -1
    pending = np.where(state == 0)[0]

    if rules.win(-player):
        # if state in wining place for previous player, return loss
        return -player

    if 0 not in state:
        # draw so return draw
        return 0

    drawcheck = 1

    for move in pending:
        nextState = np.copy(state)
        nextState[move] = player  # played a move

        output = minimax(nextState)  # checked the result

        if output == player:  # if favourable move found, play it
            return player

        drawcheck *= output

    if drawcheck == 0:  # there is a draw possibility
        return 0
    else:
        return -player  # all results were unfavourable


def nextMove(state):

    player = 1 if state.sum() == 0 else -1
    moves = np.where(state == 0)[0]
    r.shuffle(moves)
    analyze = []

    for move in moves:
        nextState = np.copy(state)
        nextState[move] = player
        analyze.append((minimax(nextState), move))

    if player == 1:
        analyze.sort(key=lambda tup: tup[0], reverse=True)
    else:
        analyze.sort(key=lambda tup: tup[0])

    return analyze[0][1]
