var monkey,monkey_running;
var ground;
var obstacleGroup;
var bananaGroup;
var banana, banana_image;
var obstacles, obstacles_image;
var survivalTime;
PLAY =1;
END = 0;
gameState = PLAY;

function preload(){
  monkey_running=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_5.png" , "monkey_6.png" , "monkey_7.png" , "monkey_8.png");
  
  banana_image = loadImage("banana.png");
  obstacles_image = loadImage("obstacle.png");
}


function setup(){
  createCanvas(600,600);
  monkey = createSprite(100,400,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
   
  ground = createSprite(300,464,1200,20);
  ground.velocityX = -6;

   bananaGroup = new Group();
   obstacleGroup = new Group();
   survivalTime =  0;
}


function draw(){
  background("white");
  text ("Survival Time: "+survivalTime ,490,200);
  
 // monkey.debug =true;
  
 
  
  if (keyDown("space")&& monkey.y>390){
    monkey.velocityY = -20;
    
  }

   if (ground.x<0){
    ground.x = 300;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  monkey.collide(ground);
  
  //console.log(monkey.y);
  
  spawnFood();
  spawnObjects();
  

  
  if (bananaGroup.isTouching(monkey)){
  
  bananaGroup.destroyEach();
  survivalTime=survivalTime+1;
  }
  if(obstacleGroup.isTouching(monkey)){
     monkey.velocity = 0;
    obstacleGroup.setVelocityEach(0);
    bananaGroup.setVelocityEach(0);
    obstacleGroup.setLifetimeEach(-1);  
    bananaGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    
    
    
    
  }
  //console.log(score);
  
  
  
  
  
  
  
  
  drawSprites();
}

function spawnFood(){
  if (frameCount%90 === 0 ){
  banana = createSprite(610,300,20,20);
  banana.y = Math.round(random(320,370));
    banana.velocityX = -5;
  banana.addImage(banana_image);
  banana.scale = 0.16;
    bananaGroup.add(banana);
  }
}


 function spawnObjects(){
   if (frameCount%80===0){
     obstacles = createSprite(610,420,20,20);
     obstacles.velocityX = -7;
     obstacles.addImage(obstacles_image);
     obstacles.scale = 0.2;
     obstacleGroup.add(obstacles);
   }
 }


