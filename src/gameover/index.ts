import { getCanvas, getContext } from '../Canvas';
import { playSFX } from '../Audio';

export function showGameOver(playerWins: boolean): void {
  const canvas = getCanvas();
  const ctx = getContext();
  const img = new Image();

  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
  if (playerWins) {
    img.src = './assets/images/gameover_win.png';
    playSFX('win')
  } else {
    img.src = './assets/images/gameover_lose.png';
    playSFX('lose')
    window.addEventListener('keydown', (e) => {
      window.location.reload();
    });
  }
}
