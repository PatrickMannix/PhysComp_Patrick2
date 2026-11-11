let port;
let connectButton;
let potVal = 0;
let b1 = 0;
let b2 = 0;
let b3 = 0;

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
  let threshold = 2048;
  let ledIsOn = false;

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

    if (potVal > threshold) {
      port.write('H');
      ledIsOn = true;
    } else {
      port.write('L');
      ledIsOn = false;
    }
  }

  background(ledIsOn ? 245 : 255);
  stroke(0);
  strokeWeight(2);

  fill(0);
  noStroke();
  textSize(16);
  text("Hardware LED Status: " + (ledIsOn ? "ON (HIGH)" : "OFF (LOW)"), 200, 30);
  stroke(0);

  let circleBase = map(potVal, 0, 4095, 30, 150);
  let circleSize = b1 === 1 ? circleBase + sin(frameCount * 0.15) * 40 : circleBase;
  let circleX = b1 === 1 ? 200 + sin(frameCount * 0.05) * 50 : 200;
  fill(b1 === 1 ? color(255, 50, 50) : color(100, 150, 255));
  ellipse(circleX, 200, circleSize, circleSize);

  let rectBase = map(potVal, 0, 4095, 40, 180);
  let rectW = b2 === 1 ? rectBase * 1.5 : rectBase;
  let rectAngle = b2 === 1 ? frameCount * 0.08 : 0;
  fill(b2 === 1 ? color(255, 255, 0) : color(200, 100, 255));
  push();
  translate(400, 200);
  rotate(rectAngle);
  rectMode(CENTER);
  rect(0, 0, rectW, 80);
  pop();

  let triBaseY = map(potVal, 0, 4095, 120, 320);
  let triY = b3 === 1 ? triBaseY + cos(frameCount * 0.1) * 30 : triBaseY;
  let triScale = b3 === 1 ? 1.5 : 1.0;
  fill(b3 === 1 ? color(0, 255, 255) : color(100, 255, 150));
  triangle(
    600 - (50 * triScale), triY + 40 * triScale, 
    600 + (50 * triScale), triY + 40 * triScale, 
    600, triY - 40 * triScale
  );

  let lineLength = map(potVal, 0, 4095, 100, 700);
  stroke(0);
  line(50, 450, lineLength, 450);
}