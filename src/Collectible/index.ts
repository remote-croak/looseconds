import { getContext, getCanvas } from '../Canvas';
import { TILE_HEIGHT, TILE_WIDTH } from '../Map';


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
        x: 0,
        y: 0,
        width: TILE_WIDTH,
        height: TILE_HEIGHT,
        name: "collect1",
        grabbed:false

    }

    export function drawCollectible(){
        
        const ctx = getContext();

        
        
    }
