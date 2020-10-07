var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_collided;
var ground, invisibleGround, groundImage;

var obstacle, obstacleImage;

var soundtrack, soundtrack2;

var obstacle1Group;
var obstacle2Group;
var obstacle4Group;
var obstacle5Group;
var obstacle6Group;

var banana, bananaImage;

var cloudsGroup, cloudImage;
var obstacle1, obstacle2, obstacle4, obstacle5, obstacle6;
var obstacleGroup, obstacle1Image, obstacle2Image, obstacle4Image, obstacle5Image, obstacle6Image;


var score = 0;
var bananas = 0;
var attempts = 0;


var gameOver, restart;
var gameOverImg, restartImg;

var bananasGroup;

localStorage["HighestScore"] = 0;

function preload() {

  soundtrack = loadSound("soundtrack.mp3");
  soundtrack2 = loadSound("soundtrack2.mp3");

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkey_collided = loadAnimation("sprite_3.png");

  obstacleImage = loadImage("obstacle.png");

  groundImage = loadImage("ground-1.png");

  cloudImage = loadImage("cloud-1.png");

  obstacle1Image = loadImage("tree1.png");
  obstacle2Image = loadImage("tree2.png");
  obstacle4Image = loadImage("tree4.png");
  obstacle5Image = loadImage("tree5.png");
  obstacle6Image = loadImage("bush1.png");

  gameOverImg = loadImage("gameOver2.png");
  restartImg = loadImage("retry-2.png");

  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(600, 200);

  gameOver = createSprite(200, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(480, 100);
  restart.addImage(restartImg);

  gameOver.visible = false;
  restart.visible = false;

  monkey = createSprite(50, 180, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.visible = true;
  monkey.scale = 0.08;

  ground = createSprite(200, 230, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.scale = 1.0;
  ground.velocityX = -(2 + 3 * score / 100);
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  ground.depth = gameOver.depth;
  gameOver.depth = gameOver.depth + 1;


  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  bananasGroup = new Group();
  obstacleGroup = new Group();
  obstacle1Group = new Group();
  obstacle2Group = new Group();
  obstacle4Group = new Group();
  obstacle5Group = new Group();
  obstacle6Group = new Group();
  score = 0;
}

function draw() {
  // monkey.debug = true;
  background(0, 408, 508);

  text("LifeSpan in chimpseconds: " + score, 352, 45);
  text("Attempts: " + attempts, 445, 15);
  text("Bananas: " + bananas, 445, 30);
  text.depth = text.depth + 1;
  if (gameState === PLAY) {

    gameOver.visible = false;
    restart.visible = false;
    monkey.visible = true;


    soundtrack2.play();
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(bananasGroup)) {
      bananas = bananas + 1.0;
      bananasGroup.destroyEach();
    }
    monkey.collide(invisibleGround);
    spawnClouds();
    spawnDistractions();
    spawnObstacle();
    spawnBanana();

    if (monkey.isTouching(obstacleGroup)) {
          attempts=attempts+1;

      gameState = END;
    }
  }
  if (gameState === END) {
        soundtrack.play();

    gameOver.visible = true;
    restart.visible = true;
    restart.scale = 0.5;


    monkey.visible = false;
    obstacle1Group.destroyEach();
    obstacle2Group.destroyEach();
    obstacle4Group.destroyEach();
    obstacle5Group.destroyEach();
    obstacle6Group.destroyEach();
    ground.velocityX = 0;
    // monkey.y=160;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    monkey.changeAnimation("collided", monkey_collided);

    if (mousePressedOver(restart)) {
      reset();
    }
  }
  // console.log(gameState);

  drawSprites();
}

function spawnBanana() {
  if (frameCount % 114 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(0, 90));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 200;

    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    bananasGroup.add(banana);
  }

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 114 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(0, 90));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacle() {
  if (frameCount % 87 === 0) {
    obstacle = createSprite(600, 150, 40, 10);
    obstacle.setCollider("circle", -10, -1, 150);
    // obstacle.debug=true;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -20;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

  }
  if (frameCount % 87 === 0) {
    obstacle = createSprite(600, 150, 40, 10);
    obstacle.setCollider("circle", -10, -1, 150);
    // obstacle.debug=true;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -20;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

  }
}
//creating illusion for making rocket move
function spawnDistractions() {
  if (frameCount % 256 === 0) {
    obstacle1 = createSprite(600, 140, 40, 10);
    obstacle1.addImage(obstacle1Image);
    obstacle1.scale = 0.2;
    obstacle1.velocityX = -7;
    obstacle1Group.add(obstacle1);
    obstacle1.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }

  if (frameCount % 374 === 0) {
    obstacle2 = createSprite(600, 150, 40, 10);
    obstacle2.addImage(obstacle2Image);
    obstacle2.scale = 0.2;
    obstacle2.velocityX = -20;
    obstacle2Group.add(obstacle2);
    obstacle2.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }

  if (frameCount % 366 === 0) {
    obstacle4 = createSprite(600, 170, 40, 10);
    obstacle4.addImage(obstacle4Image);
    obstacle4.scale = 0.2;
    obstacle4.velocityX = -16;
    obstacle4Group.add(obstacle4);
    obstacle4.depth = monkey.depth;
    monkey.depth = monkey.depth - 1;
  }
  if (frameCount % 400 === 0) {
    obstacle5 = createSprite(600, 140, 40, 10);
    obstacle5.addImage(obstacle5Image);
    obstacle5.scale = 0.04;
    obstacle5.velocityX = -7.4;
    obstacle5Group.add(obstacle5);
    obstacle5.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }

  if (frameCount % 580 === 0) {
    obstacle6 = createSprite(600, 170, 40, 10);
    obstacle6.addImage(obstacle6Image);
    obstacle6.scale = 0.15;
    obstacle6.velocityX = -8;
    obstacle6Group.add(obstacle6);
    obstacle6.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }


}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  monkey.changeAnimation("running", monkey_running);

  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);

  score = 0;
}


//to reset the game
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  bananas = 0;
  bananasGroup.destroyEach();
  spawnClouds();
  monkey.changeAnimation("running", monkey_running);
  cloudsGroup.destroyEach();
}