export class Timer {
    private static timeRem: number;

    static async init(){
        Timer.timeRem = 100;
        while (Timer.timeRem > -1){
            Timer.decreaseTime(1);
            console.log(Timer.timeRem);
        } 
    }

    static setTimer(t:number){
        Timer.timeRem = t;
    }

    static getTimer(){
        return Timer.timeRem;
    }

    static decreaseTime(decrease:number){
        Timer.timeRem -= decrease;
    }

    static increaseTime(increase:number){
        Timer.timeRem += increase;

    }
}