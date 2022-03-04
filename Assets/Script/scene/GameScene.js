import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js'
import Player               from '../entity/player.js';
import Point from '../module/Point.js';
import Rectangle from '../module/Rectangle.js';
import FontHandler from '../handler/FontHandler.js';
export default class GameScene{
    constructor(sceneManager){
        window.scene = this;
        this.sceneManager = sceneManager;
        this.sceneManager.eventManager.addSubscriber(this,[
			KeyboardAndMouse.Event.TOUCH,
			KeyboardAndMouse.Event.CLICK,
			KeyboardAndMouse.Event.MOUSEDOWN,
			KeyboardAndMouse.Event.KEYDOWN
		]);
        this.FontHandlerW = FontHandler.Handlers[GLOBAL.FONTS.white16.name];
        this.level = 1;
        this.cat = Player.makePlayer(Player.PLAYER_TYPES.CAT);
        this.dog = Player.makePlayer(Player.PLAYER_TYPES.DOG);
        this.dog.level = this.level;
        this.cat.setPosition(new Point(32*2,GLOBAL.CANVAS_HEIGHT-32));
        this.dog.setPosition(new Point(GLOBAL.CANVAS_WIDTH - 32*2,32));
        this.Objects = [this.cat,this.dog];
    }
    update(time) {
        this.dog.randomActions();
        this.cat.update(time);
        this.dog.update(time);
        this.cat.shots.forEach(x => {
            if(x.distanceTo(this.dog.center) <= 15){
                this.dog.life -= x.life;
                x.life = 0;
                if(this.cat.life <= 0){
                    alert("congradulations, you win");
                    this.newgame();
                }
            }
        });
        this.dog.shots.forEach(x => {
            if(x.distanceTo(this.cat.center) <= 15){
                this.cat.life -= x.life;
                x.life = 0;
                if(this.cat.life <= 0){
                    alert("game over, you loose");
                }
            }
        });
    }
    newgame(){
        this.level += 1;
        // this.cat = Player.makePlayer(Player.PLAYER_TYPES.CAT);
        this.dog = Player.makePlayer(Player.PLAYER_TYPES.DOG);
        this.dog.level = this.level;
        // this.cat.setPosition(new Point(32*2,GLOBAL.CANVAS_HEIGHT-32));
        this.dog.setPosition(new Point(GLOBAL.CANVAS_WIDTH - 32*2,32));
        this.Objects = [this.cat,this.dog];
    }
    notify(e){
		if(e.name == KeyboardAndMouse.Event.KEYDOWN || e.name == KeyboardAndMouse.Event.KEYPRESS){
			this.keydown(e.event);
		}
		else{
			console.log(e);		///but we are only listning to click and touch
		}
	}
    draw(ctx) {
		ctx.clearRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		[...this.Objects].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
        this.FontHandlerW.print("DOG " + this.dog.life, ctx, 0, GLOBAL.CANVAS_HEIGHT/2 + 0, false);
        this.FontHandlerW.print("CAT " + this.cat.life, ctx, 0, GLOBAL.CANVAS_HEIGHT/2 + 16, false);
	}
	keydown(key){
		if(key.which) key = key.which;
		if(key == KeyboardAndMouse.key.LEFT){
            // console.log("left");
            this.cat.moveleft();
        }
        else if(key == KeyboardAndMouse.key.RIGHT){
            // console.log("right");
            this.cat.moveright();
        }
        else if(key == KeyboardAndMouse.key.SPACE){
            // console.log("space");
            this.cat.fire();
        }
		else if(key == KeyboardAndMouse.key.X || key == KeyboardAndMouse.key.ENTER){
            // console.log("enter");
            if(this.sceneManager._main.Timer.isPaused == false){
                this.sceneManager._main.Timer.isPaused = true;
            }
            else{
                this.sceneManager._main.Timer.isPaused = false;
            }
		}
	}
}