let playerX = 160, playerY = 350, playerW = 100, playerH = 33
let itemX = 200, itemY = 0, itemW = 50, itemH = 50;

let paused = false
let lives = 3;
let score = 0

let thwomp
let bricks
let gameOver
let gameWon

let gameOverSound
let gameWonSound
let breakSound
let thwompSound


function setup() {
  createCanvas(400, 400);
}

function preload() {
  thwomp = loadImage('thwomp.png')
  bricks = loadImage('bricks.jpg')
  gameOver = loadImage('gameOver.gif')
  gameWon = loadImage('gameWon.gif')
  
  gameOverSound = loadSound('gameOverSound.wav')
  gameWonSound = loadSound('gameWonSound.wav')
  breakSound = loadSound('breakblock.wav')
  thwompSound = loadSound('thwompSound.mp3')
}

function draw() {
  background(0);

  itemY += 3;

  if (itemY > height) {
    itemY = 0;
    itemX = random(width);
    lives--
    thwompSound.play()
  }

  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5;
  }

  image(bricks, playerX, playerY, playerW, playerH);
  image(thwomp, itemX, itemY, itemW, itemH);

  // Check for catching item
  if (playerX < itemX + itemW &&
      playerX + playerW > itemX &&
      playerY < itemY + itemH &&
      playerY + playerH > itemY) {
    score += 1;
    itemY = 0;
    itemX = random(width);
    breakSound.play()
  }

  fill(255);
  textSize(20);
  text("Lives: " + lives, 10, 20);
  text("Score: " + score, 10, 40);
  
  if(lives <= 0){
    image(gameOver, 0, 0, width, height)
    if(gameOverSound.isPlaying() === false){
      gameOverSound.play()
    }
  }
  if(score >= 5) {
    image(gameWon, 0, 0, width, height)
    if(gameWonSound.isPlaying() === false){
      gameWonSound.play()
    }
  }
  
  if(keyIsDown(82)) location.reload()
  
}

function mousePressed(){
  if(paused){
    paused = false
    loop()
  } else {
    paused = true
    noLoop()
  }
}
