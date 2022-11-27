'''

contains class and object to store the current state of the ongoing game
'''
import websockets
import numpy as np
import asyncio
from algo import AI
import json
import typing

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

    def send(self):
        return json.dumps(self)        

class Socket():
    connections:typing.Set[object] = set()

    async def sender(self,message):
        for websocket in self.connections:
            await websocket.send(message)

    async def handler(self,websocket):
        self.connections.add(websocket)
        try:
            while True:
                message = await websocket.recv()
                print(message)
        except:
            self.connections.remove(websocket)

    async def main(self):
        async with websockets.serve(self.handler,"",8765):
            await asyncio.Future() # infinite loop


if __name__ == "__main__":
    gameState = State()
    nextMove = AI()
    asyncio.run(Socket().main())
