export class Collectible{
    private x:number = 0;
    private y:number = 0;
    private name:string = "";
    private grabbed:boolean = false;

    public async init(x:number, y:number, name:string){
        this.x = x;
        this.y = y;
        this.name = name;

    }
}