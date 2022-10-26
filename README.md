# XandO

A single player x and o game written in python with a browser based frontend
Start the main.py file to run the game

dependencies ->
  flask 1.1.2
  flask-restful 0.3.8

## Backend

- written in python -> flask
  just recieves get requests with the player move added as a parameter and responds with an updated state array
- backtracking algorithm based on minimax game throry to calculate computer response

## Frontend

- written in HTML, CSS and vanilla javascript

__disclaimer:__ there are a million easier and more practical ways to give your python project a UI than to host an api using flask and fetching the requests in a seperate webpage. I just did this out of curiosity.

### To-DO

- Add Evaluation bar that shows who has the advantage in game
- Make the UI update in real-time

work in progress . . .
