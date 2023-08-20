import { rectangularCollision } from '../Collision';
import { Player } from '../Player/interfaces';
import { createCollisionBoxes } from '../Collision';
import { TiledExport } from '../Tiled';
import { createTrapBoxes } from '../Trap';

export function isPlayerColliding(player: Player, tiledExport: TiledExport) {
  const collisionBoxes = createCollisionBoxes(tiledExport);

  for (let c of collisionBoxes) {
    if (rectangularCollision(player, c)) {
      return true;
    }
  }

  return false;
}
