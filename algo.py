'''
# Algo
Provides

AI class that returns best move to play in a given state array

How it works
---
Uses backtracking algorithm to make a state space tree and apply gametheory minimax concepts
to return one of the most favourable moves
'''

import typing
import random as r

def win_check(state:typing.List[int], player:typing.Literal[0,-1,1])-> bool:
    '''
    Function checks if passed player has a winning sequence
    in the passed state array.
    '''
    moves = [i for i,x in enumerate(state) if x == player]
    wins = [(0, 1, 2), (3, 4, 5), (6, 7, 8),
        (0, 3, 6), (1, 4, 7), (2, 5, 8),
        (0, 4, 8), (2, 4, 6)]
    for win in wins:
        if all(x in moves for x in win):
            return True
    return False

def allowed(state:typing.List[int])-> typing.List[int]:
    '''
    Returns all moves in a state that are allowed to be played
    '''
    return [i for i,x in enumerate(state) if x == 0]


class AI:
    '''
    Class contains variables and methods for returning AI generated responses.
    Calling an AI object while passing it a board-state (len(9) ndarray[int])
    will return the most favourable move to play. If there are multiple favourable moves
    it will return one at random.
    '''
    # dict for memoization to store already processed state outputs
    heuristicMap:dict = {}

    def __init__(self)-> None:
        # on initialization generates most of the state space tree and stores it in huristicMap
        self.minimax([0]*9)

    def minimax(self, state:typing.List[int])-> typing.Literal[1,0,-1]:
        '''
        Method impliments minimax game theory analysis on the given board state
        using a backtracking algorithm and returns which player has the advantage in the game.
        '''
        player:typing.Literal[-1,1] = 1 if sum(state) == 0 else -1 # current player
        pending = allowed(state)

        if win_check(state,-player):
            # if state is winning for opponent, return loss
            self.heuristicMap[tuple(state)] = -player
            return -player

        if len(pending) == 0:
            # draw so return draw
            self.heuristicMap[tuple(state)] = 0
            return 0

        drawcheck = -1 # flag to check for draw (drawcheck = 0 in case of draw)

        for move in pending:
            next_state = state[:]
            next_state[move] = player  # played a move

            output = self.minimax(next_state)  # checked the result

            if output == player:  # if favourable move found, play it
                self.heuristicMap[tuple(state)] = player
                return player

            drawcheck *= output

        if drawcheck == 0:  # there is a draw possibility
            self.heuristicMap[tuple(state)] = 0
            return 0

        # all results were unfavourable
        self.heuristicMap[tuple(state)] = -player
        return -player  

    def __call__(self, state) -> int:

        player = 1 if sum(state) == 0 else -1
        moves = allowed(state)
        r.shuffle(moves)
        analyze = []

        # check the advantage for each possible move played
        for move in moves:
            next_state = state[:]
            next_state[move] = player

            # check if output already memoized
            if tuple(next_state) in self.heuristicMap:
                analyze.append((self.heuristicMap[tuple(next_state)], move))
            else:
                analyze.append((self.minimax(next_state), move))

        if player == 1:
            analyze.sort(reverse=True)
        else:
            analyze.sort()
        print(analyze)
        return analyze[0][1]

if __name__ == "__main__":
    play = AI()
    print(play([1,0,-1,0,0,0,0,0,1]))
