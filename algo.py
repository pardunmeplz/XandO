import numpy as np
from gameplay import gameplay
import random as r


class stateSpaceMap:

    heuristicMap = {}
    rules = gameplay(1)

    def __init__(self):
        self.minimax(np.zeros(9, dtype=int))

    def minimax(self, state):

        self.rules.state = state
        player = 1 if state.sum() == 0 else -1
        pending = np.where(state == 0)[0]

        if self.rules.win(-player):
            # if state in wining place for previous player, return loss

            self.heuristicMap[tuple(state)] = -player
            return -player

        if 0 not in state:
            # draw so return draw

            self.heuristicMap[tuple(state)] = 0
            return 0

        drawcheck = 1

        for move in pending:
            nextState = np.copy(state)
            nextState[move] = player  # played a move

            output = self.minimax(nextState)  # checked the result

            if output == player:  # if favourable move found, play it
                self.heuristicMap[tuple(state)] = player
                return player

            drawcheck *= output

        if drawcheck == 0:  # there is a draw possibility
            self.heuristicMap[tuple(state)] = 0
            return 0
        else:
            self.heuristicMap[tuple(state)] = -player
            return -player  # all results were unfavourable

    def nextMove(self, state):

        player = 1 if state.sum() == 0 else -1
        moves = np.where(state == 0)[0]
        r.shuffle(moves)
        analyze = []

        for move in moves:
            nextState = np.copy(state)
            nextState[move] = player

            if tuple(nextState) in self.heuristicMap:
                analyze.append((self.heuristicMap[tuple(nextState)], move))
            else:
                analyze.append((self.minimax(nextState), move))

        if player == 1:
            analyze.sort(key=lambda tup: tup[0], reverse=True)
        else:
            analyze.sort(key=lambda tup: tup[0])
        print(analyze)
        return analyze[0][1]
