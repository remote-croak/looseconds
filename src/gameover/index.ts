export function showGameOver(playerWins: boolean): void {
    const canvas = document.querySelector('canvas')!
    const ctx = canvas?.getContext('2d')!
    const img = new Image()

    img.onload = () => {
        ctx.drawImage(img, 0, 0);
    }
    if(playerWins) {
        img.src = './assets/images/gameover_win.png'
        console.log('You win')
    } else {
        img.src = './assets/images/gameover_lose.png'
        console.log('You lose')
    }
}