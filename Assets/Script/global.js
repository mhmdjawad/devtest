//global variables that will be used by all modules

let GLOBAL = {};
GLOBAL.ASPECT_MULTIPLIER            = 1;//default multiplier to resize stuff in canvas
GLOBAL.TILESIZE = 16 * GLOBAL.ASPECT_MULTIPLIER;
GLOBAL.BASE_DIR                     = "";
GLOBAL.PROJECT_ASSETS               = GLOBAL.BASE_DIR + "Assets/";
GLOBAL.FRAMERATE                    = 1/15;    // frames per second
GLOBAL.CANVAS = {
    CONTAINER : ".canvas_container",
    WIDTH   :400,
    HEIGHT  :400
}
GLOBAL.CANVAS_WIDTH = GLOBAL.CANVAS.WIDTH;
GLOBAL.CANVAS_HEIGHT = GLOBAL.CANVAS.HEIGHT;
//FONTS
GLOBAL.CHARS = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:-×?©!';
GLOBAL.FONTS = {
    "main"  : {
        "name":"main",
        "img" :GLOBAL.PROJECT_ASSETS+'Images/font-8-white.png',
        "size" : 8
    },
    "white16"  : {
        "name":"white16",
        "img" :GLOBAL.PROJECT_ASSETS+'Images/font-16-white.png',
        "size" : 16
    },
    "black16"  : {
        "name":"black16",
        "img" :GLOBAL.PROJECT_ASSETS+'Images/font-16-black.png',
        "size" : 16
    },
}
GLOBAL.ENTITY = {
    "players" : {
        "name"  : "tanks", 
        "img"   : GLOBAL.PROJECT_ASSETS+'Images/players.png', 
        "size"  : 32,
        "map"   : GLOBAL.PROJECT_ASSETS+'Json/players-map.json',
    }
}
GLOBAL.MAPS = {};
GLOBAL.SOUNDS = {};
GLOBAL.IMAGES = {};
//Assets To Load
GLOBAL.Assets = {
    "loaded" : 0,
    "images_url" : [
        GLOBAL.FONTS.main.img,
        GLOBAL.FONTS.white16.img,
    ],
    "json_url" : [],
    "sounds_url" : [],
    "images"    :{},
    "json"      :{},
    "sounds"    :{}
}
GLOBAL.Assets.count = 
    // Object.keys(GLOBAL.IMAGES).length + 
    GLOBAL.Assets.images_url.length + 
    GLOBAL.Assets.json_url.length + 
    GLOBAL.Assets.sounds_url.length;
// functions and variables that are accessable anywhere
function getClickLocation(e,canvas){
    let clientX,clientY;
    clientX = clientY = Infinity;
    let event = e.event;
    if(e.name == "click"){
        clientX = event.clientX - canvas.offsetLeft     - window.pageXOffset;
        clientY = event.clientY - canvas.offsetTop      - window.pageYOffset;
    }
    else if(e.name == "tocuhstart"){
        let event = e.event.touches[0];
        clientX = event.clientX - canvas.offsetLeft;
        clientY = event.clientY - canvas.offsetTop;
    }
    
    return {
        x : clientX,
        y : clientY
    }
}
function rotateCW(image,times,passed = 0){
    let buffer = document.createElement('canvas');
    buffer.width = this.entityManager.size;
    buffer.height = this.entityManager.size;
    let context = buffer.getContext('2d');
    let x = 0;
    let y = 0;
    if(passed == 1){
        x = image.width /4;
        y = image.width /2;
    }
    // context.setTransform(
    //     0,1,-1,0,this.tank.size,0
    // );
    context.rotate(Math.PI/4);
    context.drawImage(image,x,y);
    // context.rotate(-Math.PI/4);
    // context.setTransform(1,0,0,1,0,0);
    if(times <= 0) return buffer;
    else return this.rotateCW(buffer,times-1,passed++);
}
const DIRECTION = {
    UP              : Symbol("UP"),             //Rotation 0
    UPRIGHT         : Symbol("UPRIGHT"),        //Rotation 1
    RIGHT           : Symbol("RIGHT"),          //Rotation 2
    DOWNRIGHT       : Symbol("DOWNRIGHT"),      //Rotation 3
    DOWN            : Symbol("DOWN"),           //Rotation 4
    DOWNLEFT        : Symbol("DOWNLEFT"),       //Rotation 5
    LEFT            : Symbol("LEFT"),           //Rotation 6       
    UPLEFT          : Symbol("UPLEFT"),         //Rotation 7
}
function getDirection(rotation){
    rotation = rotation % 7;
    switch(rotation){
        case 0 : return DIRECTION.UP;
        case 1 : return DIRECTION.UPRIGHT;
        case 2 : return DIRECTION.RIGHT;
        case 3 : return DIRECTION.DOWNRIGHT;
        case 4 : return DIRECTION.DOWN;
        case 5 : return DIRECTION.DOWNLEFT;
        case 6 : return DIRECTION.LEFT;
        case 7 : return DIRECTION.UPLEFT;
    }
}