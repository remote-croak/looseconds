export class Timer {
    private static timeRem: number;

    static async init(){
        Timer.timeRem = 100;
    }

    static setTimer(t:number){
        Timer.timeRem = t;
    }

    static getTimer(){
        return Timer.timeRem;
    }

    static decreaseTime(){
        Timer.timeRem--;
    }

    static increaseTime(){
        Timer.timeRem++;

    }
}