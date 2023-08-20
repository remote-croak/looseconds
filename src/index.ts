import { resetCanvas } from './Canvas';
import { drawMap, initMap } from './Map';
import { detectKeyboardActions } from './Keyboard';
import {
  drawPlayer,
  initPlayerImages,
  movePlayer,
  player,
  PLAYER_INITIAL_X,
  PLAYER_INITIAL_Y,
  playerWins,
  updatePlayerGravityForce,
} from './Player';
import { renderCollisions } from './Collision';
import { renderTraps } from './Trap';
import { drawUI } from './UI';
import { Timer } from './Timer';
import { showGameOver } from './gameover';
import { moveMap } from './MoveController';
import { getSelectedMap, changeMap, mapController } from './MapController';
import { drawTitle } from './Title';
import { playBgMusic } from './Audio';
import { trapPlayer } from './PlayerTrapsController';

let isGameOver = false;

function animate(mapIndex: number) {
  if (!isGameOver) {
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

    resetCanvas();
    moveMap();
    drawMap(map);
    updatePlayerGravityForce(map.tiledExport);
    movePlayer(map.tiledExport);
    trapPlayer(map.tiledExport);
    drawPlayer();
    drawUI();
    renderCollisions(false, map.tiledExport);
    renderTraps(false, map.tiledExport);
    changeMap();
    if (playerWins()) {
      isGameOver = true;
    }
    if (Timer.getTimer() < 1) {
      isGameOver = true;
    }
  } else {
    showGameOver(playerWins());
  }
}

async function main() {
  detectKeyboardActions();
  try {
    await initPlayerImages();
  } catch (e) {
    console.error(e);
  }
  drawTitle();
  window.addEventListener('keydown', (event) => {
    if (event.code == 'Digit1') {
      Timer.init();
      playBgMusic('dinosaurEra');
      animate(-1);
    } else if (event.code == 'Digit2') {
      window.open('https://github.com/Acousticdesk/looseconds');
    } else {
    }
  });
}

main();
