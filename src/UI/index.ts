import { getCanvas, getContext } from '../Canvas';
import { Timer } from '../Timer';
import { collectible } from '../Collectible';

export function drawUI() {
  const canvas = getCanvas();
  const ctx = getContext();
  const w = canvas.width;
  const h = canvas.height;

  ctx.font = '32px WendyOne';
  ctx.fillStyle = 'white';

  let timerValue = Timer.getTimer();
  let timerText = '⏱️: ' + timerValue;
  ctx.fillText(timerText, w * 0.05, h * 0.1);

  let collectibleText = '💰: ' + collectible.collectedAmount;
  ctx.fillText(collectibleText, w * 0.05, h * 0.15);
}

export function changeLevelSectionAnimation() {
  document.querySelector('#flash')!.classList.add('flash');
}
