import { getCanvas, getContext } from '../Canvas';

export function showGameOver(playerWins: boolean): void {
    const canvas = getCanvas()
    const ctx = getContext()
    const img = new Image()

    img.onload = () => {
        ctx.drawImage(img, 0, 0)
    }
    if(playerWins) {
        img.src = './assets/images/gameover_win.png'
        console.log('You win')
    } else {
        img.src = './assets/images/gameover_lose.png'
        console.log('You lose')
    }
}