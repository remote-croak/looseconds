import { getCanvas, getContext } from '../Canvas';
import { Timer } from '../Timer';
import { collectible } from '../Collectible';

let uiFont = '42px WendyOne';
let uiFill = 'white';

export function drawUI() {
  const canvas = getCanvas();
  const ctx = getContext();
  const w = canvas.width;
  const h = canvas.height;

  ctx.font = uiFont;
  ctx.fillStyle = uiFill;

  let timerValue = Timer.getTimer();
  if(timerValue < 1) timerValue = 0;
  let timerText = '⏱️: ' + timerValue;
  ctx.fillText(timerText, w * 0.05, h * 0.1);
}

export function changeLevelSectionAnimation() {
  document.querySelector('#flash')!.classList.add('flash');
}

export function loseTimeAnimation() {
  uiFont = '42px WendyOne';
  uiFill = 'red';
  setTimeout(resetTextStyle, 500);
}

export function gainTimeAnimation() {
  uiFont = '42px WendyOne';
  uiFill = 'green';
  setTimeout(resetTextStyle, 500);
}

function resetTextStyle() {
  uiFont = '42px WendyOne';
  uiFill = 'white';
}