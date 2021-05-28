var path,mainCyclist;
var opponent1,opponent2,opponent3;

var obstacle,gameOver;
var obstacleImg1,obstacleImg2,obstacleImg3,gameOverImg;

var pathImg,mainRacerImg1, mainRacerImg2, opponentImg1, opponentImg2, opponentImg3, opponentImg1a, opponentImg2a, opponentImg3a;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var gameOver, restart;
var obstaclesGroup, CyclistsGroup;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  obstacleImg1=loadImage("obstacle1.png");
  obstacleImg2=loadImage("obstacle2.png");
  obstacleImg3=loadImage("obstacle3.png");
  
  opponentImg1= loadAnimation("opponent1.png", "opponent2.png");
  opponentImg1a= loadAnimation("opponent3.png");
  
  opponentImg2= loadAnimation("opponent4.png", "opponent5.png");
  opponentImg2a= loadAnimation("opponent6.png");
  
  opponentImg3= loadAnimation("opponent7.png", "opponent8.png");
  opponentImg3a= loadAnimation("opponent9.png");
  
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(displayWidth-30,displayHeight-120);
  
// Moving background
//path=createSprite(300,150);
//path.addImage(pathImg);
//path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("Sahilfall",mainRacerImg2);
mainCyclist.scale=0.05; 
  
gameOver = createSprite(300,150);
gameOver.addImage(gameOverImg);
gameOver.visible=false;
  
CyclistsGroup = new Group();
obstaclesGroup = new Group();
}

function draw() {
  background(0);
  image(pathImg,-width/2,height/2,width*8,height);

  if (gameState===PLAY){
    //distance = distance + Math.round(getFrameRate()/60);
   //path.velocityX = -(6 + 3*distance/100);

   mainCyclist.y = World.mouseY;

  if(keyIsDown(RIGHT_ARROW)){
     mainCyclist.x+=50;
  }

  camera.position.x=mainCyclist.x;
camera.position.y=width/2;
    
   //edges= createEdgeSprites();
   //mainCyclist .collide(edges);
  
    spawnCyclists();
  spawnObstacles();
    
  if(obstaclesGroup.isTouching(mainCyclist)){
        gameState = END;
    }
       
  if(CyclistsGroup.isTouching(mainCyclist)){
        gameState = END;
    
    }
  
 }
  
  else if (gameState === END) {
    gameOver.visible = true;

    //set velcity of each game object to 0
    //path.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    CyclistsGroup.setVelocityXEach(0);
    
    //change the trex animation
    mainCyclist.changeAnimation("Sahilfall");
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(50);
    CyclistsGroup.setLifetimeEach(50);
    
  }
  
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,width/2,30);
  
}

function spawnCyclists(){
   if (frameCount % 100 === 0) {
    var Cyclists = createSprite(width,height/4,40,10);
    //Cyclists.y = Math.round(random(80,120));
    
    //Cyclists.velocityX = -4;
    
     //assign lifetime to the variable
     var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: Cyclists.addAnimation("player1",opponentImg1);
        Cyclists.addAnimation("player1fall",opponentImg1a);
       
              break;
      case 2: Cyclists.addAnimation("player2",opponentImg2);
        Cyclists.addAnimation("player2fall",opponentImg2a);
        
              break;
      case 3: Cyclists.addAnimation("player3",opponentImg3);
        Cyclists.addAnimation("player3fall",opponentImg3a);
        
              break;
      default: break;
    }
   Cyclists.scale = 0.05;
   //Cyclists.lifetime = 500;
      
     CyclistsGroup.add(Cyclists);
}
}

function spawnObstacles(){
    if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = (6 + 3*distance/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImg1);
              break;
      case 2: obstacle.addImage(obstacleImg2);
              break;
      case 3: obstacle.addImage(obstacleImg3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 500;
    obstacle.setCollider("circle",0,0,20);
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}