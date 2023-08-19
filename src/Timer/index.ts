export class Timer {
    private static timeRem: number;

    static async init(){
        Timer.timeRem = 100;

        setInterval( function() { 
            Timer.decreaseTime(1)
            console.log(Timer.getTimer)
            if(Timer.timeRem < 1) {
                clearInterval(this)
                console.log("Time is up")
            }
        }, 1000)
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