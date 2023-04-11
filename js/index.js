
window.addEventListener('load', () => {


  // setting constant variables

    const gameBoard = document.getElementById("game-board")
    const gameOver = document.getElementById("gameOver")
    const gameStart = document.getElementById('gameStart')

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    let highScores = []
    let obstacles = []
    let rolls = []

    const rollImg = new Image()
    rollImg.src = '../images/toilet-paper.png'

    let rollHeight = 60
    let rollWidgth = 50
    let rollX = canvas.width / 2 - rollWidgth / 2
    let rollY = canvas.height - rollHeight + 10

    let playerName = ""
    let score = 0
    const scoreText = document.getElementById('score')

    console.log(scoreText)

    let isMovingLeft = false
    let isMovingRight = false
    let gameStatus = false
    let animationId = 0

    gameBoard.style.display = 'none'
    gameOver.style.display = 'none'



    //  obstacle class

    class Obstacle {
      constructor() {
        this.width = 50;
        this.height = 60;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = 0 - this.height;
        this.speed = 2
        this.color = '#FF0000';
      }
    
      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    
      update() {
        this.y += this.speed;
      }

      stop() {
        this.speed = 0;
      }

      
      delete() {
        // Find the index of this obstacle in the obstacles array
        const index = obstacles.indexOf(this);
        if (index !== -1) {
          // Remove the obstacle from the obstacles array
          obstacles.splice(index, 1);
      }}

    }



    //  roll class

    class Rolls {
      constructor() {
        this.width = 50;
        this.height = 60;
        this.x = rollX
        this.y = rollY
      }
    
      draw() {
        ctx.beginPath()
        ctx.drawImage(rollImg, this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.closePath()
      }

    
      update(inputX, inputY) {
        this.y = inputY;
        this.x = inputX;
      }

    }



    // roll functions
    const addRolls = () => {
      const roll = new Rolls();
      rolls.push(roll)
    }

    const updateRolls = (inputX, inputY) => {
      for (let i = rolls.length -1; i > -1; i--) {
        rolls[i].update(inputX,inputY)
        break  
      }
    }

    const moveRolls = (movingLeft, movingRight) => {

      if (isMovingRight) {
        rolls.forEach(roll => {
          roll["x"] += 2.5})
      } 

      if (isMovingLeft) {
        rolls.forEach(roll => {
          roll["x"] -= 2.5})
      }

      
    }


    const drawRolls = () => {
      rolls.forEach(roll => {
      roll.draw();
    })}




    // obstacles functions

    const addObstacle = () => {
      const obstacle = new Obstacle();
      obstacles.push(obstacle);
    };


    const drawObstacles = () => {
      obstacles.forEach(obstacle => {
        obstacle.draw();
      });
    };



    const updateObstacles = () => {

      obstacles.forEach(obstacle => {

        // find the last roll
        const lastRoll = rolls[rolls.length - 1];
        rollX = lastRoll.x
        rollY = lastRoll.y
        obstacle.update();



        if (
          rollX < obstacle.x + obstacle.width &&
          rollX + rollHeight > obstacle.x &&
          rollY < obstacle.y + obstacle.height &&
          rollHeight + rollY > obstacle.y
        ) {


          addRolls()
          obstacle.stop()
          let newRollX = obstacle.x
          let newRollY = obstacle.y

          obstacle.delete()
          updateRolls(newRollX,newRollY)
          
          score += 1 
          scoreText.innerHTML = "Your Score: " + score
          
          if(rolls.length > 3) {
            rolls.shift()
            rolls.forEach(roll => {
              console.log(roll.y)
              roll.y += 55
              console.log(roll.y)
            })
          }
      

        } else {
          //console.log("outside", obstacle)
        }



      


        // check for collision with ground

        if (obstacle.y + obstacle.height >= canvas.height) {
          console.log("collision detected")
          obstacle.stop()
          obstacles.pop(obstacle)

          endGame()
          
        }
      });
    };






    // animate screen 

    const animate = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawRolls()
        console.log(rolls)
        console.log(rolls.length)



        moveRolls(isMovingLeft, isMovingRight)

        // obstacles 

        if (animationId % 200 === 0) {
          addObstacle();
        }

        drawObstacles();
        updateObstacles();


        animationId = requestAnimationFrame(animate)
        console.log("----------------------------")
        //console.log(animationId)


        if (gameStatus === false) {
          cancelAnimationFrame(animationId)

          console.log("Animation Canceled")
        }


    }



    // basic mechanics

    const startGame = () => {
        
        gameBoard.style.display = 'block'
        gameStart.style.display = 'none'
        gameOver.style.display = 'none'
        gameStatus = true

        addRolls()
        animate()

    }

    const endGame = () => {
      
      const finalScore = document.querySelector('#gameOver h3')
      finalScore.innerHTML = "Your Score: " + score

      
      gameBoard.style.display = 'none'
      gameStart.style.display = 'none'
      gameOver.style.display = 'block'
      gameStatus = false
      

      createHighScore()

      // reset game variables 
      score = 0
      obstacles = []
      rolls = []
      nameInput = ""
      scoreText.innerHTML = "Your Score: " + score
      rollX = canvas.width / 2 - rollWidgth / 2
      rollY = canvas.height - rollHeight + 10
      
    }

    const createHighScore = () => {


      let ul = document.querySelector(".scoreBoard ul");
      let lis = ul.querySelectorAll("li");

      let player = {
        name: playerName,
        score: score
      }
      highScores.push(player)

      highScores.sort(function(a, b) {
        return b.score - a.score;
      })

      for (let i = 0; i < 5 && i < highScores.length; i++) {
        lis[i].textContent = highScores[i].name + ": " + highScores[i].score;
      }



    }
    

        
    // Event listeners 

    document.getElementById('start-button').addEventListener('click', () => {

        let nameInput = document.getElementById("name").value
        if (nameInput === "") {
          let h2 = document.querySelector('#nameInput h2')
          h2.innerText = "You were supposed to enter your name.."


        } else {
          playerName = nameInput
          console.log("Name put in at beginning: ", nameInput)
          startGame()
        }
        
    })

    document.addEventListener('keydown', event => {
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = true
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      isMovingRight = true
    }
    })

    document.addEventListener('keyup', event => {
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = false
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      isMovingRight = false
    }

    })

    document.getElementById('return').addEventListener('click', () => {
      gameBoard.style.display = 'none'
      gameStart.style.display = 'block'
      gameOver.style.display = 'none'

      // clear initial player name 
      const startName = document.querySelector('#nameInput #name')
      startName.value = ""
      playerName = ""
    })

    document.getElementById('restart').addEventListener('click', () => {
      startGame()
    })
    
})




