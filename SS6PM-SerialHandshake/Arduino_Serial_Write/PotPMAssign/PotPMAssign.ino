const int potPin = 1;
const int btn1Pin = 2;
const int btn2Pin = 4;
const int btn3Pin = 5;
const int led1Pin = 13;
const int led2Pin = 12;

void setup() {
  Serial.begin(9600);
  pinMode(potPin, INPUT);
  pinMode(btn1Pin, INPUT_PULLUP);
  pinMode(btn2Pin, INPUT_PULLUP);
  pinMode(btn3Pin, INPUT_PULLUP);
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char incoming = Serial.read();
    
    if (incoming == 'r') {
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
    } 
    else if (incoming == 'A') {
      digitalWrite(led1Pin, HIGH);
    } 
    else if (incoming == 'a') {
      digitalWrite(led1Pin, LOW);
    } 
    else if (incoming == 'B') {
      digitalWrite(led2Pin, HIGH);
    } 
    else if (incoming == 'b') {
      digitalWrite(led2Pin, LOW);
    }
  }
}