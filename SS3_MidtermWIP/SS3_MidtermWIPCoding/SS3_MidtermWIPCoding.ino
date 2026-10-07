#include <Servo.h>

Servo myServo;

const int potPin = 1;
const int ldrPin = 2;
const int touchPin = 3;
const int buttonPin = 4;
const int ledPin = 5;
const int buzzerPin = 6;
const int servoPin = 7;

int sensorValues[3];
unsigned long previousMillis = 0;
const long interval = 500;
int modeState = 0;

void setup() {
  pinMode(touchPin, INPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  myServo.attach(servoPin);
}

void loop() {
  sensorValues[0] = analogRead(potPin);
  sensorValues[1] = analogRead(ldrPin);
  sensorValues[2] = digitalRead(touchPin);
  
  int buttonState = digitalRead(buttonPin);

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    
    for (int i = 0; i < 3; i++) {
      if (sensorValues[i] > 500 && buttonState == LOW) {
        modeState = 1;
      } else {
        modeState = 0;
      }
    }
  }

  if (modeState == 1 || sensorValues[2] == HIGH) {
    analogWrite(ledPin, sensorValues[0] / 16);
    digitalWrite(buzzerPin, HIGH);
    myServo.write(180);
  } else {
    analogWrite(ledPin, 0);
    digitalWrite(buzzerPin, LOW);
    myServo.write(0);
  }
}
