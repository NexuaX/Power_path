class Power {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.state = 0;
    this.fill = 'white';
    this.conn = [1,1,1,1];
  }
  
  display() {
    fill(this.fill);
    circle(this.x, this.y, this.radius);
  }
  
  clicked() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.radius) {
      if (this.state) {
        this.fill = 'white';
        this.state = 0;
      } else {
        this.fill = 'yellow';
        this.state = 1;
      }
    } 
  }
}

class Connector {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.mode = mode;
    this.rotation = random([0, 90, 180, 270]);
    this.fill = 'white';
    this.state = 0;
    this.conn = [0,0,0,0];
    if (mode == 0) {
      let x = [0, 90, 180, 270].indexOf(this.rotation);
      this.conn[x] = 1;
      this.conn[(x+1)%4] = 1;
    } else if (mode == 1) {
      let x = [0, 90, 180, 270].indexOf(this.rotation);
      this.conn[x] = 1;
      this.conn[(x+2)%4] = 1;
    } else {
      let x = [0, 90, 180, 270].indexOf(this.rotation);
      this.conn[x] = 1;
      this.conn[(x+1)%4] = 1;
      this.conn[(x+2)%4] = 1;
    }
  }
  
  display() {
    push();
    if (this.state) this.fill = 'yellow';
    else this. fill = 'white';
    fill(this.fill);
    circle(this.x, this.y, 12);
    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.rotation);
    translate(-this.x, -this.y);
    if (this.mode == 0) {
      rect(this.x-5, this.y-25, 10, 15, 2);
      rect(this.x+10, this.y-5, 15, 10, 2);
    } else if (this.mode == 1) {
      rect(this.x-5, this.y-25, 10, 15, 2);
      rect(this.x-5, this.y+10, 10, 15, 2);
    } else if (this.mode == 2) {
      rect(this.x-5, this.y-25, 10, 15, 2);
      rect(this.x+10, this.y-5, 15, 10, 2);
      rect(this.x-5, this.y+10, 10, 15, 2);
    }
    pop();
  }
  
  clicked() {
    if (dist(mouseX, mouseY, this.x, this.y) < 12) {
      this.rotation = (this.rotation + 90)%360;
      this.conn.unshift(this.conn.pop());
    }
  }
}

class Recivier {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.state = 0;
    this.fill = 'white';
    this.conn = [1,1,1,1];
  }
  
  display() {
    if (this.state) this.fill = 'blue';
    else this.fill = 'white';
    fill(this.fill);
    circle(this.x, this.y, this.radius);
  }
  
  clicked() {
  }
}

class Blank {
  constructor() {
    this.conn = [0,0,0,0];
  }
  display() {
  }
  clicked() {
  }
}