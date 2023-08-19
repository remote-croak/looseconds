// import { Water } from "./assets/water.png";
import { Timer } from "../Timer";
import { rectangularCollision } from "../Collision";

export class Trap {

    private trapActive:boolean = false;

    private wait:number = 5;

    public trigger(){
        this.trapActive = true;
        Timer.setTimer(Timer.getTimer() - this.wait);
    }

    public reset(){
        this.trapActive = false;
    }
}
