END=0;
PLAY=1;
var gamestate = PLAY

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score =0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey=createSprite(70,520,10,10);
  monkey.addAnimation("monkeyRunning",monkey_running);
  monkey.scale=0.2;
  
  ground=createSprite(300,590,1200,10);
  ground.velocityX=-3;
  
  bananaGroup= new Group;
  obstacleGroup= new Group;
}


function draw() {
  background("white");
  text("Survival Rate: "+score,80,100);

  if(gamestate===PLAY){
     if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  score=Math.round(frameCount/frameRate());
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
   if(ground.x<0){
    ground.x=ground.width/2;
   }
  
   spawnBanana();
  
    if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    monkey.scale=monkey.scale+0.03;
    score=score+2;
    }
   spawnObstacle();
   }
  else {
    text("Game Over",250,300);
    monkey.visible=false;
    bananaGroup.visible=false;
    obstacleGroup.visible=false;
  }

    if(obstacleGroup.isTouching(monkey)){
      ground.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      score=0;
      gamestate=END;
    }
  
     drawSprites();
  
    }

function spawnBanana(){
  rand=Math.round(random(100,400));
  
  if(frameCount%200==0){
    banana=createSprite(550,r,10,10);
    banana.addImage("bananaImage",bananaImage);
    banana.velocityX=-3;
    banana.scale=0.2;
    banana.lifetime=200;
    bananaGroup.add(banana);
    }

}

function spawnObstacle(){
  if(frameCount%200==0){
   obstacle=createSprite(650,570,50,50);
   obstacle.velocityX=-3;
   obstacle.addImage("obstacleImage",obstacleImage);
   obstacle.scale=0.2;
   obstacle.lifetime=200;
   obstacleGroup.add(obstacle);
    
   obstacleGroup.depth=monkey.depth;
   monkey.depth=monkey.depth+1;
    
  }

  
}





