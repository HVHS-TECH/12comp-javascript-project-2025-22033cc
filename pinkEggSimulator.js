console.log("hello! Welcome to my game")
    const canvasWidth = 500;
    const canvasHeight = 700;
    const letterKeys =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    const pinkEggStartPostion =200;
    const enemyStartPosition= 50;
    var bulletOutputSpeed = 10;
    var pinkEggSpeed =2;
    var controls = letterKeys;
    var gameState = 'start';
    var i=0;
    var bulletPower = 100;
/***********************************
 * set up
 ***********************************/
function setup(){
    cnv = new Canvas ("5:7");//(canvasWidth,canvasHeight);
    pinkEgg = new Sprite(pinkEggStartPostion,pinkEggStartPostion,pinkEggSize,'k');
    bulletGroup = new Group();
    whiteEggGang = new Group();
    console.log(controls[4]);
    world.gravity.y=1;
}
function draw(){
    console.log("powerleft"+bulletPower)
    if(frameCount%100==0){
        i=i+50;
        console.log("an egg is born!"+i);
        whiteEgg =  new Sprite(i,50,pinkEggSize,'d');
        whiteEggGang.add(whiteEgg);
    }

    /*
    if (gameState='start'){
    background("#FF69B4")
    startScreen()
    if(kb.presses('1')){
        gameState='playing';
        console.log("cranberry juice"+gameState);
    }
    } else if (gameState='playing')*/
    
    background('grey')
    pinkEggControls()

    bulletGroup.collides(whiteEggGang,enemyHitBullet)
    if (frameCount%bulletOutputSpeed*2&&100<bulletPower>0){
        bulletPower=bulletPower+1;
    }

}
function enemyHitBullet(_bullette,_eggo){
    _bullette.color ="green";
    _eggo.color ="red";
    _bullette.remove();
    console.log("BULLET REMOVED!");
    _eggo.remove();
    console.log("EGG REMOVED");
}

function startScreen(){
    
    
}
function pinkEggControls(){
    var xPress=0;
    var yPress=0;
    /* controls for x*/
    if (kb.pressing(controls[1])) {
        xPress= xPress-pinkEggSpeed;
        console.log("left")
    };
        
     if (kb.pressing (controls[3])) {
        xPress = xPress+pinkEggSpeed;
        console.log("right")
    };
    /* controls for y*/
    if (kb.pressing(controls[0])) {
        yPress= yPress-pinkEggSpeed;
        console.log("up")
    };
        
     if (kb.pressing (controls[2])) {
        yPress = yPress+pinkEggSpeed;
        console.log("down")
    };
 

    if(kb.pressing(controls[4])&&frameCount%bulletOutputSpeed==0&&bulletPower>0){
        bulletPower=bulletPower-5;
        shootBulletPink();
    }
            pinkEgg.vel.x = xPress;
            pinkEgg.vel.y = yPress;

}
function shootBulletPink(){
    console.log(pinkEgg.x+pinkEgg.y)
    bullet = new Sprite (pinkEgg.x,pinkEgg.y,10,10,'k')
    bullet.vel.y=-15;

    bulletGroup.add(bullet);
}