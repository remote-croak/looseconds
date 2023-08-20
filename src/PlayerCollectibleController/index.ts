import { rectangularCollision } from '../Collision';
import { Player } from '../Player/interfaces';
import { collectible, createCollectibleBoxes } from '../Collectible';
import { TiledExport } from '../Tiled';
import { player } from '../Player';
import { Timer } from '../Timer';

export function isPlayerCollidingCollectible(
  player: Player,
  tiledExport: TiledExport
) {
  const collectibleBoxes = createCollectibleBoxes(tiledExport);

  for (let i = 0; i < collectibleBoxes.length; i += 1) {
    const c = collectibleBoxes[i];
    if (
      rectangularCollision(player, c) &&
      !(String(i) in collectible.collected)
    ) {
      return [true, i];
    }
  }

  return [false, -1];
}

export function pickCollectible(tiledExport: TiledExport) {
  const [isColliding, index] = isPlayerCollidingCollectible(
    player,
    tiledExport
  );

  if (isColliding) {
    collectible.collected[String(index)] = true;
    collectible.collectedAmount += 1;
    Timer.increaseTime(3);
  }
}
