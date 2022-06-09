let bugs=[];
var color_circulo=0;
let tierra;
let fuego;
let agua;
var step=0;
let aire1;
let aire2;
var steplen=1000;
var laststep=0;
var last_y=0;
var nivel_viento=0.5;
var ida_vuelta=0;
var cambio_viento=0;

function preload() {
  tierra = loadSound("tierra1.wav");
  fuego = loadSound("fuego2.mp3");  
  agua = loadSound("agua2.wav");
  aire1 = loadSound("aire.mp3");
  aire2 = loadSound("aire2.mp3");
}
function setup() {
  aire1.amp(0.2);
  aire1.loop();
  aire2.amp(nivel_viento*2);
  aire2.loop();
  createCanvas(windowWidth, windowHeight);
  last_y = 0.5;
  for (let i = 0; i<300; i++){
    bugs.push(new Circulo());
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  aire2.amp(nivel_viento*2);
  background(0);
  if ((laststep+steplen)<millis()){
    if (ida_vuelta==0){
      step=step+1;
      if (step==300){
        ida_vuelta=1;
      }
    }    
    if (ida_vuelta!=0){
      step=step-1;
      if (step==0){
        ida_vuelta=0;
        for (let i = 0; i<300; i++){
          bugs.pop();
        }
        for (let i = 0; i<300; i++){
          bugs.push(new Circulo());
        }
      }
    }
    laststep=laststep+steplen;
    steplen=random(2000,7000);
  }
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    if (i<(step)){
       bugs[i].display();
    }
    if (i==int(step)-1){
      bugs[i].sonar();      
    }
   if(step%2==1){
    cambio_viento=0;
   }
    if (step%2==0 && cambio_viento==0){
      nivel_viento=nivel_viento+random(-0.1,0.1);
      print(nivel_viento);
      cambio_viento=1;
     }
  }
}

class Circulo {
  constructor() {
    this.sono = 0;
    this.x = random(width)/width;
    this.y = last_y+random(-0.1,0.1);
    this.diameter = random(10, 50);
    this.speed = (nivel_viento/250);
    this.transparency = 0;
    this.color= int(random(3)%3);
  }
  sonar(){
    if (this.sono==0){
      this.sono=1;
      switch(this.color){
        case 0:
          fuego.amp(this.diameter/100);
          fuego.pan(((this.x)*2)-1);
          fuego.play();
          break;
        case 1:
          tierra.amp(this.diameter/100);
          tierra.pan(((this.x)*2)-1);
          tierra.play();
          break;
        case 2:
          agua.amp(this.diameter/100);
          agua.pan(((this.x)*2)-1);
          agua.play();
          break;
        default:
          fuego.play();
          break;
    }
    }
    if (this.sono==1 && ida_vuelta==1){
      this.sono=0;
    }      
  }
  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
      this.speed = (nivel_viento/250);
        if (this.transparency<128){
        this.transparency=this.transparency+3;
      }
      switch(this.color){
        case 0:
          fill(255,0,0,this.transparency);
          stroke(255,0,0,this.transparency);
          break;
        case 1:
          fill(0,255,0,this.transparency);
          stroke(0,255,0,this.transparency);
          break;
        case 2:
          fill(0,0,255,this.transparency);
          stroke(0,0,255,this.transparency);
          break;
        default:
          fill(255,255,255,this.transparency);
          break;
      }
      ellipse(this.x*width, this.y*height, this.diameter, this.diameter);
    }
}