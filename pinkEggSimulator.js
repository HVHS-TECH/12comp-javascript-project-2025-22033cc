
console.log("hello! Welcome to my game")
//all universal constants
    const canvasWidth = 500;
    const canvasHeight = 700;
    const letterKeys =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    const pinkEggStartPosition =[250,300];
    const enemyStartPosition= 50;
    const bulletRechargeTime = 20;
    const bulletColors = ['#FFD23C','yellow','orange','white','#F3EEE2'];
    const wallThickness = 2;
    const ranArray = [-1,1];
    const buttonPosition=[250,250,250,300]
    const buttonSize = [200,30,10]
    const enemiesToFire = 10;
//all universal variables
    var score =0;
    var whiteEggsFired  = 0;
    var whiteEggPosition=-200;
    var bulletOutputSpeed = 10;
    var bulletSpeed = -15;
    var bombSpeed = -5;
    var bombActive = false;
    var pinkEggSpeed =2;
    var controls = letterKeys;
    var gameState = 'start';
    var enemyState = 0;
    var bulletPower = 100;
    var bulletRegain=0;
    var buttonOver = 1;
    var enemyCounter = 0;
    var firstDraw = 0;
    var pinkEggLives = 3;
    var brownEggsFired =0;
    var bombFinalPosition = 0;
    var randomTime = 0;
    var shrapnelAngle = -36;
    var shrapnelRotation = [4,7];
    var shrapnelTheta  = 0;
    var shrapnelA = 0;
    var shrapnelB = 0;
    var shrapnelTotal = 0;
    var shrapnelAngle = 0;
    var randomDraw = 0;
    var backgroundPlay;
    var backgroundStart;
/***********************************
 * set up
 ***********************************/
function setup(){
    //canvasWidth = 500; canvasHeight=700
    cnv = new Canvas (canvasWidth,canvasHeight,);
    y2 = canvasWidth;
    displayMode('centered')
    pinkEgg = new Sprite(pinkEggStartPosition[0],pinkEggStartPosition[1],pinkEggSize,'k');
    firstDraw = 0;
    bulletGroup = new Group();
    bombGroup = new Group();
    whiteEggGang = new Group();
    brownEggGang = new Group();
    brownBulletGang = new Group();
    walls = new Group();
    allEggs = new Group();
    startScreenSprites = new Group();
    endScreenSprites = new Group();
    shrapnelSecondHit = new Group();
    bbomb = new Group();
    //make the walls for collisions
    wallBot = new Sprite(canvasWidth/2,canvasHeight,canvasWidth,   wallThickness, "s");
	wallTop = new Sprite(canvasWidth/2,0,canvasWidth, wallThickness, "s");
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
    backgroundPlay = loadImage("assets/images/EggCarton.jpg") 
    backgroundStart = loadImage("/assets/images/pinkEggCartons.jpg")
    logo = loadImage("/assets/images/title card.png")
}
/*************************************
 * draw loop
 *************************************/
