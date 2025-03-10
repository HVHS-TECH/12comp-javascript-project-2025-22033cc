console.log("hello! Welcome to my game")
    const canvasWidth = 500;
    const canvasHeight = 700;

    const pinkEggSize =20;
    var pressX=0;
/***********************************
 * set up
 ***********************************/
function setup(){

    cnv = new Canvas (canvasWidth,canvasHeight);
    pinkEgg = new Sprite(pinkEggSize,pinkEggSize,pinkEggSize,);


 world.gravity.x  = 1;
}
function draw(){
    background("#FF69B4")	

    pinkEggControls()
}
function pinkEggControls(){

    

    if (kb.press('a')) {

        pressX= pressX-2;
        console.log("pressX=",pressX);
        }
        
     if (kb.press ('d')) {
        pressX = pressX+2;
        console.log("pressed right=",pressX);
    };
        
        if (kb.pressing('s')) {
            pinkEgg.vel.y = 2;
            }
            
            else if (kb.pressing ('w')) {
            pinkEgg.vel.y = -2;
            
            }
            console.log("end result", pressX);
            pinkEgg.vel.x   =  pressX;

}

