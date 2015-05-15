var points = 120;
var radius = 240;

var d_r;
var d_phi;

var spiralPoints;

var lines = new Array(256).map(function() { return null });

var spiral;
function setup() {
  var mycanvas = createCanvas(480, 480);
  mycanvas.parent('may14');

  d_r = 2 / points * radius;
  d_phi = TAU * 2 / points;

  spiralPoints = _.range(points + 1)
                  .map(function(i) {
                    var x = cos(d_phi * i) * min(d_r * i, radius) + radius;
                    var y = sin(d_phi * i) * min(d_r * i, radius) + radius;
                    return { x: x, y: y };
                  });


  spiral = buildSpiral();
}

function draw() {
  background('white');
  image(spiral);

  newLine();
  drawLines();
}

function buildSpiral() {
  var spiral = createGraphics(480, 480);

  spiral.fill('#424242');
  spiral.noStroke();

  spiral.ellipse(radius, radius, radius * 2, radius * 2);

  spiral.noFill();
  spiral.stroke(255, 64);
  spiral.strokeWeight(2);

  spiral.beginShape();
  spiralPoints.map(function(p) { spiral.vertex(p.x, p.y); });
  spiral.endShape();

  return spiral;
}

function newLine() {
  lines.shift();
  lines.push(spiralPoints[randomInt()]);
}

function drawLines() {
  lines.forEach(function(point, i) {
    if (point) {
      stroke(255, i * 0.25);
      strokeWeight(4);
      line(radius, radius, point.x, point.y);

      strokeWeight(1);
      stroke(255, i);
      line(radius, radius, point.x, point.y);

      noStroke();
      fill(255, i * 0.25);
      ellipse(point.x, point.y, 4, 4);
    }
  });
}

function randomInt() {
  return floor(random(256));
} 
