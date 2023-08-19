import { Water } from "./assets/water.png";


export class Trap {

    private trapActive:boolean = false;
    private Water:boolean = false;
    private x:number = 0;
    private y:number = 0;

    public init(x:number, y:number){
        this.x = x;
        this.y = y;
    }
    async trigger(){
        
        this.trapActive = true;
    }

    async reset(){
        this.trapActive = false;
        this.Water = true;
    }
}