export const keyboard = {
  pressed: {
    KeyW: false,
    KeyD: false,
    KeyS: false,
    KeyA: false,
  },
  // use it to prevent double jump when pressing on W without releasing it
  lastPressed: {
    KeyW: Date.now(),
  },
};

export function detectKeyboardActions() {
  window.addEventListener('keydown', (e) => {
    if (!(e.code in keyboard.pressed)) return;
    keyboard.pressed[e.code as keyof typeof keyboard.pressed] = true;
  });
  window.addEventListener('keyup', (e) => {
    if (!(e.code in keyboard.pressed)) return;
    keyboard.pressed[e.code as keyof typeof keyboard.pressed] = false;
  });
}
