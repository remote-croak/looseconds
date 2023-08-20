import { getCanvas, getContext } from '../Canvas';
import { Timer } from '../Timer';
import { collectible } from '../Collectible';

export function drawUI() {
  const canvas = getCanvas();
  const ctx = getContext();
  const w = canvas.width;
  const h = canvas.height;

  ctx.font = '42px WendyOne';
  ctx.fillStyle = 'white';

  let timerValue = Timer.getTimer();
  if(timerValue < 1) timerValue = 0;
  let timerText = '⏱️: ' + timerValue;
  ctx.fillText(timerText, w * 0.05, h * 0.1);
}

export function changeLevelSectionAnimation() {
  document.querySelector('#flash')!.classList.add('flash');
}
