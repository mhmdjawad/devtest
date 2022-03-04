import Point from "../module/Point.js";
import Rectangle from '../module/Rectangle.js';
import Rock from './rock.js';
const PLAYER_TYPES = {
    CAT : "CAT",
    DOG : "DOG"
}
export default class Player extends Rectangle{
    constructor(){
        super();
        this.width = this.height = 32;
        this.life = 100;
        this.level = 1;
        this.center = this.destination = this.latestDestination = new Point(0,0);
        this.shots = [];
    }
    static makePlayer(type){
        switch(type){
            case PLAYER_TYPES.CAT: return new Cat;
            case PLAYER_TYPES.DOG: return new Dog;
            default: return null;
        }
    }
    setPosition(point){
        this.center = this.destination = this.latestDestination = point;
    }
    draw(ctx){
        super.draw(ctx);
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
    }
    update(time){
        this.shots = this.shots.filter(s => s.y >= 0 && s.y <= GLOBAL.CANVAS_HEIGHT && s.life > 0);
        [...this.shots].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
    }
    fire(){
        if(this.shots.length > 3) return;
        let rock = new Rock(this);
    }
    moveleft(){
        this.destination.move(DIRECTION.LEFT,32);
        if(this.destination.x <= 16){
            this.destination.x = 16;
        }
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - 16){
            this.destination.x = GLOBAL.CANVAS_WIDTH - 16;
        }
    }
    moveright(){
        this.destination.move(DIRECTION.RIGHT,32);
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - 16){
            this.destination.x = GLOBAL.CANVAS_WIDTH - 16;
        }
        if(this.destination.x >= GLOBAL.CANVAS_WIDTH - 16){
            this.destination.x = GLOBAL.CANVAS_WIDTH - 16;
        }
    }
    randomActions(){
        if(Math.random() > 0.8){
            this.moveleft();
        }
        if(Math.random() > 0.8){
            this.moveright();
        }
        if(Math.random() > 0.8){
            this.fire();
        }
    }
}
Player.PLAYER_TYPES = PLAYER_TYPES;
class Cat extends Player{
    constructor(){
        super();
        this.type = PLAYER_TYPES.CAT;
        this.fill = "yellow";
    }
}
class Dog extends Player{
    constructor(){
        super();
        this.type = PLAYER_TYPES.DOG;
        this.fill = "brown";
    }
    
}