import { getContext, getCanvas } from '../Canvas';
import { keyboard } from '../Keyboard';
import { TILE_HEIGHT, TILE_WIDTH } from '../Map';

interface Player {
  x: number
  y: number
  width: number
  height: number
  velocity: {
    x: number
    y: number
  }
}

const PLAYER_VELOCITY_X_CAP = 10;
const PLAYER_VELOCITY_Y_CAP = 10;

const player: Player = {
  x: 0,
  y: 0,
  width: TILE_WIDTH,
  height: TILE_HEIGHT,
  velocity: {
    x: PLAYER_VELOCITY_X_CAP,
    y: 0
  }
}

export function drawPlayer() {
  const ctx = getContext()
  
  ctx.fillStyle = '#ff0000'
  ctx.fillRect(player.x, player.y, player.width, player.height)
}

export function movePlayer() {
  const canvas = getCanvas()
  
  player.y += player.velocity.y
  
  if (keyboard.pressed.KeyD) {
    if (player.x + player.width < canvas.width) {
      player.x += player.velocity.x
    }
  }

  if (keyboard.pressed.KeyA) {
    if (player.x > 0) {
      player.x -= player.velocity.x
    }
  }
}

export function updatePlayerGravityForce() {
  const canvas = getCanvas()
  // increase y velocity by one with EACH rendered frame
  player.velocity.y += 1
  
  if (
    player.y + player.height >= canvas.height - TILE_HEIGHT ||
    player.velocity.y >= PLAYER_VELOCITY_Y_CAP
  ) {
    player.velocity.y = 0
  }
}
