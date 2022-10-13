from shutil import move
import numpy as np


def win(state, player):  # player  = 1 for X and -1 for O
    moves = np.where(state == player)[0]

    wins = [(0, 1, 2), (3, 4, 5), (6, 7, 8),  # winning sequences
            (0, 3, 6), (1, 4, 7), (2, 5, 8),
            (0, 4, 8), (2, 4, 6)]

    for win in wins:
        if all(x in moves for x in win):
            return True

    return False


def allowed(state, move):
    taken = np.where(state != 0)[0]

    return move not in taken
