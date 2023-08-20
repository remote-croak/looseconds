import { getContext } from '../Canvas';
import { Map } from './interfaces';
import mapImage from '../../static/assets/tiled/level-1-section-1.png';
import mapImageSection2 from '../../static/assets/tiled/level-1-section-2.png';
import mapTiledExport from '../../static/assets/tiled/level-1-section-1.json';
import mapSection2TiledExport from '../../static/assets/tiled/level-1-section-2.json';

export const TILE_WIDTH = 40;
export const TILE_HEIGHT = 40;
export const MAP_SIZE_IN_TILES_X = 56;
export const MAP_SIZE_IN_TILES_Y = 18;

// Canvas size:
// width = 40 * 56 = 2240
// height = 40 * 18 = 720

export const map: Map = {
  image: null,
  src: mapImage,
  tiledExport: mapTiledExport,
  offset: {
    x: 0,
    y: 0,
  },
};

export const mapSection2: Map = {
  image: null,
  src: mapImageSection2,
  tiledExport: mapSection2TiledExport,
  offset: {
    x: 0,
    y: 0,
  },
};

export async function initMap(map: Map) {
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = map.src;
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
      x: map.offset.x,
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
