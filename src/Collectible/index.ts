import { getContext, getCanvas } from '../Canvas';
import { Player } from '../Player/interfaces';
import {TILE_WIDTH, TILE_HEIGHT, MAP_SIZE_IN_TILES_X, MAP_SIZE_IN_TILES_Y} from '../Map';
import level from '../../static/assets/tiled/level-1-section-1.json'

import { rectangularCollision, createCollisionBoxes } from '../Collision';

export class Collectible{

    private collected:number = 0;


    public getNumCollected(): number{
        return this.collected;
    }

    public addCollectible(){
        this.collected++;
    }
}



// interface Collectible{


//     x:number;
//     y:number;

//     width:number;
//     height:number;

//     name:string;
//     grabbed:boolean;
// }

// const collect: Collectible = {
//     x: randomLocation("x") ,
//     y: randomLocation("y") ,
//     width: TILE_WIDTH,
//     height: TILE_HEIGHT,
//     name: "collect1",
//     grabbed:false

// }

// function randomLocation(vector:string): number{
    
//     let maxY:number = TILE_HEIGHT * MAP_SIZE_IN_TILES_Y;
//     let maxX:number = TILE_WIDTH * MAP_SIZE_IN_TILES_X;
//     let loc:number = 0;
    
//     if(vector == "x"){
        
//         loc = Math.random() * (maxX - 0) + 0;
//     }
//     else if(vector == "y"){
//         loc = Math.random() * (maxY - 0) + 0;

//     }

//     return loc;
// }

// export function drawCollectible(){
    
//     const ctx = getContext();

//     ctx.fillStyle = '#ffff00';
//     ctx.fillRect(collect.x, collect.y, collect.width, collect.height);
    
// }

// function validPlace(collect: Collectible){
//     const collideBox = createCollisionBoxes(level);

//     for (let c of collideBox) {
//         if(rectangularCollision(collect,c)){
//             return true;
//         }
//     }
// }

// export function pickUP(player: Player){
//     return

// }