function draw(){
    
    //defnine visuals
    pinkEgg.color = 'pink';
    whiteEggGang.color = 'white';
    brownEggGang.color = 'tan';

    background(backgroundStart)
    if (gameState=='start'){
        //setting up start screen
            
    fill("white")
    text("welcome to ",50,50)
    text("press Enter to select button!",50, 230)

    if (firstDraw == 0){
        logoStart = new Sprite (250,150, 50,20,'n')
        logoStart.image= (logo);
        logoStart.scale = (0.6);
        buttonStart = new Sprite(buttonPosition[0],buttonPosition[1],buttonSize[0],buttonSize[1],'s');
        buttonStart.textsize = buttonSize[2]
        buttonStart.text = 'start a game ';
        buttonControl = new Sprite(buttonPosition[2],buttonPosition[3],buttonSize[0],buttonSize[1],'s');
        buttonControl.textsize = buttonSize[2];
        buttonControl.text = 'controls- hold to see'
        indicator = new Sprite(140,300,10,'s')
        startScreenSprites.add(buttonStart);
        startScreenSprites.add(buttonControl);
        startScreenSprites.add(indicator);
        startScreenSprites.add(logoStart)
        startScreenSprites.color = 'white'
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
        background(backgroundPlay)
        text("power-level"+bulletPower,50,100);
        text("score:"+score,50,50);
        //run code of current phase
        console.log('enemystate=',+enemyState)
        if (enemyState==1){
            phase1();
        }
        if (enemyState==2){
            phase2();
        }
        if (enemyState==3){
          phase3();
        }
        // run funcAtion for controls
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
        bombGroup.collides(allEggs,enemyHitBullet);
        bbomb.collides(allEggs,bombHitEnemy);
        
        bulletPowerCharge();

    } else if (gameState=='end'){
        //if the player loses
        background('red');
        //load button sprites
        if (firstDraw == 0){
            pinkEgg.x = pinkEggStartPosition[0];
            pinkEgg.y = pinkEggStartPosition[1];
            buttonRestart = new Sprite(buttonPosition[0],buttonPosition[1],buttonSize[0],buttonSize[1],'s');
            buttonRestart.textsize = buttonSize[2]
            buttonRestart.text = 'Restart game';
            buttonBack = new Sprite(buttonPosition[2],buttonPosition[3],buttonSize[0],buttonSize[1],'s');
            buttonBack.textsize = buttonSize[2];
            buttonBack.text = 'back to Start Screen'
            indicator = new Sprite(140,300,10,'s')
            endScreenSprites.add(buttonBack);
            endScreenSprites.add(buttonRestart);
            endScreenSprites.add(indicator);
            endScreenSprites.color = 'white'
            buttonOver = 1;
            firstDraw = 1;
        }

        text("Uh oh, you've been cracked!",50,100); 
        text("your score was "+score,50,200);
        text ('good job!',50,250)
        enemyState = 0;
    //call function to check if buttons are pressed
    endButtons();
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
function endButtons(){
    //(buttonOver = 1)= back to Start; 
    //(buttonOver = 2)= restart;

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
        // when button pressed, return to start screen
        gameState = 'start'
        firstDraw = 0;
        score = 0;
        endScreenSprites.removeAll();
    }

     if (kb.presses('enter')&&buttonOver==2){
    //if restart button pressed, restart game 
    gameState ='playing';
    enemyState = 1;
    firstDraw = 0;
    whiteEggsFired = 0;
    brownEggsFired = 0
    score = 0;
    endScreenSprites.removeAll();
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
    //if (gameState == 'start'){
        if(kb.pressing('enter')&&buttonOver==1){
            text("press WASD to move ", 50, 350);
            text("Press K to fire bullets",50,370);
            text("Press L to fire a bomb",50,390);
            text( "You are a pink Egg. The other eggs are jealous of your colour!",50,410)
            text("You need to fire back and rack up points!",50,430)
            text("watch out for your power level!",50,450)
        
        }

        if (kb.presses('enter')&&buttonOver==2){
            gameState ='playing';
            enemyState = 1;
            score = 0
            startScreenSprites.remove();
           }
           
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
function bombHitEnemy(_bomb,_egg){
    _egg.remove();
    score = score+50;
}


/**************************************************
 * whiteEggSweep
 * a small total area attack that spawns a few eggs to fall down
 **************************************************/
function whiteEggSweep(){
    enemyVelocity = 4;
    whiteEggPosition =-50;
    console.log("sweepteststarting")
    for (count = 0; count<7;count++) { 
        console.log("sweeptest"+count)
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
        console.log("finished")
}

/************************************************
 * phaseMachine()
 * a function to change the phases when the phase is finished
 ************************************************/
function phaseMachine(_enemysFired){
    console.log('changing phases'+enemyState);
    
    if (enemyState == 2 && _enemysFired>=10){
        if (frameCount%200==0){
            whiteEggSweep();
            if (frameCount%100==0){
                firstDraw = 0
                randomDraw = 0;
                enemyState = 3;
            }
            
        }
    }

    if (enemyState == 1 &&_enemysFired==enemiesToFire){
        whiteEggSweep()
        console.log("finsihed the whiteEggSweep")
        enemyState = 2; 
        firstDraw = 0;
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

        if(frameCount%70==0){
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
        phaseMachine(whiteEggsFired);
    }
}
/*******************************************************
 * phase2()
 * The second phase, introducing brown Eggs
 * *************************************************** */    
function phase2(){ 
    if (firstDraw == 0){
        brownEggsFired = 5;
        firstDraw = 1;
    }
    enemyVelocity = 4; 
    console.log(enemiesToFire<brownEggsFired)
    console.log(brownEggsFired)
    const brownEggPosition= 50;
    if (frameCount%100==0 && enemiesToFire>brownEggsFired){
        brownEgg = new Sprite(brownEggPosition,brownEggPosition,pinkEggSize,'d');
        brownEgg.vel.x = (enemyVelocity);
        brownEggGang.add(brownEgg);
        allEggs.add(brownEgg);
        brownEggsFired++;
    }
              if (frameCount%20==0){
                //fire bullets from brown eggs
                for(count=0;count<brownEggGang.length;count++){
                    brownBullet = new Sprite (brownEggGang[count].x,brownEggGang[count].y,10,10,'dynamic');
                    brownBullet.vel.y = 3;
                    brownBullet.color = bulletColors[Math.floor(Math.random()*5)];
                    allEggs.add(brownBullet);
                    brownBulletGang.add(brownBullet);
                }
            }
            if (enemiesToFire==brownEggsFired){
                console.log("switch to randomTime")
                phaseMachine(brownEggsFired)
            } 

}
/********************************************************************
 * phase 3()
 * random time
 ********************************************************************/
function phase3(){
    if (randomDraw == 0){
        randomTime = Math.floor(Math.random()*4)  
        console.log(randomTime);
        console.log(randomTime);
        randomDraw = 1;
    }

    if (frameCount%70==0){
        console.log(randomTime)

        if (randomTime == 0||randomTime == 1 ){
            console.log("randomTime0")
            randomDraw = 2;
            whiteEggSweep();
            randomDraw = 0;
    
        }
        if (randomTime == 2||randomTime == 3){
            console.log("randomTime3")
            whiteEggPosition = 50;
            firstDraw = 0;
            randomDraw = 2;
            whiteEggHoming(16);
            randomDraw = 0;
        }
        if (randomTime == 4){
            randomDraw = 2;
            console.log("randomTime4")
            randomDraw = 0 ;
        }
    }   
}

function whiteEggHoming(_whiteEggBatches){
    console.log("shoart"+firstDraw)
    if (firstDraw  == 0){
        console.log("shooo")
        var whiteEggsFired = 0;
        firstDraw = 1;
    }

    if (frameCount%30 == 0 && _whiteEggBatches>whiteEggsFired){
        console.log("firing home")
        for (count = 0; count<4; count++){
            if (whiteEggPosition<250){
                whiteEggPosition = canvasWidth-whiteEggPosition;
            } else if(whiteEggPosition>250){
                whiteEggPosition = whiteEggPosition-canvasWidth/2
            }
            whiteEggHome = new Sprite (whiteEggPosition,20,pinkEggSize,pinkEggSize,'d')
            whiteEggGang.add(whiteEggHome);
            allEggs.add(whiteEggHome)
            whiteEggHome.moveTo(pinkEgg.x, pinkEgg.y, 3);
            whiteEggsFired= whiteEggsFired-1;
        } 
         if(_whiteEggBatches==whiteEggsFired){
        whiteEggGang.remove();
        return;
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
    bbomb.add(bomb);
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
            shrapnelAngle = -126
            for(count=0;count<8;count++){
                shrapnel = new Sprite(bomb.x,bomb.y,10,10,'k');
                bombGroup.add(shrapnel);
                shrapnel.rotationSpeed = ((Math.random(shrapnelRotation*2))*Math.random(ranArray));
                shrapnel.rotation = shrapnelAngle;
                shrapnelAngle = shrapnelAngle+36;
                
                //figure out the angles and how the shrapnel should move 
                    if (shrapnelAngle>90){
                        shrapnelTheta = shrapnelAngle-90;

                    }else{
                        shrapnelTheta = shrapnelAngle

                    }

                    //turn shrapnelTheta into radians
                    shrapnelTheta = shrapnelTheta*Math.PI/180.0;
                    shrapnelTheta = Math.tan(shrapnelTheta);
                    shrapnelA = (shrapnelTheta*10)
                    shrapnelB = 10
                
            //use shrapnelA and B to find velocity

            shrapnel.vel.x = -shrapnelA
            shrapnel.vel.y = -shrapnelB
        }
        bomb.remove();
    }
}