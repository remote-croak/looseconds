export class Collectible {
    private static collected: number;

    static async init() {
        Collectible.collected = 0;
    }

    static getNumCollected(): number{
        return Collectible.collected;
    }

    static addCollectible(){
        Collectible.collected++;
    }
}
