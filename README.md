# XandO

A single player x and o game written in python with a browser based frontend

## Backend

- written in python -> flask
  just recieves get requests with the player move added as a parameter and responds with an updated state array
- backtracking algorithm based on minimax game throry to calculate computer response

## Frontend

- written in HTML, CSS and vanilla javascript 

__disclaimer:__ there are a million easier and more practical ways to give your python project a UI than to host an api using flask and fetching the requests in a seperate webpage. I just did this out of curiosity.

### To-DO

- Add Evaluation bar that shows who has the advantage in game
- Change algorithm for computer response for better speeds
  - Use backTracking algorithm first at start to initialize the state tree and save it
  - Look up adequite response from said state tree to avoid recalculating every time

work in progress . . .
