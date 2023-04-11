// Array to store the boxes
let boxes = [];

// Array of emojis
let emojis = ['🤟', '💕', '🏖', '🏄‍♀️', '😆', '🍧', '🆒', '🤣', '🎶', '💬','⍵', '🍉', '🧊', '🏄‍♀️', '😆', '🛁', '🆒', '💦', '🥵', '😇'];

// Gravity force
let gravity;
let backgroundImage;

function preload() {
  backgroundImage = loadImage('34.png');
}

function setup() {
  createCanvas(850, 600);
  textSize(100);

  // Define the gravity force
  gravity = createVector(0, 1);

  // Create the boxes
  for (let i = 0; i < emojis.length; i++) {
    boxes.push(new Box(random(width - 100), random(height - 100), emojis[i]));
  }
}

function draw() {
  background(255);
image(backgroundImage, 0, 0, width, height);
  textSize(90);
  fill('#F6F7F7'); 
  strokeWeight(5);
  stroke('#545353')
  text('Summer', 270, 150);
  noStroke()
  textSize(100)
  // If the mouse is pressed, apply gravity to the boxes
  if (mouseIsPressed) {
    for (let box of boxes) {
      box.applyForce(gravity);
    }
  }

  // Update and display the boxes
  for (let box of boxes) {
    box.update(boxes);
    box.display();
  }
}

class Box {
  constructor(x, y, emoji) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-3, -1));
    this.acc = createVector(0, 0);
    this.size = 100;
    this.emoji = emoji;
  }

  applyForce(force) {
    this.acc.add(force);
  }

 update(boxes) {
  let isCollidingWithEdgeY = this.pos.y + this.size / 2 > height;
  
  
  for (let other of boxes) {
    if (this !== other && other && this.collidesWith(other)) {
      this.resolveCollision(other);
    }
  }

  if (!isCollidingWithEdgeY) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  } else {
    this.pos.y = height - this.size / 2;
    this.vel.y = 0;
  }
  
  
  this.acc.mult(0);
}


  display() {
    //textSize(100)
    text(this.emoji, this.pos.x, this.pos.y);
  }

 collidesWith(other) {
    let distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    let minDistance = (this.size / 2) + (other.size / 2);

    return distance < minDistance;
  }

  resolveCollision(other) {
    let delta = p5.Vector.sub(this.pos, other.pos);
    let d = delta.mag();
    let minDist = (this.size / 2) + (other.size / 2);
    let overlap = minDist - d;

    if (overlap > 0) {
      delta.normalize();
      delta.mult(overlap);

      this.pos.add(delta);
      other.pos.sub(delta);

      // Swap velocities to simulate a simple collision response
      let tempVel = this.vel.copy();
      this.vel = other.vel.copy();
      other.vel = tempVel;
    }
  }
}
