int trigPin = 23;
int echoPin = 22;
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>

#include <WebSocketsServer.h>

WiFiMulti WiFiMulti;
WebSocketsServer webSocket = WebSocketsServer(81);

#define SCREEN_WIDTH 128 // OLED display width,  in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// declare an SSD1306 display object connected to I2C
Adafruit_SSD1306 oled(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
#define USE_SERIAL Serial

void hexdump(const void *mem, uint32_t len, uint8_t cols = 16) {
	const uint8_t* src = (const uint8_t*) mem;
	Serial.printf("\n[HEXDUMP] Address: 0x%08X len: 0x%X (%d)", (ptrdiff_t)src, len, len);
	for(uint32_t i = 0; i < len; i++) {
		if(i % cols == 0) {
			Serial.printf("\n[0x%08X] 0x%08X: ", (ptrdiff_t)src, i);
		}
		Serial.printf("%02X ", *src);
		src++;
	}
	Serial.printf("\n");
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {

    switch(type) {
        case WStype_DISCONNECTED:
            Serial.printf("[%u] Disconnected!\n", num);
            break;
        case WStype_CONNECTED:
            {
                IPAddress ip = webSocket.remoteIP(num);
                Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);

				// send message to client
				webSocket.sendTXT(num, "Lat:52.8235347");
        webSocket.sendTXT(num, "Long:-2.0958335");
            }
            break;
        case WStype_TEXT:
            Serial.printf("[%u] get Text: %s\n", num, payload);

            // send message to client
            // webSocket.sendTXT(num, "message here");

            // send data to all connected clients
            // webSocket.broadcastTXT("message here");
            break;
        case WStype_BIN:
            Serial.printf("[%u] get binary length: %u\n", num, length);
            hexdump(payload, length);

            // send message to client
            // webSocket.sendBIN(num, payload, length);
            break;
		case WStype_ERROR:			
		case WStype_FRAGMENT_TEXT_START:
		case WStype_FRAGMENT_BIN_START:
		case WStype_FRAGMENT:
		case WStype_FRAGMENT_FIN:
			break;
    }

}

void setup() {

    // USE_SERIAL.begin(921600);
  USE_SERIAL.begin(9600); 
  if (!oled.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
  Serial.println(F("SSD1306 allocation failed"));
  while (true);
}
   pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(12, OUTPUT);
  pinMode(13, INPUT);
    //Serial.setDebugOutput(true);
    USE_SERIAL.setDebugOutput(true);
pinMode(15, OUTPUT);
    Serial.println();
    Serial.println();
    Serial.println();

    for(uint8_t t = 4; t > 0; t--) {
        Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
        Serial.flush();
        delay(55);
    }

    WiFiMulti.addAP("Test", "12345678");
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
        Serial.printf("ggg");
    }
    Serial.printf("ggg");
            webSocket.begin();
    webSocket.onEvent(webSocketEvent);
}

int tryasd(){
            long duration, distance;
            digitalWrite(trigPin,HIGH);
            delayMicroseconds(50);
            digitalWrite(trigPin, LOW);
            duration=pulseIn(echoPin, HIGH);
            distance =(duration/2)/29.1;
            return distance;
}


boolean ishighdif(int a1,int a2){
            if ((a1 > (a2+15)) or ((a2 > (a1+15)))){
              return true;
              }
            return false;
}

unsigned long overallStartTime;
unsigned long blinkStartTime;
unsigned long overallPeriod = 10000;
unsigned long blinkPeriod = 500000;
unsigned long currentTime;
boolean blinking = true;

int tryasd1(){
            long duration, distance;
            digitalWrite(13,HIGH);
            delayMicroseconds(50);
            digitalWrite(13, LOW);
            duration=pulseIn(12, HIGH);
            distance =(duration/2)/29.1;
            return distance;
}

#include <HTTPClient.h>
void loop() {
  Serial.printf("123");
    webSocket.loop();
    int vv = tryasd();
    int vv1 = tryasd1();
            delay(50);
    int new123 = tryasd();
            if ((new123 != vv) and (ishighdif(new123,vv))){
                HTTPClient http;
    http.begin("http://185.94.29.56:8000/lat/52.8235347/long/-2.0958335/time/:time");
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
 
    int new1231 = tryasd1();
            if ((new1231 != vv1) and (ishighdif(new1231,vv1))){
                HTTPClient http;
    http.begin("http://185.94.29.56:8000/lat/52.8235347/long/-2.0958335/time/:time");
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }

}
