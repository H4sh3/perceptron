function setup() {
  initState()
  createCanvas(500, 500)

  fill(0, 255, 0)
  strokeWeight(1)
  initPoints()
}

function initState() {
  s = {
    m: random(-3, 3),
    b: 5,
    calcY: function (x) {
      return this.m * x//+this.b
    },
    points: [],
    perceptron: new Perceptron(1)
  }
}
function initPoints() {
  while (s.points.length < 100) {
    s.points.push({ x: random(-1, 1), y: random(-1, 1) })
  }
}

function points() {
  s.points.forEach(p => {
    if (s.calcY(p.x) > p.y) {
      fill(0, 255, 0)
    } else {
      fill(255, 0, 0)
    }
    ellipse(p.x, p.y, 5)
  })
}

function prediction() {
  s.points.forEach(p => {
    if (s.perceptron.predict([p.x]) >= p.y) {
      fill(0, 255, 0)
    } else {
      fill(255, 0, 0)
    }
    ellipse(p.x * 100, p.y * 100, 5)
  })

  stroke(0, 0, 255)
  line(-100, s.perceptron.predict([-1]) * 100, 100, s.perceptron.predict([1]) * 100)
}

function draw() {
  background(90, 90, 90)

  // train 100 epochs to speed things up
  for (let i = 0; i < 100; i++) {
    const p = random(s.points)
    s.perceptron.train([p.x], s.calcY(p.x))
  }

  push()
  translate(width / 2, height / 2)
  axis()
  graph(s.m, s.b)
  prediction()
  pop()
}

function graph() {
  line(-100, s.calcY(-100), 100, s.calcY(100))
}

function axis() {
  line(0, -height, 0, height)
  line(-width, 0, width, 0)
}