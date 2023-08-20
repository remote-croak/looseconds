const FPS_CAP = 60;

export const frameLimiter = {
  then: Date.now(),
  delta: 0,
  interval: 1000 / FPS_CAP,
};
