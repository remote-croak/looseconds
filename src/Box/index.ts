import { MAP_SIZE_IN_TILES_X, MAP_SIZE_IN_TILES_Y } from '../Map';

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function parseTiledBoxFile(tiledBoxData: number[]) {
  const result = [];
  for (let i = 0; i < tiledBoxData.length; i += MAP_SIZE_IN_TILES_X) {
    result.push(tiledBoxData.slice(i, i + MAP_SIZE_IN_TILES_X));
  }
  if (result.length !== MAP_SIZE_IN_TILES_Y) {
    throw new Error(
      'Oops, your collision data does not fit the size map. Please review the Tiled export.'
    );
  }
  return result;
}
