import { player, PLAYER_VELOCITY_X_CAP } from '../Player';
import { map } from '../Map';
import { keyboard } from '../Keyboard';

export function moveMap() {
  if (keyboard.pressed.KeyD && player.moving) {
    map.offset.x += PLAYER_VELOCITY_X_CAP;
  }

  if (keyboard.pressed.KeyA && player.moving) {
    map.offset.x -= PLAYER_VELOCITY_X_CAP;
  }
}
