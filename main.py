# driver code
import numpy as np
import draw as d
import rules
import algo as PC

state = np.zeros(9, dtype=int)

for _ in range(9):

    player = 1 if state.sum() == 0 else -1  # 1 -> X and -1 -> Y

    if player == 1:
        move = d.playerInput(state)
    else:
        move = PC.nextMove(state)

    state[move] = player
    d.render(state)

    if rules.win(state, player):
        print(player, " wins")
        break
