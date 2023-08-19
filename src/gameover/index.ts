export class gameOver {
    //displays the gameover screen
    showOverlay(playerWins: boolean): void {
        if(playerWins) {
            console.log("You win!")
        } else {
            console.log("You lose")
        }
    }
}