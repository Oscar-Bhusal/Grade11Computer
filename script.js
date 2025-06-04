class Dot {
  constructor(x, y) {
    this.originalX = x
    this.originalY = y
    this.x = x
    this.y = y
  }

  update(mouseX, mouseY, effectRadius) {
    // Repulsion effect
    if (mouseX !== undefined && mouseY !== undefined) {
      const dx = this.x - mouseX
      const dy = this.y - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < effectRadius) {
        const angle = Math.atan2(dy, dx)
        this.x = this.originalX + Math.cos(angle) * effectRadius
        this.y = this.originalY + Math.sin(angle) * effectRadius
      } else {
        this.x += (this.originalX - this.x) * 0.05
        this.y += (this.originalY - this.y) * 0.05
      }
    } else {
      this.x += (this.originalX - this.x) * 0.05
      this.y += (this.originalY - this.y) * 0.05
    }

    // Wrap around edges
    if (this.x > window.innerWidth) this.x = 0
    if (this.y > window.innerHeight) this.y = 0
  }

  draw(ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2)
    ctx.fill()
  }
}

class DotEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d")
    this.gridSize = 30
    this.effectRadius = 20
    this.dots = []
    this.mouseX = undefined
    this.mouseY = undefined

    this.resizeCanvas()
    window.addEventListener("resize", () => this.resizeCanvas())
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e))
    this.canvas.addEventListener("mouseleave", () => this.handleMouseLeave())

    this.initDots()
    this.animate()
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  initDots() {
    for (let x = 0; x < this.canvas.width; x += this.gridSize) {
      for (let y = 0; y < this.canvas.height; y += this.gridSize) {
        this.dots.push(new Dot(x, y))
      }
    }
  }

  handleMouseMove(event) {
    this.mouseX = event.clientX
    this.mouseY = event.clientY
  }

  handleMouseLeave() {
    this.mouseX = undefined
    this.mouseY = undefined
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawDots() {
    for (const dot of this.dots) {
      dot.update(this.mouseX, this.mouseY, this.effectRadius)
      dot.draw(this.ctx)
    }
  }

  animate() {
    this.drawBackground()
    this.drawDots()
    requestAnimationFrame(() => this.animate())
  }
}

// 🚀 Start the dot effect
new DotEffect("background")

const coords = { x: 0, y: 0 }
const circles = document.querySelectorAll(".circle")

const colors = [
  "#1b0533",
  "#1a0637",
  "#19063b",
  "#170740",
  "#150844",
  "#140948",
  "#13094c",
  "#120a50",
  "#110a54",
  "#100a58",
  "#0f0a5c",
  "#0e0a60",
  "#0d0b64",
  "#0c0b68",
  "#0b0b6c",
  "#0a0c70",
  "#090c74",
  "#080c78",
  "#070c7c",
  "#060c80",
]

circles.forEach(function (circle, index) {
  circle.x = 0
  circle.y = 0
  circle.style.backgroundColor = colors[index % colors.length]
})

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX
  coords.y = e.clientY
})

function animateCircles() {
  let x = coords.x
  let y = coords.y

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px"
    circle.style.top = y - 12 + "px"

    circle.style.scale = (circles.length - index) / circles.length

    circle.x = x
    circle.y = y

    const nextCircle = circles[index + 1] || circles[0]
    x += (nextCircle.x - x) * 0.3
    y += (nextCircle.y - y) * 0.3
  })

  requestAnimationFrame(animateCircles)
}

animateCircles()
