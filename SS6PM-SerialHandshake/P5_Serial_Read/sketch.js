let port;
let connectButton;
let potVal = 0;
let b1 = 0;
let b2 = 0;
let b3 = 0;

let prevB1 = 0;
let prevB2 = 0;
let prevB3 = 0;

let mode = 1;

function setup() {
  createCanvas(800, 600);
  port = createSerial();
  connectButton = createButton('Connect Serial Port');
  connectButton.position(20, 20);
  connectButton.mousePressed(connectClick);
}

function connectClick() {
  if (!port.opened()) {
    port.open(9600);
  } else {
    port.close();
  }
}

function draw() {
  if (port.opened()) {
    let str = port.readUntil('\n');
    if (str != null && str.length > 0) {
      let trimmed = trim(str);
      let values = split(trimmed, ',');
      if (values.length >= 4) {
        potVal = Number(values[0]);
        b1 = Number(values[1]);
        b2 = Number(values[2]);
        b3 = Number(values[3]);
      }
    }
    port.write('r');
  }

  if (b1 === 1 && prevB1 === 0) {
    mode = mode === 1 ? 2 : 1;
  }

  prevB1 = b1;
  prevB2 = b2;
  prevB3 = b3;

  if (potVal > 2048) {
    port.write('A');
  } else {
    port.write('a');
  }

  if (b3 === 1) {
    port.write('B');
  } else {
    port.write('b');
  }

  background(240);
  stroke(0);
  strokeWeight(2);

  fill(100, 150, 255);
  textSize(16);
  noStroke();
  text("Active Mode: " + mode, 200, 30);
  text("Potentiometer: " + potVal, 350, 30);
  stroke(0);

  let circSize = map(potVal, 0, 4095, 40, 180);
  let circY = mode === 1 ? 200 + sin(frameCount * 0.1) * 30 : 200;
  fill(255, 100, 100);
  ellipse(200, circY, circSize, circSize);

  let rectW = map(potVal, 0, 4095, 50, 200);
  let rectAngle = mode === 2 ? frameCount * 0.05 : 0;
  fill(200, 100, 255);
  push();
  translate(400, 200);
  rotate(rectAngle);
  rectMode(CENTER);
  rect(0, 0, rectW, 80);
  pop();

  let triY = mode === 1 ? 200 : 200 + cos(frameCount * 0.1) * 40;
  fill(100, 255, 150);
  triangle(550, triY + 40, 650, triY + 40, 600, triY - 40);

  let lineLen = map(potVal, 0, 4095, 100, 700);
  stroke(0);
  line(50, 450, lineLen, 450);
}