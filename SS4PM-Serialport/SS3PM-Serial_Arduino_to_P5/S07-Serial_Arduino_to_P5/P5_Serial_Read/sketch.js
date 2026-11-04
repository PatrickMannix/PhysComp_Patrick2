let serial;
let portName = 'COM4';
let potVal = 0;
let b1 = 0;
let b2 = 0;
let b3 = 0;

function setup() {
  createCanvas(800, 600);
  serial = new p5.SerialPort();
  serial.list();
  serial.open(portName);
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  serial.on('close', gotClose);
}

function serverConnected() {}
function gotList(thelist) {}
function gotOpen() {}
function gotClose() {}
function gotError(theerror) {}

function gotData() {
  let currentString = serial.readLine();
  if (currentString) {
    let trimmedString = trim(currentString);
    if (!trimmedString) return;
    
    let values = split(trimmedString, ',');
    if (values.length >= 4) {
      potVal = Number(values[0]);
      b1 = Number(values[1]);
      b2 = Number(values[2]);
      b3 = Number(values[3]);
    }
  }
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(2);

  let circleSize = map(potVal, 0, 4095, 40, 200);
  fill(b1 === 1 ? color(255, 0, 0) : color(100, 150, 255));
  ellipse(200, 200, circleSize, circleSize);

  let rectWidth = b2 === 1 ? 150 : 80;
  fill(200, 100, 255);
  rectMode(CENTER);
  rect(400, 200, rectWidth, 80);

  let triOffset = b3 === 1 ? 50 : 0;
  fill(100, 255, 150);
  triangle(550, 240 + triOffset, 650, 240 + triOffset, 600, 140 - triOffset);

  let lineLength = map(potVal, 0, 4095, 100, 700);
  stroke(0);
  line(50, 450, lineLength, 450);
}