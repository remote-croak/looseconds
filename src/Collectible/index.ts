import { getContext, getCanvas } from '../Canvas';
import {TILE_WIDTH, TILE_HEIGHT, MAP_SIZE_IN_TILES_X, MAP_SIZE_IN_TILES_Y} from '../Map';
import { Box } from '../Box';


interface Collectible{
    x:number;
    y:number;

    width:number;
    height:number;

    name:string;
    grabbed:boolean ;
}

    const collect: Collectible = {
        x: randomLocation("x") ,
        y: randomLocation("y") ,
        width: TILE_WIDTH,
        height: TILE_HEIGHT,
        name: "collect1",
        grabbed:false

    }

    function randomLocation(vector:string): number{
        let maxY:number = TILE_HEIGHT * MAP_SIZE_IN_TILES_Y;
        let maxX:number = TILE_WIDTH * MAP_SIZE_IN_TILES_X;
        let loc:number = 0;
        if(vector == "x"){
            
            loc = Math.random() * (maxX - 0) + 0;
        }
        else if(vector == "y"){
            loc = Math.random() * (maxY - 0) + 0;

        }

        return loc;
    }

    export function drawCollectible(){
        
        const ctx = getContext();

        ctx.fillStyle = '#ffff00';
        ctx.fillRect(collect.x, collect.y, collect.width, collect.height);
        
    }
