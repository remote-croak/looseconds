import { resetCanvas } from './Canvas';
import { drawMap, initMap, map } from './Map';
import { detectKeyboardActions } from './Keyboard';
import { drawPlayer, movePlayer, updatePlayerGravityForce } from './Player';

function animate() {
  resetCanvas()
  drawMap(map)
  updatePlayerGravityForce()
  movePlayer()
  drawPlayer()
  window.requestAnimationFrame(animate)
}

async function main() {
  detectKeyboardActions()
  try {
    await initMap()
  } catch (e) {
    console.error(e)
  }
  animate()
}

main()
