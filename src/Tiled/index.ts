import tiledExampleExport from '../../static/assets/tiled/level-1-section-1.json';

export type TiledExport = typeof tiledExampleExport 

export function findLayer(layerName: string, levelData: TiledExport) {
  return levelData.layers.find(({ name }) => name === layerName)?.data
}
