# driver code
from distutils.log import debug
import numpy as np
from gameplay import gameplay
import algo as PC
from flask import Flask, jsonify, request
from flask_restful import Resource, Api

game = gameplay(1)
app = Flask(__name__)
api = Api(app)

def play(move):

        if game.end():
                return
            
        if not game.playMove(move): # mutates array and returns true if move legal
            return
        check = game.end()
        if check != None:
            prompt = {-1:"You Lose !",0:"Draw :/", 1:"You Win !!!"}
            return prompt[check]

        game.playMove(PC.nextMove(game.state))
        check = game.end()
        if check != None:
            prompt = {-1:"You Lose !",0:"Draw :/", 1:"You Win !!!"}
            return prompt[check]

        return

class Bridge(Resource):
    def get(self):
        data = int(request.args['move'])
        if data == -1: ## reset condition
            if game.reset() == -1:
                game.playMove(PC.nextMove(game.state))

        result = play(data)

        response = { "state" :game.state.tolist(), "result":result, "player":game.player}
        response = jsonify(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
  
api.add_resource(Bridge, '/')

if __name__ == "__main__":
    app.run(debug=True)