import { getCanvas, getContext } from '../Canvas';
import { playSFX, stopBGM } from '../Audio';

export function showGameOver(playerWins: boolean): void {
  const canvas = getCanvas();
  const ctx = getContext();
  const img = new Image();

  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
  stopBGM();
  if (playerWins) {
    img.src = './assets/images/gameover_win.png';
    playSFX('gameOverWin');
  } else {
    img.src = './assets/images/gameover_lose.png';
    playSFX('gameOverLost');
    window.addEventListener('keydown', (e) => {
      if(e.code == 'Space') {
        window.location.reload();
      }
    });
  }
}
