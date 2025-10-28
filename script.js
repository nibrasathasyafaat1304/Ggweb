const player = document.querySelector('.player');
const enemy = document.querySelector('.enemy');
const finis = document.querySelector('.finis');
const enemydua = document.queryselector('.enemydua');
const enemytiga = document.queryselector('.enemytiga');
const message = document.querySelector('.message');
const gameArea = document.querySelector('.game-area');

let playerX = 50;
let playerY = 60;
let velocityY = 0;
let jumping = false;
const gravity = 2.5;
const jumpPower = 35;
const speed = 10;
let gameOver = false;

function updatePlayer() {
  player.style.left = playerX + 'px';
  player.style.bottom = playerY + 'px';
// Posisikan message di atas kepala player
message.style.left = (playerX + 30) + 'px'; // +30 biar di tengah gambar
message.style.bottom = (playerY + 100) + 'px'; // +100 = di atas kepala

  // Kamera mengikuti player
  const cameraX = Math.max(0, playerX - 150);
  gameArea.style.transform = `translateX(${-cameraX}px)`;
}

function checkCollision(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function checkGameStatus() {
  if (checkCollision(player, enemy)) {
    message.innerText = "💀 Game Over! Kamu menabrak musuh!";
    message.style.display = 'block';
    gameOver = true;
  } else if (checkCollision(player, enemydua)) {
    message.innerText = "💀 Game Over! Kamu menabrak musuh!";
    message.style.display = 'block';
    gameOver = true;
  } else if (checkCollision(player, enemytiga)) {
    message.innerText = "💀 Game Over! Kamu menabrak musuh!";
    message.style.display = 'block';
    gameOver = true;
  } else if (checkCollision(player, finis)) {
    message.innerText = "🎉 Selamat! Kamu Menang!";
    message.style.display = 'block';
    gameOver = true;
  }
}

function jump() {
  if (jumping || gameOver) return;
  jumping = true;
  velocityY = jumpPower;
}

function gameLoop() {
  if (!gameOver) {
    // Gravitasi dan lompat
    if (jumping) {
      playerY += velocityY;
      velocityY -= gravity;
      if (playerY <= 60) {
        playerY = 60;
        jumping = false;
        velocityY = 0;
      }
    }

    updatePlayer();
    checkGameStatus();
  }

  requestAnimationFrame(gameLoop);
}

document.getElementById('left-btn').addEventListener('touchstart', () => {
  if (gameOver) return;
  playerX -= speed;
  if (playerX < 0) playerX = 0;
  updatePlayer();
});

document.getElementById('right-btn').addEventListener('touchstart', () => {
  if (gameOver) return;
  const maxRight = 3000 - 60; // sesuai lebar map
  playerX += speed;
  if (playerX > maxRight) playerX = maxRight;
  updatePlayer();
});

document.getElementById('jump-btn').addEventListener('touchstart', () => {
  jump();
});

updatePlayer();
gameLoop();