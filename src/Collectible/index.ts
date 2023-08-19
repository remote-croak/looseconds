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
