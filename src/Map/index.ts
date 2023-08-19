import { getCanvas, getContext } from '../Canvas';
import mapImage from '../../static/assets/tiled/level-1-section-1.png';

export const TILE_WIDTH = 40;
export const TILE_HEIGHT = 40;
export const MAP_SIZE_IN_TILES_X = 56;
export const MAP_SIZE_IN_TILES_Y = 18;

// Canvas size:
// width = 40 * 32 = 1280
// height = 60 * 12 = 720

interface Map {
  image: HTMLImageElement | null;
}

export const map: Map = {
  image: null,
};

export async function initMap() {
  const image = new Image();

  image.src = mapImage;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  map.image = image;
}

export function drawMap(map: Map) {
  const ctx = getContext();

  if (!map.image) {
    throw new Error(
      'Woops, you forgot to initialize your map image before drawing it!'
    );
  }

  const cropBox = {
    position: {
      x: 0,
      y: 0,
    },
    width: 1280,
    height: 720,
  };

  ctx.drawImage(
    map.image,
    cropBox.position.x,
    cropBox.position.y,
    cropBox.width,
    cropBox.height,
    0,
    0,
    cropBox.width,
    cropBox.height
  );
}
