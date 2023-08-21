import { getCanvas, getContext } from '../Canvas';

export function drawTitle(){
    const ctx = getContext();
    const img = new Image();

    img.onload = () => {
        ctx.drawImage(img, 0 , 0)
    }

    img.src = './assets/images/title_screen.png';
}