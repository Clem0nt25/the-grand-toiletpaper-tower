
window.addEventListener('load', () => {

    const gameBoard = document.getElementById("game-board")
    const gameOver = document.getElementById("gameOver")
    const gameStart = document.getElementById('gameStart')

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const rollImg = new Image()
    rollImg.src = '../images/toilet-paper.png'

    let rollHeight = 60
    let rollWidgth = 50
    let rollX = canvas.width / 2 - rollWidgth / 2
    let rollY = canvas.height - rollHeight + 10



    let isMovingLeft = false
    let isMovingRight = false
    let gameStatus = false


    gameBoard.style.display = 'none'
    gameOver.style.display = 'none'


    const drawRoll = () => {
        ctx.beginPath()
        ctx.drawImage(rollImg, rollX, rollY, rollWidgth, rollHeight)
        ctx.fill()
        ctx.closePath()
    }


    const animate = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawRoll()

        if (isMovingLeft && rollX !== 0) {
            rollX -= 1.5

            console.log(rollX)
            console.log(rollY)
          } else if (isMovingRight && rollX != (canvas.width - rollWidgth)) {
            rollX += 1.5
          }







        requestAnimationFrame(animate)
    }










    const startGame = () => {
        
        gameBoard.style.display = 'block'
        gameStart.style.display = 'none'
        gameOver.style.display = 'none'

        animate()

        console.log("test")
    
    }
    
        
    // Event listeners 

    document.getElementById('start-button').addEventListener('click', () => {
        startGame()
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

})



