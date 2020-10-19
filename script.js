const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

const maxPoint = 40;

const colorArray = [
  "#ea5455",
  "#ff4b5c",
  "#f0f0f0",
  "#ffe2e2",
  "#ff7171",
  "#8675a9",
];

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };

  this.update = function () {
    this.draw();
    if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
      this.dx = -this.dx;
    }

    if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50 &&
      this.radius < maxPoint
    ) {
      this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
  };
}

function Rectangle(x, y, dx, dy, width, height) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.width = width;
  this.height = height;
  this.minWidth = width;
  this.minHeight = height;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  };

  this.update = function () {
    this.draw();
    if (this.x < 0 || this.x + this.width > innerWidth) {
      this.dx = -this.dx;
    }

    if (this.y < 0 || this.y + this.height > innerHeight) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50 &&
      this.width < maxPoint &&
      this.height < maxPoint
    ) {
      this.width += 1;
      this.height += 1;
    } else if (this.width > this.minWidth) {
      this.width -= 1;
      if (this.height > this.minHeight) this.height -= 1;
    }
  };
}

let circleArray = [];
let rectArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 400; i++) {
    let radius = Math.random() * 10 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
  rectArray = [];
  for (let i = 0; i < 400; i++) {
    let width = Math.random() * 5 + 5;
    let height = Math.random() * 5 + 5;
    let x = Math.random() * (innerWidth - width * 2) + width;
    let y = Math.random() * (innerHeight - height * 2) + height;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    rectArray.push(new Rectangle(x, y, dx, dy, width, height));
  }
}

function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    rectArray[i].update();
  }
  requestAnimationFrame(animate);
}

animate();
init();
