import { Player } from '../Player/interfaces';
import { player } from '../Player';
import { TiledExport } from '../Tiled';
import { createTrapBoxes } from '../Trap';
import { rectangularCollision } from '../Collision';
import { Timer } from '../Timer';
import { playSFX } from '../Audio';

const traps = {
  // use it to incrementally decrease the timer time each 1 second the user is trapped
  lastTrapped: Date.now(),
};

export function isPlayerCollidingTraps(
  player: Player,
  tiledExport: TiledExport
) {
  const trapBoxes = createTrapBoxes(tiledExport);

  for (let t of trapBoxes) {
    if (rectangularCollision(player, t)) {
      return true;
    }
  }

  return false;
}

export function trapPlayer(tiledExport: TiledExport) {
  if (isPlayerCollidingTraps(player, tiledExport)) {
    if (Date.now() - traps.lastTrapped > 1000) {
      Timer.decreaseTime(10);
      playSFX('trap');
      traps.lastTrapped = Date.now();
    }
  }
}
