import { getContext, getCanvas } from '../Canvas';
import { keyboard } from '../Keyboard';
import { Player } from './interfaces';
import { isPlayerColliding } from '../PlayerCollisionController';
import dinaStand from '../../static/assets/images/Dina_stand.png';
import dinaJump from '../../static/assets/images/Dino_jump.png';
import { playSFX } from '../Audio';
import { TiledExport } from '../Tiled';

export const PLAYER_VELOCITY_X_CAP = 5;
export const PLAYER_VELOCITY_Y_CAP = 25;
export const PLAYER_INITIAL_X = 200;
export const PLAYER_INITIAL_Y = 500;
const JUMP_VELOCITY = 25;
// actually it's the index 0 - 2 meaning there are 3 images
const PLAYER_IMAGE_NUM_FRAMES = 2;

export const player: Player = {
  x: PLAYER_INITIAL_X,
  y: PLAYER_INITIAL_Y,
  width: 64,
  height: 64,
  velocity: {
    x: PLAYER_VELOCITY_X_CAP,
    y: 0,
  },
  image: null,
  imageJump: null,
  currentFrame: 0,
  frameBuffer: 4,
  elapsedFrames: 0,
  moving: false,
  jumps: false,
};

export async function initPlayerImages() {
  const image = new Image();
  const imageJump = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = dinaStand;
  });

  await new Promise((resolve, reject) => {
    imageJump.onload = resolve;
    imageJump.onerror = reject;
    imageJump.src = dinaJump;
  });

  player.image = image;
  player.imageJump = imageJump;
}

export function drawPlayer() {
  const ctx = getContext();

  if (!player.image || !player.imageJump) {
    throw new Error(
      'Oops, you forgot to initialize your player image before drawing the player'
    );
  }

  if (!player.moving || player.jumps) {
    player.currentFrame = 0;
  }

  const cropBox = {
    position: {
      x: player.currentFrame * player.width,
      y: 0,
    },
    width: player.width,
    height: player.height,
  };

  ctx.drawImage(
    player.jumps ? player.imageJump : player.image,
    cropBox.position.x,
    cropBox.position.y,
    cropBox.width,
    cropBox.height,
    player.x,
    player.y,
    player.width,
    player.height
  );

  player.elapsedFrames += 1;

  if (player.elapsedFrames % player.frameBuffer === 0) {
    player.currentFrame += 1;
  }
  if (player.currentFrame > PLAYER_IMAGE_NUM_FRAMES) {
    player.currentFrame = 0;
  }
}

export function movePlayer(tiledExport: TiledExport) {
  const canvas = getCanvas();

  player.y += player.velocity.y;
  player.moving = false;

  // for some reason player is in the air
  // update the jumps state
  player.jumps = player.velocity.y !== 0;

  if (keyboard.pressed.KeyD) {
    if (
      player.x + player.width < canvas.width &&
      !isPlayerColliding({ ...player, x: player.x + 1 }, tiledExport)
    ) {
      player.moving = true;
      // player.x += PLAYER_VELOCITY_X_CAP;
    }
  }

  if (keyboard.pressed.KeyA) {
    if (
      player.x > 0 &&
      !isPlayerColliding({ ...player, x: player.x - 1 }, tiledExport)
    ) {
      player.moving = true;
      // player.x -= PLAYER_VELOCITY_X_CAP;
    }
  }

  if (keyboard.pressed.KeyW) {
    if (
      player.velocity.y === 0 &&
      Date.now() - keyboard.lastPressed.KeyW > 100 // 200 ms
    ) {
      playSFX('jump');
      player.velocity.y = -JUMP_VELOCITY;
      // it's a hack
      // we need to update it again here to make if (isPlayerColliding(player)) work properly
      // in the updatePlayerGravityForce function

      if (
        !isPlayerColliding(
          { ...player, y: player.y + player.velocity.y },
          tiledExport
        )
      ) {
        player.y += player.velocity.y;
      } else {
        // find the closest spot, the player can reach
        let nextY = player.y + player.velocity.y;

        while (isPlayerColliding({ ...player, y: nextY }, tiledExport)) {
          nextY += 1;
        }

        player.y = nextY;
      }
    }
    keyboard.lastPressed.KeyW = Date.now();
  }
}

export function updatePlayerGravityForce(tiledExport: TiledExport) {
  const canvas = getCanvas();
  // increase y velocity by one with EACH rendered frame
  player.velocity.y += 1;

  if (player.velocity.y >= PLAYER_VELOCITY_Y_CAP) {
    player.velocity.y = PLAYER_VELOCITY_Y_CAP;
  }

  // predict the next position of the player to land on a non-collision position
  if (
    isPlayerColliding(
      { ...player, y: player.y + player.velocity.y },
      tiledExport
    )
  ) {
    player.velocity.y = 0;
  }
}
