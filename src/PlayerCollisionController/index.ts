import { rectangularCollision } from '../Collision';
import { Player } from '../Player/interfaces';
import tiledExportLevel1 from '../../static/assets/tiled/level-1-section-1.json';
import { createCollisionBoxes } from '../Collision';

export function isPlayerColliding(player: Player,) {
  const collisionBoxes = createCollisionBoxes(tiledExportLevel1)
  
  for (let c of collisionBoxes) {
    if (rectangularCollision(player, c)) {
      return true
    }
  }
  
  return false
}
