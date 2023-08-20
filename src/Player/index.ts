import dinaStand from '../../static/assets/images/Dina_stand.png';
import dinaStandReverse from '../../static/assets/images/Dina_stand_reverse.png';
import dinaJump from '../../static/assets/images/Dino_jump.png';
import { playSFX } from '../Audio';
import { getCanvas, getContext } from '../Canvas';
import { keyboard } from '../Keyboard';
import { getSelectedMap, hasNextMap } from '../MapController';
import { isPlayerColliding } from '../PlayerCollisionController';
import { TiledExport } from '../Tiled';
import { Player } from './interfaces';

export const PLAYER_VELOCITY_X_CAP = 5;
export const PLAYER_VELOCITY_Y_CAP = 25;
export const PLAYER_INITIAL_X = 225;
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
  direction: null,
  image: null,
  imageJump: null,
  imageReverse: null,
  currentFrame: 0,
  frameBuffer: 4,
  elapsedFrames: 0,
  moving: false,
  jumps: false,
};

export async function initPlayerImages() {
  const image = new Image();
  const imageJump = new Image();
  const imageReverse = new Image();

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

  await new Promise((resolve, reject) => {
    imageReverse.onload = resolve;
    imageReverse.onerror = reject;
    imageReverse.src = dinaStandReverse;
  });

  player.image = image;
  player.imageJump = imageJump;
  player.imageReverse = imageReverse;
}

export function drawPlayer() {
  const ctx = getContext();

  if (!player.image || !player.imageJump || !player.imageReverse) {
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

  const playerImage =
    player.direction === -1 ? player.imageReverse : player.image;

  ctx.drawImage(
    player.jumps ? player.imageJump : playerImage,
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
  player.direction = -1;
  console.log(keyboard.pressed.KeyA);

  // for some reason player is in the air
  // update the jumps state
  player.jumps = player.velocity.y !== 0;

  if (keyboard.pressed.KeyD) {
    if (
      player.x + player.width < canvas.width &&
      !isPlayerColliding({ ...player, x: player.x + 5 }, tiledExport)
    ) {
      player.moving = true;
      player.direction = 1;
      // player.x += PLAYER_VELOCITY_X_CAP;
    }
  }

  if (keyboard.pressed.KeyA) {
    if (
      player.x > 0 &&
      !isPlayerColliding({ ...player, x: player.x - 5 }, tiledExport)
    ) {
      player.moving = true;
      player.direction = -1;
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

export function playerWins() {
  if (
    getSelectedMap().offset.x >=
    getSelectedMap().image?.width! - getSelectedMap().finishLineOffset
  ) {
    return !hasNextMap();
  }
  return false;
}
