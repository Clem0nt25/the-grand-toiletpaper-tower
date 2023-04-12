# The Grand Toilet Paper Tower

## Description

The Grand Toilet Paper Tower is a game where your goal is to stack as many toilet paper rolls on top of eachother as possible. The toilet paper rolls come from the top and the speed at which they come increases every 5 rolls caught. 

## MVP (DOM - CANVAS)

- Game has a starting roll that can be moved on the X Axis 
- Obstacles Toilet Paper Rolls fall from the top
- Score is increased by one if the two objects collide 
- Obstacle becomes part of the tower once collided
- Rate at which obsticales fly at you increases every 5 score points
- game over if rolls is missed

## Backlog

- high score board

## Data Structure

# index.js

- gameStart () {}
- endGame () {}
- createHighscore () {}
- moveRolls () {}
- increaseCounter () {}
- drawBg () {}
- addObstacle () {}
- drawObstacles () {}
- updateObstacle () {}
- addRoles () {}
- updateRolls () {}
 

- obstacles () {
    this.width;
    this.height;
    this.x;
    this.y;
    this.speed;
    this.color;
}
- draw () {}
- update () {}
- increaseObsSpeed () {}
- stop () {}


- rolls () {
    this.width;
    this.height;
    this.x;
    this.y;
}
- draw () {}
- move () {}



## States y States Transitions
Definition of the different states and their transition (transition functions)

- gameStart
- gameBoard
- gameOver

## Links

### Git
URls for the project repo and deploy
[Link Repo](https://github.com/Clem0nt25/the-grand-toiletpaper-tower)
[Link Deploy](https://clem0nt25.github.io/the-grand-toiletpaper-tower/)

### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1yIxRwhhxt0s-VPb7nNDa9yI6Ii8A2UDHVFHYIXosNhk/edit?usp=sharing)