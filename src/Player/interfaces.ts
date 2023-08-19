export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: {
    x: number;
    y: number;
  };
  image: HTMLImageElement | null;
  imageJump: HTMLImageElement | null;
  currentFrame: number;
  frameBuffer: number;
  elapsedFrames: number;
  moving: boolean;
  jumps: boolean;
}
