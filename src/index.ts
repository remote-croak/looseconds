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
import {
  collectible,
  initCollectibleImages,
  renderCollectibles,
  resetCollectibles,
} from './Collectible';
import { showGameOver } from './gameover';
import { moveMap } from './MoveController';
import { getSelectedMap, changeMap, mapController } from './MapController';
import { drawTitle } from './Title';
import { playBgMusic } from './Audio';
import { trapPlayer } from './PlayerTrapsController';
import { frameLimiter } from './FrameLimiter';
import { pickCollectible } from './PlayerCollectibleController';

let isGameOver = false;

function animate(mapIndex: number) {
  frameLimiter.delta = Date.now() - frameLimiter.then;

  // cap the frame rate to 60 FPS
  if (frameLimiter.delta < frameLimiter.interval) {
    window.requestAnimationFrame(animate.bind(null, mapIndex));
    return;
  }

  // Just `then = now` is not enough.
  // Lets say we set fps at 10 which means
  // each frame must take 100ms
  // Now frame executes in 16ms (60fps) so
  // the loop iterates 7 times (16*7 = 112ms) until
  // delta > interval === true
  // Eventually this lowers down the FPS as
  // 112*10 = 1120ms (NOT 1000ms).
  // So we have to get rid of that extra 12ms
  // by subtracting delta (112) % interval (100).
  frameLimiter.then = Date.now() - (frameLimiter.delta % frameLimiter.interval);

  if (!isGameOver) {
    if (mapIndex === mapController.selectedMap) {
      window.requestAnimationFrame(animate.bind(null, mapIndex));
    } else {
      resetCollectibles();
      initMap(getSelectedMap()).then(async () => {
        player.x = PLAYER_INITIAL_X;
        player.y = PLAYER_INITIAL_Y;
        await initCollectibleImages(getSelectedMap().collectibleImage);
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
    renderCollectibles(map.tiledExport);
    pickCollectible(map.tiledExport);
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
  window.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.code == 'Digit1') {
    window.removeEventListener('keydown', handleKeyDown);
    Timer.init();
    playBgMusic('dinosaurEra');
    animate(-1);
  } else if (event.code == 'Digit2') {
    window.open('https://github.com/Acousticdesk/looseconds');
  }
}

main();
