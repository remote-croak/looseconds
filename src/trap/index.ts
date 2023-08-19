// import { Water } from "./assets/water.png";
import { Timer } from "../Timer";

export class Trap {

    private trapActive:boolean = false;
    private Water:boolean = false;
    private x:number = 0;
    private y:number = 0;

    private wait:number = 5;

    public init(x:number, y:number){
        this.x = x;
        this.y = y;
    }
    async trigger(){
        this.trapActive = true;
        Timer.setTimer(Timer.getTimer() - this.wait);
    }

    async reset(){
        this.trapActive = false;
    }

    public checkCollision(){
        
        //if collision true then 
        }
        

    }
