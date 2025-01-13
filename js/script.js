const playGround = document.querySelector(".playground");
let scoreElement = document.querySelector("#score");
let highScoreElement = document.getElementById("highScore");

let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let snakeX = 5, snakeY = 10;
let motionX = 0, motionY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && motionY != 1) {
        motionX = 0;
        motionY = -1;
    } else if (e.key === "ArrowDown" && motionY != -1) {
        motionX = 0;
        motionY = 1;
    } else if (e.key === "ArrowLeft" && motionX != 1) { 
        motionX = -1;
        motionY = 0;
    } else if (e.key === "ArrowRight" && motionX != -1) { 
        motionX = 1;
        motionY = 0;
    }
}

const gamePlay = () => {
    if(gameOver) return handleGameOver();
    let template = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === snakeY){
        changeFoodPosition();
        snakeBody.push([foodX , foodY]);
        score++;

        highScore = score>= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
        
    }
    snakeBody[0] = [snakeX, snakeY];

    snakeX += motionX;
    snakeY += motionY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        template += `<div class="snake_head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
        
    }

    playGround.innerHTML = template;
}

changeFoodPosition();
setIntervalId = setInterval(gamePlay, 125);
document.addEventListener("keydown", changeDirection);
