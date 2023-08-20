import { TILE_HEIGHT, TILE_WIDTH } from '../Map';
import { findLayer, TiledExport } from '../Tiled';
import { getContext } from '../Canvas';
import { getSelectedMap } from '../MapController';
import { parseTiledBoxFile } from '../Box';

const TRAP_TILE_ID = 1;

// the positions of the boxes should be updated based on the current map offset
export function createTrapBoxes(tiledExport: TiledExport) {
  const result = [];
  const traps = parseTiledBoxFile(findLayer('Traps', tiledExport)!);

  for (let i = 0; i < traps.length; i += 1) {
    for (let j = 0; j < traps[i].length; j += 1) {
      if (traps[i][j] === TRAP_TILE_ID) {
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

export function renderTraps(shouldDraw: boolean, tiledExport: TiledExport) {
  const ctx = getContext();

  if (!shouldDraw) {
    return;
  }

  const collisionBoxes = createTrapBoxes(tiledExport);

  for (let c of collisionBoxes) {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(c.x, c.y, c.width, c.height);
  }
}
