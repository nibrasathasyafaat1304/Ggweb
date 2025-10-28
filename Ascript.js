const player = document.querySelector('.player');
const enemy = document.querySelector('.enemy');
const enemydua = document.querySelector('.enemydua');
const enemytiga = document.querySelector('.enemytiga');
const finis = document.querySelector('.finis');
const message = document.querySelector('.message');
const gameArea = document.querySelector('.game-area');

let playerX = 50;
let playerY = 60;
let velocityY = 0;
let jumping = false;
let gameOver = false;

const gravity = 2.5;
const jumpPower = 35;
const speed = 10;
const mapWidth = 3000;

let moveLeft = false;
let moveRight = false;

// --- update posisi player ---
function updatePlayer() {
  player.style.left = playerX + 'px';
  player.style.bottom = playerY + 'px';
// Posisikan message di atas kepala player
message.style.left = (playerX + 30) + 'px'; // +30 biar di tengah gambar
message.style.bottom = (playerY + 100) + 'px'; // +100 = di atas kepala

  // kamera mengikuti player
  const cameraX = Math.max(0, playerX - 150);
  gameArea.style.transform = `translateX(${-cameraX}px)`;
}

// --- deteksi tabrakan ---
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

// --- cek status game ---
function checkGameStatus() {
  if (checkCollision(player, enemy) || 
      checkCollision(player, enemydua) || 
      checkCollision(player, enemytiga)) {
    message.innerText = "💀 Game Over! Kamu menabrak musuh!";
    message.style.display = 'block';
    gameOver = true;
  } else if (checkCollision(player, finis)) {
    message.innerText = "🎉 Selamat! Kamu Menang!";
    message.style.display = 'block';
    gameOver = true;
  }
}

// --- fungsi lompat ---
function jump() {
  if (jumping || gameOver) return;
  jumping = true;
  velocityY = jumpPower;
}

// --- loop utama game ---
function gameLoop() {
  if (!gameOver) {

    // gravitasi + lompat
    if (jumping) {
      playerY += velocityY;
      velocityY -= gravity;
      if (playerY <= 60) {
        playerY = 60;
        jumping = false;
        velocityY = 0;
      }
    }

    // gerak kiri-kanan (selama tombol ditekan)
    if (moveLeft) {
      playerX -= speed;
      if (playerX < 0) playerX = 0;
    }
    if (moveRight) {
      playerX += speed;
      if (playerX > mapWidth - 60) playerX = mapWidth - 60;
    }

    updatePlayer();
    checkGameStatus();
  }

  requestAnimationFrame(gameLoop);
}

// --- kontrol tombol ---
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const jumpBtn = document.getElementById('jump-btn');

leftBtn.addEventListener('touchstart', () => moveLeft = true);
leftBtn.addEventListener('touchend', () => moveLeft = false);

rightBtn.addEventListener('touchstart', () => moveRight = true);
rightBtn.addEventListener('touchend', () => moveRight = false);

jumpBtn.addEventListener('touchstart', () => jump());

updatePlayer();
gameLoop();