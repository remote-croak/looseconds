import { drawRect, resetCanvas } from './Canvas';

let blue = 0
let color = `rgb(0, 0, ${blue})`

function animate() {
  resetCanvas()
  if (blue >= 255) {
    blue = 0
  }
  blue += 10
  color = `rgb(0, 0, ${blue})`
  drawRect(20, 20, color)
  window.requestAnimationFrame(animate)
}

animate()
