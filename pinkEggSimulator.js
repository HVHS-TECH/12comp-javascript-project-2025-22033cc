console.log("hello! Welcome to my game")
    const canvasWidth = 500;
    const canvasHeight = 700;
    const wasd =['w','a','s','d','k','l'];
    const arrowKeys=["up","left","down","right","z","x"];
    const pinkEggSize =20;
    
    var pinkEggSpeed =2;
    var controls = '0';
    var gameState = 'start'

/***********************************
 * set up
 ***********************************/
function setup(){

    cnv = new Canvas (canvasWidth,canvasHeight);
    pinkEgg = new Sprite(pinkEggSize,pinkEggSize,pinkEggSize,);

}
function draw(){
    
    if (gameState='start'){
    background("#FF69B4")
    startScreen()
    }else if (gameState='playing'){
    
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
            pinkEgg.vel.x = xPress;
            pinkEgg.vel.y = yPress;

}

