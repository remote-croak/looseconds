import { Box } from '../Box';
import { TILE_HEIGHT, TILE_WIDTH } from '../Map';
import { findLayer, TiledExport } from '../Tiled';
import { getContext } from '../Canvas';
import { getSelectedMap } from '../MapController';
import { parseTiledBoxFile } from '../Box';

const COLLISION_TILE_ID = 1;

export function rectangularCollision(box1: Box, box2: Box) {
  return (
    box1.x + box1.width >= box2.x &&
    box1.x <= box2.x + box2.width &&
    box1.y <= box2.y + box2.height &&
    box1.y + box1.height >= box2.y
  );
}

// the positions of the boxes should be updated based on the current map offset
export function createCollisionBoxes(tiledExport: TiledExport) {
  const result = [];
  const collisions = parseTiledBoxFile(findLayer('Collision', tiledExport)!);

  for (let i = 0; i < collisions.length; i += 1) {
    for (let j = 0; j < collisions[i].length; j += 1) {
      if (collisions[i][j] === COLLISION_TILE_ID) {
        result.push({
          x: j * TILE_WIDTH - getSelectedMap().offset.x,
          y: i * TILE_HEIGHT,
          width: TILE_WIDTH,
          height: TILE_HEIGHT,
        });
      }
    }
  }
  return result;
}

export function renderCollisions(
  shouldDraw: boolean,
  tiledExport: TiledExport
) {
  const ctx = getContext();

  if (!shouldDraw) {
    return;
  }

  const collisionBoxes = createCollisionBoxes(tiledExport);

  for (let c of collisionBoxes) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(c.x, c.y, c.width, c.height);
  }
}
