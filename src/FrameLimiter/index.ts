const FPS_CAP = 100;

export const frameLimiter = {
  then: Date.now(),
  delta: 0,
  interval: 1000 / FPS_CAP,
};
