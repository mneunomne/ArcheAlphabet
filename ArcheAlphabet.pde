import processing.svg.*;
JSONArray json;
int len;
String[] characters;
PFont f;
void setup() {
  json = loadJSONArray("unique-characters.json");
  characters = json.getStringArray();
  len = characters.length;
   
  char[] charset = new char[len];
  for(int i = 0; i< len; i++) {
    charset[i] = characters[i].charAt(0);
    
  }
  int w = floor(sqrt(len));
  int h = ceil(len / w);
  
  size(900, 900, P2D);
  
  PFont f = createFont("arial-unicode-ms.ttf", 32 ,true, charset);
  textFont(f);
  textSize(32);
}

void draw() {
   background(255);
  
  fill(0);
  stroke(0);
  int x = 0;
  int y = 32;
  for(int i = 0; i< len; i++) {
    text(characters[i], x, y);
    x+= 32;
    if (x > width - 32) {
     x=0;
     y+=32;
    }
  }
}
