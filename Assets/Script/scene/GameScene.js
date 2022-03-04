import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js'
import Player               from '../entity/player.js';
import Point from '../module/Point.js';
import Rectangle from '../module/Rectangle.js';
export default class GameScene{
    constructor(sceneManager){
        this.level = 0;
        this.difficulity = 0;
        window.scene = this;
        this.sceneManager = sceneManager;
        this.sceneManager.eventManager.addSubscriber(this,[
			KeyboardAndMouse.Event.TOUCH,
			KeyboardAndMouse.Event.CLICK,
			KeyboardAndMouse.Event.MOUSEDOWN,
			KeyboardAndMouse.Event.KEYDOWN
		]);
        this.cat = Player.makePlayer(Player.PLAYER_TYPES.CAT);
        this.dog = Player.makePlayer(Player.PLAYER_TYPES.DOG);
        
        
        this.separators = [];

        this.cat.setPosition(new Point(
            32*2,
            GLOBAL.CANVAS_HEIGHT-32
        ));

        this.dog.setPosition(new Point(
            GLOBAL.CANVAS_WIDTH - 32*2,
            32
        ));
        this.Objects = [
            this.cat,
            this.dog,
        ];
    }
    update(time) {
        this.dog.randomActions();
        this.cat.update(time);
        this.dog.update(time);
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
	}
	keydown(key){
		if(key.which) key = key.which;
		if(key == KeyboardAndMouse.key.LEFT){
            // console.log("left");
            this.cat.destination.move(DIRECTION.LEFT,32);
        }
        else if(key == KeyboardAndMouse.key.RIGHT){
            // console.log("right");
            this.cat.destination.move(DIRECTION.RIGHT,32);
        }
        else if(key == KeyboardAndMouse.key.SPACE){
            // console.log("space");
            this.cat.fire();
        }
		else if(key == KeyboardAndMouse.key.X || key == KeyboardAndMouse.key.ENTER){
            console.log("enter");
		}
	}
}