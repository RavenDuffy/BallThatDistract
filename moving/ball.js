class Ball {
  constructor(radius, x, y, dx, dy, colour) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.colour = colour;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}
