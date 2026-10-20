let serial;
let portName = 'COM4';
let inData = 0;

function setup() {
  createCanvas(400, 400);
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

function serverConnected() {
}

function gotList(thelist) {
  for (let i = 0; i < thelist.length; i++) {
  }
}

function gotOpen() {
}

function gotClose() {
}

function gotError(theerror) {
}

function gotData() {
  let currentString = serial.readLine();
  if (currentString) {
    let trimmedString = trim(currentString);
    if (!trimmedString) return;
    inData = Number(trimmedString);
  }
}

function draw() {
  background(220);
  let circleDiameter = map(inData, 0, 255, 20, 380);
  fill(0, 150, 255);
  noStroke();
  ellipse(width / 2, height / 2, circleDiameter, circleDiameter);
}