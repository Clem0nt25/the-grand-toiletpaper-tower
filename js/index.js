
window.addEventListener('load', () => {


  // setting constant variables

    const gameBoard = document.getElementById("game-board")
    const gameOver = document.getElementById("gameOver")
    const gameStart = document.getElementById('gameStart')

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    let highScores = []

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



    //  classes 

    class Obstacle {
      constructor() {
        this.width = 50;
        this.height = 60;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = 0 - this.height;
        this.speed = 4.5
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
        this.y = this.y;
        this.speed = 0;
      }
    }


    // obstacles

    let obstacles = [];

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
        obstacle.update();
    
        // Check for collision with roll
        if (rollX < obstacle.x + obstacle.width &&
            rollX + rollWidgth > obstacle.x &&
            rollY < obstacle.y + obstacle.height &&
            rollY + rollHeight > obstacle.y) {

              score += 1
              scoreText.innerHTML = "Your Score: " + score

              obstacle.stop()
              obstacles.pop(obstacle)
            
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



    // rolls

    const drawRoll = () => {
        ctx.beginPath()
        ctx.drawImage(rollImg, rollX, rollY, rollWidgth, rollHeight)
        ctx.fill()
        ctx.closePath()
    }








    // animate screen 

    const animate = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawRoll()


        if (isMovingLeft && rollX !== 0) {
            rollX -= 2.5
        } else if (isMovingRight && rollX != (canvas.width - rollWidgth)) {
            rollX += 2.5
        }

        // obstacles 

        if (animationId % 200 === 0) {
          addObstacle();
        }

        drawObstacles();
        updateObstacles();

        console.log(animationId)

        animationId = requestAnimationFrame(animate)
        console.log(animationId)

        if (gameStatus === false) {
          cancelAnimationFrame(animationId)

          console.log("Animation Canceled")
        }


    }





    const startGame = () => {
        
        gameBoard.style.display = 'block'
        gameStart.style.display = 'none'
        gameOver.style.display = 'none'
        gameStatus = true

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
      nameInput = ""
      scoreText.innerHTML = "Your Score: " + score
      
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

      console.log()

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
    console.log(event)
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = true
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      isMovingRight = true
    }
    console.log({ isMovingLeft, isMovingRight })
    })


    document.addEventListener('keyup', event => {
    console.log(event)
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = false
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      isMovingRight = false
    }
    console.log({ isMovingLeft, isMovingRight })
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




