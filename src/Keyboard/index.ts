export const keyboard = {
  pressed: {
    KeyW: false,
    KeyD: false,
    KeyS: false,
    KeyA: false
  }
}

export function detectKeyboardActions() {
  window.addEventListener('keydown', (e) => {
    if (!(e.code in keyboard.pressed)) return
    keyboard.pressed[e.code as keyof typeof keyboard.pressed] = true
  })
  window.addEventListener('keyup', (e) => {
    if (!(e.code in keyboard.pressed)) return
    keyboard.pressed[e.code as keyof typeof keyboard.pressed] = false
  })
}
