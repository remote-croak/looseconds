import { resetCanvas } from './Canvas';
import { drawMap, initMap, map } from './Map';
import { detectKeyboardActions } from './Keyboard';
import {
  drawPlayer,
  initPlayerImages,
  movePlayer,
  player,
  PLAYER_INITIAL_X,
  PLAYER_INITIAL_Y,
  updatePlayerGravityForce,
} from './Player';
import { renderCollisions } from './Collision';
import { drawUI } from './UI';
import { Timer } from './Timer';
import { showGameOver } from './gameover';
import { moveMap } from './MoveController';
import { getSelectedMap, changeMap, mapController } from './MapController';

let isGameOver = false;

function animate(mapIndex: number) {
  if (mapIndex === mapController.selectedMap) {
    window.requestAnimationFrame(animate.bind(null, mapIndex));
  } else {
    initMap(getSelectedMap()).then(() => {
      player.x = PLAYER_INITIAL_X;
      player.y = PLAYER_INITIAL_Y;
      window.requestAnimationFrame(
        animate.bind(null, mapController.selectedMap)
      );
    });
    return;
  }

  const map = getSelectedMap();

  if (!isGameOver) {
    resetCanvas();
    moveMap();
    drawMap(map);
    updatePlayerGravityForce(map.tiledExport);
    movePlayer(map.tiledExport);
    drawPlayer();
    drawUI();
    renderCollisions(true, map.tiledExport);
    changeMap();
    if (Timer.getTimer() < 1) {
      isGameOver = true;
    }
  } else {
    showGameOver(false);
  }
}

async function main() {
  detectKeyboardActions();
  try {
    await initPlayerImages();
  } catch (e) {
    console.error(e);
  }
  Timer.init();
  animate(-1);
}

main();
