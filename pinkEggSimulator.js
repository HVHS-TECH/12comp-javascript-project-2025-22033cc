


console.log("hello! Welcome to my game")
    

    const canvasWidth = 5;
    const canvasHeight = 7;
    const letterKeys =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    const pinkEggStartPostion =200;
    const enemyStartPosition= 50;
    const bulletRechargeTime = 20;
    const bulletColors = ['#FFD23C','yellow','orange','white','#F3EEE2'];
    const buttonSize = []
    var score =0;
    var whiteEggsFired  = 0;
    var bulletOutputSpeed = 10;
    var bulletSpeed = -15;
    var pinkEggSpeed =2;
    var controls = letterKeys;
    var gameState = 'start';
    var enemyState = 0;
    var whiteEggPostion=-50;
    var bulletPower = 100;
    var bulletRegain=0;
    var buttonOver = 1;
    var buttonControlColor = "white";
    var buttonStartColor = "white";
    var ranArray = [-1,1];
    var enemyCounter = 0;
    var firstDraw = 0;
/***********************************
 * set up
 ***********************************/
function setup(){
    
    cnv = new Canvas ("5:7");//(canvasWidth,canvasHeight);
    pinkEgg = new Sprite(pinkEggStartPostion,pinkEggStartPostion,pinkEggSize,'k');
    firstDraw = 0;
    bulletGroup = new Group();
    whiteEggGang = new Group();
    brownEggGang = new Group();
    allEggs = new Group();
    startScreenSprites = new Group();
    //make the walls
    wallLeft = new Sprite(canvasHeight/2,0,canvasHeight, canvasHeight,'s')
    wallLeft.color = 'black';
    

}
/*************************************
 * preload
 *************************************/
function preload(){
	pinkEggImg = loadImage('/workspaces/12comp-javascript-project-2025-22033cc/assets/images/pinkEgg.png');
    arrowKeyImg = loadImage('/workspaces/12comp-javascript-project-2025-22033cc/assets/images/arrowKeys.png')
    letterKeysImg = loadImage('/workspaces/12comp-javascript-project-2025-22033cc/assets/images/letterKeys.png')
}
/*************************************
 * draw loop
 *************************************/
function draw(){
    
    
    //defnine visuals
    pinkEgg.color = 'pink';
    whiteEggGang.color = 'white';
    brownEggGang.color = 'tan';

console.log (enemyState)

    if (gameState=='start'){
        //setting up start screen
            background("#FF69B4")
    text("welcome to the pink Egg Simulator",50,50)
    text("press Enter to Start!",50, 100)
    text('press k to shoot,Wasd controls and 1 to',50,150)

    if (firstDraw == 0){
        console.log('game game repositry please work  ')
        buttonStart = new Sprite(250,250,200,30,'s');
        buttonStart.textsize = 10;
        buttonStart.text = 'start a game ';
        buttonControl = new Sprite(250,300,200,30,'s');
        buttonControl.textsize = 10;
        buttonControl.text = 'controls(currently not working)'
        indicator = new Sprite(140,300,10,'s')
        startScreenSprites.add(buttonStart);
        startScreenSprites.add(buttonControl);
        startScreenSprites.add(indicator);
        firstDraw = 1;
    }
    
    buttonClicked();
        //switch the indicator if changed
        if (buttonOver== 1){
            //indicator next to controls
            indicator.y = 300;
        }else if (buttonOver==2){
            //indicator next to start
            indicator.y = 250;
        }
    
    } else if (gameState=='playing'){
    //game runing 
        background('grey')
        text("power-level"+bulletPower,50,100);
        text("score:"+score,50,50);
        //run code of current phase
        console.log('enemystate=',+enemyState)
        if (enemyState=='1'){
            phase1();
        }
        if (enemyState=='2'){
            phase2();
        }
        // run function for controls
        pinkEggControls()

        //collisions 
        bulletGroup.collides(allEggs,enemyHitBullet)
        pinkEgg.collides(allEggs,beginningOfTheEnd);
        bulletPowerCharge();

    } else if (gameState=='end'){
        //if the player loses
        background('red');
   
   
   
        text("Uh oh, you've been cracked!",50,100);
        enemyState = 0;
        text("press '1' to retry!",50,50);
        text("your score was"+score,50,150)
    //call function to check if buttons are pressed
    
        if (kb.presses('1')){
                gameState='start';
        }
    }
    
   

}


function enemyFireBullets(){
    //fire bullets from all brown egg sprites active
    if (frameCount%5==0){
        for(count=0;count>brownEggGang.length;count++){
            brownBullet = new Sprite (100,100,10,10,'d');
            brownBullet.vel.y = 3;
            allEggs.add(brownBullet);
        }
    }

};

function buttonClicked(){
    //(buttonOver = 1)= controls; 
    //(buttonOver = 2)= start;

    //figure out what button the player is over
   if (kb.releases(controls[0])){
    //button up
    buttonOver++
   }

   if (kb.releases(controls[2])){
    //button down
    buttonOver = buttonOver-1;
   }

   if (buttonOver>2){
    buttonOver=1
   }
   if(buttonOver==0){
    buttonOver=2;
   }
   if(kb.presses('enter')&&buttonOver==1){
    controlsImage = new Sprite(100,200,100,100,'s')
        if (controls = letterKeys) {
            controlsImage.image = (letterKeysImgImg);

        }else if(controls = arrowKeys){
            controlsImage.image = (arrowKeyImgKeysImg);
        }

   }
   if (kb.releases('enter')&&buttonOver==1){
    controlsImage.remove();
   }
   if ((kb.releases(controls[1])||kb.releases(controls[3]))&& buttonOver==1){
    console.log('change controls')
   }
   //change stroke thickness of buttons for indicator

   if (buttonOver==1){
    buttonControlColor ='white';
   }else{
    buttonControlColor ='grey';
   }

   if (buttonOver==2){
    buttonStartColor ='white';
   }else{
    buttonStartColor = 'grey';
   }

   if (kb.presses('enter')&&buttonOver==2){
    gameState ='playing';
    enemyState = 1;
    startScreenSprites.remove();
   }
   console.log("buttonOver="+buttonOver)
}


