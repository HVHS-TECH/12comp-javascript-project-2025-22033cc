console.log("hello! Welcome to my game")
    const canvasWidth = 500;
    const canvasHeight = 700;
    const wasd =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    
    var pinkEggSpeed =2;
    var controls = wasd;
    var gameState = 'start';

/***********************************
 * set up
 ***********************************/
function setup(){
    cnv = new Canvas ("5:7");//(canvasWidth,canvasHeight);
    pinkEgg = new Sprite(pinkEggSize,pinkEggSize,pinkEggSize,'k');
    bulletGroup = new Group();
    console.log(controls[4]);
}
function draw(){

    if (gameState='start'){
    background("#FF69B4")
    startScreen()
    if(kb.presses('1')){
        gameState='playing';
        console.log("cranberry juice"+gameState);
    }
    }
     if (gameState='playing'){
    
    background('grey')
    pinkEggControls()

}
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

    if(kb.pressing(controls[4])&&frameCount%10==0){
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