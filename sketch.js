const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
 

var gameState = "onSling";
var score = 0;

function preload() {

    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

   
    block1 = new Block(810,350,30,40);
    block2 = new Block(810,300,30,40);
    block3 = new Block(810,290,30,40);
    block4 = new Block(710,280,30,40);
    block5 = new Block(710,270,30,40);
    block6 = new Block(610,260,30,40);
    hexagon = new Hexagon(200,50,30,30);

    slingshot = new SlingShot(hexagon.body,{x:200, y:50});
}

function draw(){
    Engine.update(engine);

    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
        
        ground.display();
        platform.display();

        block1.display();
        block1.score();
        
        
        block2.display();
        block2.score();
        
        
        block3.display();
        block3.score();
        
        block4.display();
        block4.score();
        
        
        block5.display();
        block5.score();
        

        block6.display();
        block6.score();
        

        hexagon.display();
        
        
        slingshot.display();

    }

function mouseDragged(){
    if(gameState!="launched")
        Matter.Body.setPosition(hexagon.body, {x: mouseX , y: mouseY});
  
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(hexagon.body, {x: 200 , y: 50});
       slingshot.attach(hexagon.body);
       gameState="onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=20){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    
}