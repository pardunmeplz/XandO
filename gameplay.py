import numpy as np

class gameplay:
    
    # 1 -> x 
    # -1 -> o
    # 0 -> 'blank'

    state = np.zeros(9, dtype=int) # board state
    
    chance = 1 # current chance
    player = -1 # human player

    def __init__(self, player):
        self.player = player

    def playMove(self, move):
        
        # check if move allowed
        allowed = np.where(self.state == 0)[0]
        if(move not in allowed): return False
        
        self.state[move] = self.chance
        self.chance = -self.chance
        return True

    def win(self, player):  
        
        if(player == 0): player = self.chance

        moves = np.where(self.state == player)[0]
        wins = [(0, 1, 2), (3, 4, 5), (6, 7, 8),  
            (0, 3, 6), (1, 4, 7), (2, 5, 8),
            (0, 4, 8), (2, 4, 6)]

        for win in wins:
            if all(x in moves for x in win):
                return True
        return False

    def draw(self): # draw condition
        allowed = np.where(self.state == 0)[0]
        print(allowed)
        print(allowed.size)
        return allowed.size == 0
