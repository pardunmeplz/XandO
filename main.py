# driver code
import numpy as np
import draw as d
import rules

state = np.zeros(9, dtype=int)

for _ in range(9):

    move = int(input("select move "))

    while(not rules.allowed(state, move)):
        move = int(input("select move "))

    player = 1 if state.sum() == 0 else -1

    state[move] = player

    if rules.win(state, player):
        print(player, " wins")
        break

    d.draw(state)
