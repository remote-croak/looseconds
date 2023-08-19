import { getCanvas, getContext } from '../Canvas';
import mapImage from "../../static/assets/tiled/level-1-section-1.png";

export const TILE_WIDTH = 40
export const TILE_HEIGHT = 60
export const MAP_SIZE_IN_TILES_X = 32
export const MAP_SIZE_IN_TILES_Y = 12

// Canvas size:
// width = 40 * 32 = 1280
// height = 60 * 12 = 720

interface Map {
  image: HTMLImageElement | null
}

export const map: Map = {
  image: null
}

export async function initMap() {
  const image = new Image()

  image.src = mapImage
  
  await new Promise((resolve, reject) => {
    image.onload = resolve
    image.onerror = reject
  })
  
  map.image = image;
}

export function drawMap(map: Map) {
  const ctx = getContext()
  
  if (!map.image) {
    throw new Error('Woops, you forgot to initialize your map image before drawing it!')
  }

  ctx.drawImage(map.image, 0, 0)
}
