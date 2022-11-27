'''
## Driver code
contains class and object to store the current state of the ongoing game
'''
import numpy as np
from algo import AI

class State:
    '''
    ## Game state
    State object that contains all attributes to accurately describe
    The current state of the X and O game
    '''
    boardState = np.zeros(9, dtype=int)
    player = -1
    turn = False
    gameOver = False

if __name__ == "__main__":
    gameState = State()
    nextMove = AI()
