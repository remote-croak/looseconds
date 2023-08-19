import { getContext, getCanvas } from '../Canvas';
import { TILE_HEIGHT, TILE_WIDTH } from '../Map';


import { Box } from '../Box';


interface Collectible{
    x:number;
    y:number;

    width: TILE_WIDTH;
    height: TILE_HEIGHT;

    name:string;
    grabbed:boolean ;
}

    const collect: Collectible = {
        
    }

    export function drawCollectible(){
        
        const ctx = getContext();
    }

    export function pickUp(){
        

    }
