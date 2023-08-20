export class Timer {
  private static timeRem: number;

  static async init() {
    Timer.timeRem = 135;

    let timer = setInterval(function () {
      Timer.decreaseTime(1);
      if (Timer.timeRem < 1) {
        clearInterval(timer);
      }
    }, 1000);
  }

  static setTimer(t: number) {
    Timer.timeRem = t;
  }

  static getTimer() {
    return Timer.timeRem;
  }

  static decreaseTime(decrease: number) {
    Timer.timeRem -= decrease;
  }

  static increaseTime(increase: number) {
    Timer.timeRem += increase;
  }
}
