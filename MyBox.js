class MyBox
{
  constructor(x, y, h, dx, dy, fillColor)
  {
    this.x = x;
    this.y = -y;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.fillColor = fillColor;
  }
  display()
  {
    // Top Square
    push();
    rotateX(HALF_PI);
    rect(this.x, this.y, this.dx, this.dy);
    fill(this.fillColor);
    pop();
    
    // Bottom square
    push();
    rotateX(HALF_PI);
    translate(0, 0, -this.h);
    rect(this.x, this.y, this.dx, this.dy);
    fill(this.fillColor);
    pop();
    
    // Faces of the rectangle
    // Front
    push();
    translate(0, -this.y, this.dy + this.y);
    rect(this.x, this.y, this.dx, this.h);
    fill(this.fillColor);
    pop();
    
    // Back
    push();
    translate(0, -this.y, this.y);
    rect(this.x, this.y, this.dx, this.h);
    fill(this.fillColor);
    pop();
    
    // Left
    push();
    translate(this.x, -this.y, this.y -this.x);
    rotateY(-HALF_PI)
    rect(this.x, this.y, this.dy, this.h)
    fill(this.fillColor);
    pop();
    
    // Right
    push();
    translate(this.x + this.dx, -this.y, this.y - this.x);
    rotateY(-HALF_PI);
    rect(this.x, this.y, this.dy, this.h);
    fill(this.fillColor);
    pop();
  }
}