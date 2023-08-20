import { getCanvas, getContext } from '../Canvas';
import { Timer } from '../Timer';

export function drawUI() {
  const canvas = getCanvas();
  const ctx = getContext();
  const w = canvas.width;
  const h = canvas.height;

  ctx.font = '32px WendyOne';
  ctx.fillStyle = 'white';

  let timerValue = Timer.getTimer();
  let timerText = 'Time: ' + timerValue;
  ctx.fillText(timerText, w * 0.05, h * 0.15);

  let collectibleText = 'Items: 1';
  ctx.fillText(collectibleText, w * 0.05, h * 0.2);
}

export function changeLevelSectionAnimation() {
  document.querySelector('#flash')!.classList.add('flash');
}
