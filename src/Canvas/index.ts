export function drawRect(x: number, y: number, color: string) {
  const ctx = getContext()

  ctx.fillStyle = color
  ctx.fillRect(x, y, 50, 50)
}

export function resetCanvas() {
  const canvas = getCanvas()
  const ctx = getContext()
  const w = canvas.width
  const h = canvas.height
  
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, h)
}

export function getCanvas() {
  return document.querySelector('canvas')!
}

export function getContext() {
  return getCanvas()?.getContext('2d')!
}
