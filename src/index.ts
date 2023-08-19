import { resetCanvas } from './Canvas';
import { drawMap, initMap, map } from './Map';
import { detectKeyboardActions } from './Keyboard';
import {
  drawPlayer,
  initPlayerImages,
  movePlayer,
  updatePlayerGravityForce,
} from './Player';
import { renderCollisions } from './Collision';
import { drawUI } from './UI';
import { Timer } from './Timer';
import { showGameOver } from './gameover';

let isGameOver = false;

function animate() {
  if (!isGameOver) {
    resetCanvas();
    drawMap(map);
    updatePlayerGravityForce();
    movePlayer();
    drawPlayer();
    drawUI();
    renderCollisions(false);
    if (Timer.getTimer() < 1) {
      isGameOver = true;
    }
    window.requestAnimationFrame(animate);
  } else {
    showGameOver(false);
  }
}

async function main() {
  detectKeyboardActions();
  try {
    await initMap();
    await initPlayerImages();
  } catch (e) {
    console.error(e);
  }
  Timer.init();
  animate();
}

main();
