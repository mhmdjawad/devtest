import KeyboardAndMouse     from '../handler/KeyboardAndMouse.js'
import FontHandler          from '../handler/FontHandler.js';
import MenuItem             from '../module/MenuItem.js';
export default class MainMenuScene{
	constructor(sceneManager){
		window.scene = this;
		this.sceneManager = sceneManager;
		this.sceneManager.eventManager.addSubscriber(this,[
			KeyboardAndMouse.Event.TOUCH,
			KeyboardAndMouse.Event.CLICK,
			KeyboardAndMouse.Event.MOUSEDOWN,
			KeyboardAndMouse.Event.KEYDOWN
		]);
		this.y = Math.floor(this.sceneManager._main.canvas.height);
		this._speed = 5;
		this.arrived = false;
		// this.FontHandler = FontHandler.Handlers[GLOBAL.FONTS.black16.name];
		this.FontHandler = FontHandler.Handlers[GLOBAL.FONTS.white16.name];
		let menuXY = {
			x : GLOBAL.TILESIZE * 5,
			y : GLOBAL.TILESIZE * 15,
			h : this.FontHandler.size + GLOBAL.TILESIZE,
			r : 0
        };
        let self = this;
		this.menuItems = [
			new MenuItem(this,"HOW TO PLAY"	, menuXY.x, menuXY.y + menuXY.h * menuXY.r++, function(){
				alert("move to new game with arrow, and press enter :)");
            }),
			new MenuItem(this,"New Game"		, menuXY.x + GLOBAL.TILESIZE * 2, menuXY.y + menuXY.h * menuXY.r++, function(){
				// alert("new game");
				self.sceneManager.toGame();
			}),
		];
		this.menuItemSelected = 0;
		this.menuItemSelected = this.menuItemSelected % this.menuItems.length
		this.copyright = this.getCopyright();
		this.buffer = this.getBuffer();
		this.Objects = [];
		this.started = false;
		this.board = {
			w : GLOBAL.CANVAS_WIDTH,
			h : GLOBAL.CANVAS_HEIGHT,
		};
		// this.y=0;
	}
	async start(){
		if(this.started == true) return;
		this.started = true;
	}
	update(time) {
		if(!this.arrived){
			if(this.y > 0){
				this.y -= this._speed;
			} else {
				this.arrived = true;
				this.y = 0;
			}
		}
		if(this.arrived){
			this.start();
		}
		[...this.Objects].forEach(obj=>{
			if(obj.update) obj.update(time);
		});
	}
	notify(e){
		let clientX,clientY;
		clientX = clientY = Infinity;
		let event = e.event;
		if(e.name == KeyboardAndMouse.Event.KEYDOWN || e.name == KeyboardAndMouse.Event.KEYPRESS){
			this.keydown(e.event);
		}
		else{
			console.log(e);		///but we are only listning to click and touch
		}
        this.y = 0;
        this.buffer = this.getBuffer();
	}
	keydown(key){
		if(key.which) key = key.which;
		let speed = 5;
		if(key == KeyboardAndMouse.key.UP){
			this.menuItemSelected--;
			if(this.menuItemSelected < 0) this.menuItemSelected = this.menuItems.length-1;
		}
		else if(key == KeyboardAndMouse.key.DOWN){
			this.menuItemSelected++;
		}
		else if(key == KeyboardAndMouse.key.X || key == KeyboardAndMouse.key.ENTER){
			setTimeout(this.menuItems[this.menuItemSelected].activate,500);
		}
		this.menuItemSelected = this.menuItemSelected % this.menuItems.length;
	}
	getBuffer(){
		let buffer = document.createElement('canvas');
		buffer.width = GLOBAL.CANVAS_WIDTH;
		buffer.height = GLOBAL.CANVAS_HEIGHT;
		let context = buffer.getContext('2d');
		
		
		[...this.menuItems].forEach(item=>{
			if(item == this.menuItems[this.menuItemSelected]){
				item.selected = true;
			}
			else{
				item.selected = false;
			}
			item.draw(context);
		});
		this.drawIntroImage(context);
		this.drawCopyRights(context);
		this.drawLogo(context);
		return buffer;
	}
	drawCopyRights(context){
		let cr = {
            c : this.copyright,
            w : this.copyright.width,
            h : this.copyright.height
        };
        cr.x = context.canvas.width/2 - cr.w/2;
        cr.y = context.canvas.height - cr.h * 2;
		context.drawImage(cr.c,cr.x,cr.y,cr.w,cr.h);
	}
	drawLogo(context){
		let img = GLOBAL.Assets.images[GLOBAL.IMAGES.LOGO];
		if(img){
			let x = GLOBAL.CANVAS_WIDTH - img.width;
            context.drawImage(img,
                x,
                GLOBAL.CANVAS_HEIGHT - img.height - GLOBAL.TILESIZE*6,
                img.width,
                img.height
            );
		}
	}
	draw(ctx) {
		ctx.clearRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0,GLOBAL.CANVAS_WIDTH,GLOBAL.CANVAS_HEIGHT);
		let buffer = this.buffer;
		ctx.drawImage(buffer,0,this.y,buffer.width,buffer.height);
		[...this.Objects].forEach(obj=>{
			if(obj.draw) obj.draw(ctx);
		});
	}
	drawIntroImage(context){
		let intro_img = GLOBAL.Assets.images[GLOBAL.IMAGES.INTRO];
        if(intro_img){
            let x = GLOBAL.CANVAS_WIDTH/2 - intro_img.width/2;
            context.drawImage(intro_img,
                x,
                GLOBAL.TILESIZE*2,
                intro_img.width,
                intro_img.height
            );
        }
        else{
			var FontHandlerB = FontHandler.Handlers[GLOBAL.FONTS.black16.name];
            this.FontHandler.printLines([
            	'CATS VS DOGS',
            	'BATTLE'
            ],context,0,80,true);
			FontHandlerB.printLines([
            	'CATS VS DOGS',
            	'BATTLE'
            ],context,2,82,true);
			this.FontHandler.printLines([
            	'CATS VS DOGS',
            	'BATTLE'
            ],context,3,83,true);
		}
	}
    getCopyright(){
        let text = 'BY: MJZ';
        let buffer = document.createElement('canvas');
        buffer.width = text.length * this.FontHandler.size;
        buffer.height = this.FontHandler.size;
        let context = buffer.getContext('2d');
        this.FontHandler.print(text, context, 0, 0, false);
        return buffer;
    }
	getTitle(){
        let text = 'BY: MJZ';
        let buffer = document.createElement('canvas');
        buffer.width = text.length * this.FontHandler.size;
        buffer.height = this.FontHandler.size;
        let context = buffer.getContext('2d');
        this.FontHandler.print(text, context, 0, 0, false);
        return buffer;
    }
}