import { TILE_HEIGHT, TILE_WIDTH } from '../Map';
import { findLayer, TiledExport } from '../Tiled';
import { getContext } from '../Canvas';
import { getSelectedMap } from '../MapController';
import { parseTiledBoxFile } from '../Box';

const COLLECTIBLE_TILE_ID = 1;

interface Collectible {
  image: HTMLImageElement | null;
  collected: Record<string, boolean>;
  collectedAmount: number;
}

export const collectible: Collectible = {
  image: null,
  collected: {},
  collectedAmount: 0,
};

export function resetCollectibles() {
  collectible.collected = {};
}

export async function initCollectibleImages(src: string) {
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

  collectible.image = image;
}

// the positions of the boxes should be updated based on the current map offset
export function createCollectibleBoxes(tiledExport: TiledExport) {
  const result = [];
  const collectible = parseTiledBoxFile(findLayer('Collectible', tiledExport)!);

  for (let i = 0; i < collectible.length; i += 1) {
    for (let j = 0; j < collectible[i].length; j += 1) {
      if (collectible[i][j] === COLLECTIBLE_TILE_ID) {
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

export function renderCollectibles(tiledExport: TiledExport) {
  const ctx = getContext();

  const collectibleBoxes = createCollectibleBoxes(tiledExport);

  if (!collectible.image) {
    throw new Error(
      'Oops, it seems like you forgot to initialize the collectible image before rendering the list of collectible'
    );
  }

  for (let i = 0; i < collectibleBoxes.length; i += 1) {
    const c = collectibleBoxes[i];
    if (!(String(i) in collectible.collected)) {
      ctx.drawImage(collectible.image, c.x, c.y, c.width, c.height);
    }
  }
}
