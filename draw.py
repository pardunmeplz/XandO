import numpy as np

# input is taken as 1 | 2| 3|
#                   4 | 5| 6|
#                   7 | 8| 9|
#
# 1 --> X | -1 --> 0 | 0 --> blank


def draw(state):
    for i, box in enumerate(state):
        
        if box == 1:
            print('X', end='\t')
        elif box == -1:
            print('O', end='\t')
        else:
            print('_', end='\t')

        if (i+1) % 3 == 0:
            print('\n')