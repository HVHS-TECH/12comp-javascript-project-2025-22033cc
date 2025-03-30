


console.log("hello! Welcome to my game")
    

    const canvasWidth = 500;
    const canvasHeight = 700;
    const letterKeys =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    const pinkEggStartPosition =200;
    const enemyStartPosition= 50;
    const bulletRechargeTime = 20;
    const bulletColors = ['#FFD23C','yellow','orange','white','#F3EEE2'];
    const buttonSize = []
    const wallThickness = 2;
    var score =0;
    var whiteEggsFired  = 0;
    var bulletOutputSpeed = 10;
    var bulletSpeed = -15;
    var bombSpeed = -5;
    var bombActive = false;
    var pinkEggSpeed =2;
    var controls = letterKeys;
    var gameState = 'start';
    var enemyState = 0;
    var whiteEggPosition=-50;
    var bulletPower = 100;
    var bulletRegain=0;
    var buttonOver = 1;
    var buttonControlColor = "white";
    var buttonStartColor = "white";
    var ranArray = [-1,1];
    var enemyCounter = 0;
    var firstDraw = 0;
    var pinkEggLives = 3;
    var bombFinalPosition = 0;
    var shrapnelAngle = 0 ;
    var shrapnelRotation = [4,7];
    var shrapnelTheta  = 0;
    var shrapnelOpposite = 0;
    var shrapnelAdjacent = 0;
    var shrapnelTotal = 0;
/***********************************
 * set up
 ***********************************/
function setup(){
    //canvasWidth = 500; canvasHeight=700
    cnv = new Canvas (canvasWidth,canvasHeight,);
    displayMode('centered')
    pinkEgg = new Sprite(pinkEggStartPosition,pinkEggStartPosition,pinkEggSize,'k');
    firstDraw = 0;
    bulletGroup = new Group();
    whiteEggGang = new Group();
    brownEggGang = new Group();
    brownBulletGang = new Group();
    walls = new Group();
    allEggs = new Group();
    startScreenSprites = new Group();
    endScreenSprites = new Group();
    //make the walls for collisions
    wallBot = new Sprite(canvasWidth/2,canvasHeight,canvasWidth,   wallThickness, "s");
	wallTop = new Sprite(canvasWidth/2,  0,canvasWidth,   wallThickness, "s");
	wallRH = new Sprite(canvasWidth,  canvasHeight/2, wallThickness, canvasHeight, "s");
	wallLH = new Sprite(0,  canvasHeight/2, wallThickness, canvasHeight, "s");
    walls.add(wallTop);
    walls.add(wallBot);
    walls.add(wallRH);
    walls.add(wallLH);
    console.log(walls);

}
/*************************************
 * preload
 *************************************/
function preload(){
    
	pinkEggImg = loadImage('assets/images/pinkEgg.png');
    arrowKeyImg = loadImage('assets/images/arrowKeys.png')
    letterKeysImg = loadImage('assets/images/letterKeys.png')
}
/*************************************
 * draw loop
 *************************************/
function draw(){
    
    
    //defnine visuals
    pinkEgg.color = 'pink';
    whiteEggGang.color = 'white';
    brownEggGang.color = 'tan';


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
        if(bombActive == true){
            bombCheck()
        }
        //collisions 
        bulletGroup.collides(allEggs,enemyHitBullet)
        pinkEgg.collides(allEggs,beginningOfTheEnd);
        wallBot.collides(whiteEggGang,allEggsRemover);
        wallLH.collides(brownEggGang,allEggsRemover);
        wallRH.collides(brownEggGang,allEggsRemover);
        walls.collides(brownBulletGang,allEggsRemover);
        bulletPowerCharge();

    } else if (gameState=='end'){
        //if the player loses
        background('red');
        //load button sprites
        if (firstDraw == 0){
        buttonRestart = new Sprite(250,250,200,30,'s');
        buttonRestart.textsize = 10;
        buttonRestart.text = 'start a game ';
        buttonReturn = new Sprite(250,300,200,30,'s');
        buttonReturn.textsize = 10;
        buttonReturn.text = 'controls(currently not working)'
        indicator = new Sprite(140,300,10,'s')
        firstDraw = 1;
        //add all sprites to group
        endScreenSprites.add(buttonRestart)
        endScreenSprites.add(buttonReturn)
        endScreenSprites.add(indicator)
        }

        text("Uh oh, you've been cracked!",50,100);    
        text("press enter to retry!",50,50);
        text("your score was"+score,50,150)
        enemyState = 0;
    //call function to check if buttons are pressed
    buttonClicked();
        //switch the indicator if changed
        if (buttonOver== 1){
            //indicator next to controls
            indicator.y = 300;
        }else if (buttonOver==2){
            //indicator next to start
            indicator.y = 250;
        }

    }
    
   

}

