'''
contains class and object to store the current state of the ongoing game
'''
import websockets
import numpy as np
import asyncio
from algo import AI
import json
import typing

class Socket():
    connections:typing.Set[object] = set()
    gameState = {
    'boardState':np.zeros(9, dtype=int),
    'player':1,
    'turn':True,
    'gameOver':False
    }
    nextMove = AI()

    async def send(self,message):
        for websocket in self.connections:
            await websocket.send(message)

    async def handler(self,websocket):
        self.connections.add(websocket)
        try:
            while True:
                message = json.loads(await websocket.recv())
                if not message: continue
                self.gameState = message
                if (not self.gameState['gameOver']) and (not self.gameState['turn']):
                    self.gameState['boardState'][self.nextMove(self.gameState['boardState'])] = -self.gameState['player']
                self.send(json.dumps(self.gameState))
                
        except:
            self.connections.remove(websocket)

    async def main(self):
        async with websockets.serve(self.handler,"",8765):
            await asyncio.Future() # infinite loop


if __name__ == "__main__":
    asyncio.run(Socket().main())