function beginningOfTheEnd(){
    //return all movement to 0; remove enemy sprites
    firstDraw = 0;
    gameState='end';
    allEggs.remove();
    pinkEgg.vel.x = 0;
    pinkEgg.vel.y = 0;
    enemyState = 0;


}
function bulletPowerCharge(){
    //check if player has run out of bullet power 
    if (bulletPower<=0){
        text("WARNING! WARNING! NO ENERGY LEFT!",10,10)
        if(frameCount%100==0){
            bulletRegain=bulletRegain+1;  
        }

        if(frameCount%100==0&&bulletRegain==3){
            bulletPower=bulletPower+5;
        }
    //recharge if not the case
    }else if (frameCount%bulletRechargeTime==0 && 100>bulletPower){
        bulletPower=bulletPower+5;
        bulletRegain=0;
    
} 
}

function enemyHitBullet(_bullet,_egg){
    // check if player bullets hit enemy
    _bullet.remove();
    _egg.remove();
    score=score+100;
}

function whiteEggSweep(){
    enemyVelocity = 2;
    console.log('start the sweep')
    for (count = 0; count<15;count++) { 
            //move the starting position for white egg        
            if(whiteEggPostion>600){
                whiteEggPostion-=50;   
            } else {
                whiteEggPostion=whiteEggPostion+50; 
            }
            //spawn 2 white eggs
            for (var double=0;double<2; double++){
                whiteEgg =  new Sprite(whiteEggPostion,50,pinkEggSize,'d');
                whiteEgg.vel.y =(enemyVelocity);
                whiteEggGang.add(whiteEgg);
                allEggs.add(whiteEgg);
                enemyCounter= enemyCounter+1;
                whiteEggPostion = 600-whiteEggPostion;
            }

        }


}
function phaseMachine(){
    console.log('changing phases'+enemyState);
    if (enemyState == 1 ){
        whiteEggSweep()
        enemyState = 2;
        console.log('changing phases'+enemyState);
    }
}
function phase1(){
    const enemysToFire = 10;
    
   //choose a random velocity 
    var enemyVelocity = random(4, 7);

    //decide when to fire
    if (enemysToFire > whiteEggsFired){

        if(frameCount%100==0){
            //move the starting position for white egg  
            if(whiteEggPostion>600){
                whiteEggPostion-=50;   
            } else {
                whiteEggPostion=whiteEggPostion+50; 
            }
            //spawn 2 white eggs
            for (var doubles=0;doubles<2; doubles++){
                whiteEgg =  new Sprite(whiteEggPostion,50,pinkEggSize,'d');
                whiteEgg.vel.y =(enemyVelocity);
                whiteEggGang.add(whiteEgg);
                allEggs.add(whiteEgg);
                enemyCounter= enemyCounter+1;
                whiteEggPostion = 500-whiteEggPostion;
            }

            whiteEggsFired++;
        }   
    }else if (enemysToFire == whiteEggsFired){
        phaseMachine();
    }
}
        

function phase2 (){
    var enemyVelocity = 5;
    //random (0.5,3);
    console.log("getting ready to fire")

    if (frameCount%100==0){
        console.log("an brown egg is born!");
        brownEgg = new Sprite(50,50,pinkEggSize,'d');
        brownEgg.vel.x = (enemyVelocity);
        brownEggGang.add(brownEgg);
        allEggs.add(brownEgg);
    }

    if (frameCount%20==0){
        //fire bullets from brown eggs
        for(count=0;count<brownEggGang.length;count++){
            brownBullet = new Sprite (brownEggGang[count].x,brownEggGang[count].y,10,10,'d');
            brownBullet.vel.y = 3;
            allEggs.add(brownBullet);
        }
    }

        
};

function pinkEggControls(){
    var xPress=0;
    var yPress=0;
    /* controls for x*/
    if (kb.pressing(controls[1])) {
        //left
        xPress= xPress-pinkEggSpeed;
    };
        
     if (kb.pressing (controls[3])) {
        //right
        xPress = xPress+pinkEggSpeed;
    };
    /* controls for y*/
    if (kb.pressing(controls[0])) {
        //up
        yPress= yPress-pinkEggSpeed;
    };
        
     if (kb.pressing (controls[2])) {
        //down
        yPress = yPress+pinkEggSpeed;

    };
 

    if(kb.pressing(controls[4])&&frameCount%bulletOutputSpeed==0&&bulletPower>0){
        //shoot
        bulletPower=bulletPower-5;
        shootBulletPink();
    }
    pinkEgg.vel.x = xPress;
    pinkEgg.vel.y = yPress;

}
function shootBulletPink(){

    bullet = new Sprite (pinkEgg.x,pinkEgg.y,10,10,'k');
    bullet.color = bulletColors[Math.floor(Math.random()*5)];
    
    bullet.vel.y=bulletSpeed;

    bulletGroup.add(bullet);
}