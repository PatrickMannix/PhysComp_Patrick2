const int potPin = 1;
const int btn1Pin = 2;
const int btn2Pin = 4;
const int btn3Pin = 5;
const int ledPin = 13;

void setup() {
  Serial.begin(9600);
  pinMode(potPin, INPUT);
  pinMode(btn1Pin, INPUT_PULLUP);
  pinMode(btn2Pin, INPUT_PULLUP);
  pinMode(btn3Pin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int potValue = analogRead(potPin);
  
  int btn1 = digitalRead(btn1Pin) == LOW ? 1 : 0;
  int btn2 = digitalRead(btn2Pin) == LOW ? 1 : 0;
  int btn3 = digitalRead(btn3Pin) == LOW ? 1 : 0;

  Serial.print(potValue);
  Serial.print(",");
  Serial.print(btn1);
  Serial.print(",");
  Serial.print(btn2);
  Serial.print(",");
  Serial.println(btn3);

  if (Serial.available() > 0) {
    char incoming = Serial.read();
    if (incoming == 'H') {
      digitalWrite(ledPin, HIGH);
    } else if (incoming == 'L') {
      digitalWrite(ledPin, LOW);
    }
  }

  delay(20);
}