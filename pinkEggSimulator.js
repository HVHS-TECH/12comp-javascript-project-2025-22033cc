console.log("hello! Welcome to my game")
    

    const canvasWidth = 5;
    const canvasHeight = 7;
    const letterKeys =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    const pinkEggStartPostion =200;
    const enemyStartPosition= 50;
    const bulletRechargeTime = 20;
    const bulletColors = ['white','yellow','orange'];

    var score =0;
    var bulletOutputSpeed = 10;
    var bulletSpeed = -15;
    var pinkEggSpeed =2;
    var controls = letterKeys;
    var gameState = 'start';
    var enemyState = 0;
    var whiteEggPostion=0;
    var bulletPower = 100;
    var bulletRegain=0;
    var ranArray = [-1,1];
    var enemyCounter = 0;
    
/***********************************
 * set up
 ***********************************/
function setup(){
    
    cnv = new Canvas ("5:7");//(canvasWidth,canvasHeight);
    pinkEgg = new Sprite(pinkEggStartPostion,pinkEggStartPostion,pinkEggSize,'k');
    bulletGroup = new Group();
    whiteEggGang = new Group();
    brownEggGang = new Group();
    allEggs = new Group();
    

}

function draw(){
    
    
    //defnine visuals
    pinkEgg.color = 'pink';
    whiteEggGang.color = 'white';
    brownEggGang.color = 'tan';

console.log (enemyState)

    if (gameState=='start'){
        //setting up start screen
        background("#FF69B4")
        startScreen()
        //switch from start screen to playing 
        if(kb.presses('1')){
            gameState='playing';
            enemyState = 1;
        }
    
    } else if (gameState=='playing'){
    //game runing 

        background('grey')
        text("power-level"+bulletPower,50,100);
        text("score:"+score,50,50);
        //run code of current phase
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
        //if the player looses
        background('red');
        text("Uh oh, you've been cracked!",50,100);
        enemyState = 0;
        text("press '1' to retry!",50,50);

        if (kb.presses('1')){
                gameState='start'
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



function beginningOfTheEnd(){
    //return all movement to 0; remove enemy sprites
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

function phase1(){
    var enemyVelocity = random(4, 7);
    //decide when to fire
    for (count = 0; count<10;count++) { 
        if(frameCount%50==0){
            //move the starting position for white egg        
            if(whiteEggPostion>600){
                whiteEggPostion-=50;   
            } else {
                whiteEggPostion=whiteEggPostion+50; 
            }
            //spawn 2 white eggs
            for (count=0;count<2; count++){
                whiteEgg =  new Sprite(whiteEggPostion,50,pinkEggSize,'d');
                whiteEgg.vel.y =(enemyVelocity);
                whiteEggGang.add(whiteEgg);
                allEggs.add(whiteEgg);
                enemyCounter= enemyCounter+1;
                whiteEggPostion = 600-whiteEggPostion;
            }
        
        } else if (enemyCounter==enemysToFire){
            console.log("moving states")
            enemyState='2';
            console.log("enemyState=",+enemyState)
            return;
        }
        
}

function phase2 (){
    var enemyVelocity = 5;
    //random (0.5,3);
    console.log("getting ready to fire")


    if (frameCount%20==0){
        //fire bullets from brown eggs
        for(count=0;count<brownEggGang.length;count++){
            brownBullet = new Sprite (brownEggGang[count].x,brownEggGang[count].y,10,10,'d');
            brownBullet.vel.y = 3;
            allEggs.add(brownBullet);
        }
    }
    

    if (frameCount%100==0){
        console.log("an brown egg is born!");
        brownEgg = new Sprite(50,50,pinkEggSize,'d');
        brownEgg.vel.x = (enemyVelocity);
        whiteEgg.vel.y =(enemyVelocity);
        brownEggGang.add(brownEgg);
        allEggs.add(brownEgg);
    }
        
};

function startScreen(){
    text("welcome to the pink Egg Simulator",50,50)
    text("press 1 to start!",50, 100)
    
}
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
    bullet.color = bulletColors[Math.floor(Math.random()*3)];
    
    bullet.vel.y=bulletSpeed;

    bulletGroup.add(bullet);
}