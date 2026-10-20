const int potPin = 1;

void setup() {
  Serial.begin(9600);
  pinMode(potPin, INPUT);
}

void loop() {
  int potValue = analogRead(potPin);
  Serial.println(potValue);
  delay(10);
}