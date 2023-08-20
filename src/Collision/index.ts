import { Box } from '../Box';
import {
  map,
  MAP_SIZE_IN_TILES_X,
  MAP_SIZE_IN_TILES_Y,
  TILE_HEIGHT,
  TILE_WIDTH,
} from '../Map';
import tiledExportLevel1 from '../../static/assets/tiled/level-1-section-1.json';
import { findLayer, TiledExport } from '../Tiled';
import { getContext } from '../Canvas';

const COLLISION_TILE_ID = 1009;

export function rectangularCollision(box1: Box, box2: Box) {
  return (
    box1.x + box1.width >= box2.x &&
    box1.x <= box2.x + box2.width &&
    box1.y <= box2.y + box2.height &&
    box1.y + box1.height >= box2.y
  );
}

export function parseTiledCollisionFile(tiledCollisionData: number[]) {
  const result = [];
  for (let i = 0; i < tiledCollisionData.length; i += MAP_SIZE_IN_TILES_X) {
    result.push(tiledCollisionData.slice(i, i + MAP_SIZE_IN_TILES_X));
  }
  if (result.length !== MAP_SIZE_IN_TILES_Y) {
    throw new Error(
      'Oops, your collision data does not fit the size map. Please review the Tiled export.'
    );
  }
  return result;
}

// the positions of the boxes should be updated based on the current map offset
export function createCollisionBoxes(tiledExport: TiledExport) {
  const result = [];
  const collisions = parseTiledCollisionFile(
    findLayer('Collision', tiledExport)!
  );

  for (let i = 0; i < collisions.length; i += 1) {
    for (let j = 0; j < collisions[i].length; j += 1) {
      if (collisions[i][j] === COLLISION_TILE_ID) {
        result.push({
          x: j * TILE_WIDTH - map.offset.x,
          y: i * TILE_HEIGHT,
          width: TILE_WIDTH,
          height: TILE_HEIGHT,
        });
      }
    }
  }
  return result;
}

export function renderCollisions(shouldDraw: boolean) {
  const ctx = getContext();

  if (!shouldDraw) {
    return;
  }

  const collisionBoxes = createCollisionBoxes(tiledExportLevel1);

  for (let c of collisionBoxes) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(c.x, c.y, c.width, c.height);
  }
}
