import { player, PLAYER_VELOCITY_X_CAP } from '../Player';
import { keyboard } from '../Keyboard';
import { getSelectedMap } from '../MapController';

export function moveMap() {
  if (keyboard.pressed.KeyD && player.moving) {
    getSelectedMap().offset.x += PLAYER_VELOCITY_X_CAP;
  }

  if (keyboard.pressed.KeyA && player.moving) {
    getSelectedMap().offset.x -= PLAYER_VELOCITY_X_CAP;
  }
}
