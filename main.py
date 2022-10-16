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

class Bridge(Resource):
    def get(self):
        data = request.args

        if game.draw():
            return(response(game.state.tolist()))

        if game.playMove(int(data['move'])):
            if not game.draw():
                game.playMove(PC.nextMove(game.state))

        response = jsonify(game.state.tolist())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
  
api.add_resource(Bridge, '/')

if __name__ == "__main__":
    app.run(debug=True)