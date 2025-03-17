console.log("hello! Welcome to my game")
    

    const canvasWidth = 500;
    const canvasHeight = 700;
    const letterKeys =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    const pinkEggStartPostion =200;
    const enemyStartPosition= 50;
    const bulletRechargeTime = 20;
    const bulletColors = ['white','yellow','orange'];
    var score =0;0
    var bulletOutputSpeed = 10;
    var bulletSpeed = -15;
    var pinkEggSpeed =2;
    var controls = letterKeys;
    var gameState = 'start';
    enemyState = 0;
    var i=0;
    var bulletPower = 100;
    var bulletRegain=0;
    var ranArray = [-1,1];
   
    
/***********************************
 * set up
 ***********************************/
function setup(){
    var enemyVelocity = random(4, 7);
    cnv = new Canvas ("5:7");//(canvasWidth,canvasHeight);
    pinkEgg = new Sprite(pinkEggStartPostion,pinkEggStartPostion,pinkEggSize,'k');
    bulletGroup = new Group();
    whiteEggGang = new Group();
    allEggs = new Group();
    console.log(enemyVelocity);
    console.log(enemyVelocity);

}

function draw(){
    
    //defnine visuals
    pinkEgg.color = 'pink';
    whiteEggGang.color = 'white';

    console.log("powerleft"+bulletPower);
   
    if (enemyState==1){
        phase1();
     
    }


    if (gameState=='start'){
    background("#FF69B4")
    startScreen()
    if(kb.presses('1')){
        gameState='playing';
        console.log("cranberry juice"+gameState);
    }
    } else if (gameState=='playing'){
        enemyState = 1;
        background('grey')
        text("power-level"+bulletPower,50,100);
        text("score:"+score,50,50);
        pinkEggControls()
    }
    
    //collisions 
    bulletGroup.collides(whiteEggGang,enemyHitBullet)
    pinkEgg.collides(allEggs,beginningOfTheEnd);
    bulletPowerCharge();
    
}


function beginningOfTheEnd(){
gameState='end';

}
function bulletPowerCharge(){
    if (bulletPower<=0){
        text("WARNING! WARNING! NO ENERGY LEFT!",10,10)
        if(frameCount%100==0){
            bulletRegain=bulletRegain+1;
           
        }
        if(frameCount%100==0&&bulletRegain==3){
            bulletPower=bulletPower+5;
            console.log("back to power");
        }
    }else if (frameCount%bulletRechargeTime==0 && 100>bulletPower){
        bulletPower=bulletPower+5;
        bulletRegain=0;
        console.log("power recharge"+bulletPower)
    
} 
}

function enemyHitBullet(_bullette,_eggo){
    _bullette.color ="green";
    _eggo.color ="red";
    _bullette.remove();
    console.log("BULLET REMOVED!");
    _eggo.remove();
    console.log("EGG REMOVED!");
    score=score+100;
}

function phase1(){
    if(frameCount%100==0){
        
    if(i>650){
         i=i=50;   
    } else {
       i=i+50; };

           console.log("an egg is born!"+i);
            whiteEgg =  new Sprite(i,50,pinkEggSize,'d');
            whiteEgg.vel.y =(enemyVelocity);
            whiteEggGang.add(whiteEgg);
            allEggs.add(whiteEgg);

};

}

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
    console.log(pinkEgg.x+pinkEgg.y)
    bullet = new Sprite (pinkEgg.x,pinkEgg.y,10,10,'k');
    bullet.color = bulletColors[Math.floor(Math.random()*3)];
    
    bullet.vel.y=bulletSpeed;

    bulletGroup.add(bullet);
}