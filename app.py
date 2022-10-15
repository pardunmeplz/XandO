from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import numpy as np

app = Flask(__name__)
api = Api(app)

state = np.zeros(9, dtype=int)

class Hello(Resource):
  

    def get(self):
        print(request.args)
        print()
        response = jsonify(state.tolist())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
  
    def post(self):
          

        response = jsonify(state.tolist())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 400
  
  
# adding the defined resources along with their corresponding urls
api.add_resource(Hello, '/')
  
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True)