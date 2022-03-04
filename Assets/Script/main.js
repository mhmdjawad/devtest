import GameBase     from "./module/GameBase.js";
import EventManager from "./module/EventManager.js";
import SceneManager from './scene/SceneManager.js';
import KeyboardAndMouse from './handler/KeyboardAndMouse.js';
import AssetsManager from "./module/AssetsManager.js";
class CatvsDogGame extends GameBase{
    constructor(){
        super(GLOBAL.CANVAS);
        this.EventManager = new EventManager(this);
        this.SceneManager = new SceneManager(this.EventManager,this);
        this.KeyboardAndMouse = new KeyboardAndMouse(
            this.canvas,
            this.EventManager,
            [KeyboardAndMouse.Event.CLICK]
            ,false);
    }
    async start(){
        AssetsManager.loadAssets();
        this.SceneManager.toLoadingScene();
        this.Timer.start();
    }
    update(time) {
        // console.log("main update");
        this.KeyboardAndMouse.fireEvents(); //handle clicks regardles if paused or not
        if(this.Timer.isPaused == false){   //if not paused draw
            super.update(time);
            if(this.SceneManager){
                this.SceneManager.update(time);
                this.SceneManager.draw(this.ctx);
            }
            else{
                console.log("error in scence manager");
                this.Timer.stop();
            }
        }
    }
    drawTime(t){
        let framesCount = this.framesPassedTillNow.toString().padStart(8,'0');
        let tx = this.canvas.width - this.timeHMS.length * 8 - 4;
        let fx = this.canvas.width - framesCount.length * 8 - 4;
        if(this.fontHandler){
            this.fontHandler.print(this.timeHMS,   this.ctx,tx,4);
            this.fontHandler.print(framesCount,    this.ctx,fx,20);
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    window.game = new CatvsDogGame();
    setTimeout(() => {
        window.game.start();
    }, 500);
}, false);