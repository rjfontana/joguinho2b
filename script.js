const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");

const enemyImages = [
  "enemy1.png", "enemy2.png", "enemy3.png",
  "enemy4.png", "enemy5.png", "enemy3.png"
];

const playerShotImage = "shot.png";
const enemyShotImage = "enemy-shot.png";

let playerX = game.offsetWidth / 2 - 40;
let score = 0;
let lives = 3;
let currentEnemy = 0;

player.style.left = playerX + "px";
player.style.bottom = "0px";

// Movimento do jogador
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } else if (e.key === "ArrowRight" && playerX < game.offsetWidth - 80) {
    playerX += 20;
  } else if (e.key === " " || e.key === "ArrowUp") {
    shoot();
  }
  player.style.left = playerX + "px";
});

// Criar tiro do jogador
function shoot() {
  const shot = document.createElement("img");
  shot.src = playerShotImage;
  shot.classList.add("shot");
  shot.style.left = playerX + 25 + "px";
  shot.style.bottom = "100px";
  game.appendChild(shot);

  const interval = setInterval(() => {
    const bottom = parseInt(shot.style.bottom);
    if (bottom > game.offsetHeight) {
      clearInterval(interval);
      shot.remove();
    } else {
      shot.style.bottom = bottom + 10 + "px";
      detectHit(shot, interval);
    }
  }, 30);
}

// Criar inimigo
function spawnEnemy() {
  const enemy = document.createElement("img");
  enemy.src = enemyImages[currentEnemy % enemyImages.length];
  enemy.classList.add("enemy");
  enemy.style.left = Math.random() * (game.offsetWidth - 80) + "px";
  enemy.style.top = "0px";
  game.appendChild(enemy);

  moveEnemy(enemy);
}

// Movimento inimigo + tiro
function moveEnemy(enemy) {
  const interval = setInterval(() => {
    if (!enemy) return;

    let top = parseInt(enemy.style.top);
    if (top > game.offsetHeight - 50) {
      clearInterval(interval);
      enemy.remove();
      loseLife();
      return;
    }

    enemy.style.top = top + 5 + "px";

    if (Math.random() < 0.01) {
      enemyShoot(enemy);
    }
  }, 50);
}

// Inimigo atira
function enemyShoot(enemy) {
  const enemyShot = document.createElement("img");
  enemyShot.src = enemyShotImage;
  enemyShot.classList.add("enemy-shot");
  enemyShot.style.left = parseInt(enemy.style.left) + 25 + "px";
  enemyShot.style.top = parseInt(enemy.style.top) + 50 + "px";
  game.appendChild(enemyShot);

  const interval = setInterval(() => {
    const top = parseInt(enemyShot.style.top);
    if (top > game.offsetHeight) {
      clearInterval(interval);
      enemyShot.remove();
    } else {
      enemyShot.style.top = top + 10 + "px";
      detectPlayerHit(enemyShot, interval);
    }
  }, 30);
}

// Detectar colisão de tiro no inimigo
function detectHit(shot, interval) {
  const enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    const shotBox = shot.getBoundingClientRect();
    const enemyBox = enemy.getBoundingClientRect();
    if (
      shotBox.left < enemyBox.right &&
      shotBox.right > enemyBox.left &&
      shotBox.top < enemyBox.bottom &&
      shotBox.bottom > enemyBox.top
    ) {
      clearInterval(interval);
      shot.remove();
      enemy.remove();
      score += 100;
      scoreText.textContent = `Pontuação: ${score}`;
      currentEnemy++;
      spawnEnemy();
    }
  });
}

// Detectar colisão do inimigo com jogador
function detectPlayerHit(enemyShot, interval) {
  const playerBox = player.getBoundingClientRect();
  const shotBox = enemyShot.getBoundingClientRect();
  if (
    shotBox.left < playerBox.right &&
    shotBox.right > playerBox.left &&
    shotBox.top < playerBox.bottom &&
    shotBox.bottom > playerBox.top
  ) {
    clearInterval(interval);
    enemyShot.remove();
    loseLife();
  }
}

function loseLife() {
  lives--;
  livesText.textContent = `Vidas: ${lives}`;
  if (lives <= 0) {
    alert("Game Over! Recarregando...");
    location.reload();
  } else {
    spawnEnemy();
  }
}

spawnEnemy();

document.getElementById("leftBtn").addEventListener("touchstart", () => {
  playerX = Math.max(0, playerX - 20);
  player.style.left = playerX + "px";
});

document.getElementById("rightBtn").addEventListener("touchstart", () => {
  playerX = Math.min(720, playerX + 20);
  player.style.left = playerX + "px";
});

document.getElementById("shootBtn").addEventListener("touchstart", () => {
  shoot();
});

