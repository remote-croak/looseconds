import { resetCanvas } from './Canvas';
import { drawMap, initMap, map } from './Map';

function animate() {
  resetCanvas()
  drawMap(map)
  window.requestAnimationFrame(animate)
}

async function main() {
  try {
    await initMap()
  } catch (e) {
    console.error(e)
  }
  animate()
}

main()
