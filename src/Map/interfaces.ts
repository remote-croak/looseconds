import { TiledExport } from '../Tiled';

export interface Map {
  image: HTMLImageElement | null;
  src: string;
  tiledExport: TiledExport;
  offset: {
    x: number;
    y: number;
  };
  finishLineOffset: number;
  collectibleImage: string;
}
