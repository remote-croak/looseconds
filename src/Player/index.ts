import { getContext, getCanvas } from '../Canvas';
import { keyboard } from '../Keyboard';

interface Player {
  x: number
  y: number
  width: number
  height: number
}

const player: Player = {
  x: 0,
  y: 0,
  width: 40,
  height: 60
}

const playerVelocity = 10;

export function drawPlayer() {
  const ctx = getContext()
  
  ctx.fillStyle = '#ff0000'
  ctx.fillRect(player.x, player.y, player.width, player.height)
}

export function movePlayer() {
  const canvas = getCanvas()
  
  if (keyboard.pressed.KeyD) {
    if (player.x + player.width < canvas.width) {
      player.x += playerVelocity
    }
  }

  if (keyboard.pressed.KeyA) {
    if (player.x > 0) {
      player.x -= playerVelocity
    }
  }
}