function allEggsRemover(_walls,_eggs){
    console.log('another egg has died of natural causes')
    _eggs.remove();
}
/*************************************************
 * enemyFireBullets
 * fire the bullets from brown and quail eggs
 ************************************************/
/*
function enemyFireBullets(){
    //fire bullets from all brown egg sprites active
    if (frameCount%5==0){
        for(count=0;count>brownEggGang.length;count++){
            brownBullet = new Sprite (100,100,10,10,'d');
            brownBullet.vel.y = 3;
            brownBulletGang.add(brownBullet);
            allEggs.add(brownBullet);

            
        }
    }

};
*/
/***********************************************
 * buttonClicked 
 * checking if button is being pressed
************************************************/
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

//if the game is on the start screen, execute the following when enter is pressed 
        //show a thumbnail of the controls
    if (gameState == 'start'){
        if(kb.presses('enter')&&buttonOver==1){
            controlsImage = new Sprite(100,200,100,100,'s')
                if (controls = letterKeys) {
                    controlsImage.image = (letterKeysImg);

                }else if(controls = arrowKeys){
                    controlsImage.image = (arrowKeyImg);
                }

        }

        if (kb.releases('enter')&&buttonOver==1){
            controlsImage.remove();
        }

        if ((kb.releases(controls[1])||kb.releases(controls[3]))&& buttonOver==1){
            console.log('change controls')
        }
    } else if (gameState=='end'){
        //start the game, remove the unneeded sprites
        if (kb.presses('enter')&&buttonOver==2){

            gameState ='playing';
            enemyState = 1;
            startScreenSprites.remove();
           }
        if (kb.presses('enter')&&buttonOver==1){
            gameState = 'start'
            firstDraw = 0;
            endScreenSprites.remove();
        }
        if (kb.presses('enter')&&buttonOver == 2 ){
            gameState = 'restart'
            enemyState = '1'
            score = 0;
            endScreenSprites.remove();
        }
    }
   //change stroke thickness of buttons for indicator
/*
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

  */ 
}
/**************************************************
 * beginningOfTheEnd())
 * return all movement to 0, remove almost all sprites
 *************************************************/

function beginningOfTheEnd(){
    //return all movement to 0; remove enemy sprites
    firstDraw = 0;
    gameState='end';
    allEggs.remove();
    pinkEgg.vel.x = 0;
    pinkEgg.vel.y = 0;
    enemyState = 0;


}
/**************************************************
 * bulletPowerCharge()
 * check if player has run out of bullet power
 * recharge bullet power
 *************************************************/
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

/************************************************
 * enemyHitBullet()
 * collider
 * removing bullet or enemy egg.
 ***********************************************/
function enemyHitBullet(_bullet,_egg){
    // check if player bullets hit enemy
    _bullet.remove();
    _egg.remove();
    score=score+100;
}

/**************************************************
 * whiteEggSweep
 * a small total area attack that spawns a few eggs to fall down
 **************************************************/
function whiteEggSweep(){
    enemyVelocity = 4;
    whiteEggPosition =-50;
    for (count = 0; count<7;count++) { 
            //move the starting position for white egg        
            if(whiteEggPosition>600){
                whiteEggPosition-=50;   
            } else {
                whiteEggPosition=whiteEggPosition+50; 
            }
            if(whiteEggPosition==500-whiteEggPosition){
                whiteEggPosition = whiteEggPosition-20;
            }
            //spawn 2 white eggs
            for (var double=0;double<2; double++){
                whiteEgg =  new Sprite(whiteEggPosition,50,pinkEggSize,'d');
                whiteEgg.vel.y =(enemyVelocity);
                whiteEggGang.add(whiteEgg);
                allEggs.add(whiteEgg);
                enemyCounter= enemyCounter+1;
                whiteEggPosition = 600-whiteEggPosition;
            }

        }

/************************************************
 * phaseMachine()
 * a function to change the phases when the phase is finished
 ************************************************/
}
function phaseMachine(){
    console.log('changing phases'+enemyState);
    if (enemyState == 1 ){
        if (frameCount%50==0){
        whiteEggSweep()
        
        enemyState = 2;
        console.log('changing phases'+enemyState);
        }
    }
}
/***************************************************
 * phase1()
 * the first phase, having white eggs falling down from outside to inside.
 **************************************************/
function phase1(){
    const enemysToFire = 10;
    
   //choose a random velocity 
    var enemyVelocity = random(4, 7);

    //decide when to fire
    if (enemysToFire > whiteEggsFired){

        if(frameCount%100==0){
            //move the starting position for white egg  
            if(whiteEggPosition>600){
                whiteEggPosition-=50;   
            } else {
                whiteEggPosition=whiteEggPosition+50; 
            }
            if(whiteEggPosition==(500-whiteEggPosition)){
                whiteEggPosition = whiteEggPosition+20;
            }
            //spawn 2 white eggs
            for (var doubles=0;doubles<2; doubles++){
                whiteEgg =  new Sprite(whiteEggPosition,50,pinkEggSize,'d');
                whiteEgg.vel.y =(enemyVelocity);
                whiteEggGang.add(whiteEgg);
                allEggs.add(whiteEgg);
                enemyCounter= enemyCounter+1;
                whiteEggPosition = 500-whiteEggPosition;
            }

            whiteEggsFired++;
        }   
    }else if (enemysToFire == whiteEggsFired){
        phaseMachine();
    }
}
/*******************************************************
 * phase2()
 * The second phase, introducing brown Eggs
 * *************************************************** */       

function phase2 (){
    var enemyVelocity = 2;
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
            brownBulletGang.add(brownBullet);
        }
    }

        
};
/*******************************************************************
 * pinkEggControls()
 * moves the pink egg if controls are pressed
 * ****************************************************************/
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
    if(kb.presses(controls[5])&&bulletPower>50){
        bulletPower = bulletPower-50;
        shootBomb();
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
function shootBomb(){
    bomb = new Sprite(pinkEgg.x,pinkEgg.y,15,'k');
    bomb.color = bulletColors[0]
     bombFinalPosition = pinkEgg.y-100;
    bombActive = true;
    bomb.vel.y = bombSpeed;
}
function bombCheck(){
        if(bombFinalPosition==bomb.y){
            bombFinalPosition = 0;
            bomb.vel.y = 0;
            bomb.color = 'red'

            //making shrapnel
            for(count=0;count<9;count++){
                console.log('making shrapnel',+count);
                shrapnel = new Sprite(bomb.x,bomb.y,5,5,'k');
                shrapnel.rotationSpeed = ((Math.random(shrapnelRotation*2))*Math.random(ranArray));
                shrapnel.rotation = shrapnelAngle;
                shrapnelAngle = shrapnelAngle+45;

                //figure out the angles and how the shrapnel should move 
                if(shrapnelAngle<180){
                    if (shrapnelAngle>90){
                        shrapnelTheta = shrapnelAngle-90;
                    }else{
                        shrapnelTheta = shrapnelAngle
                    }

                    //turn shrapnelTheta into radians
                    shrapnelTheta = shrapnelTheta*Math.PI/180.0;

                    shrapnelTotal = Math.tan(shrapnelTheta);
                    shrapnelTotal = Math.fraction(shrapnelTotal)
                    console.log(shrapnelTotal)
                    
                    console.log(shrapnelOpposite/shrapnelAdjacent);
                    console.log(Math.tan(shrapnelTheta));
                }
            }
        }
}