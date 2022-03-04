import Point from "../module/Point.js";
export default class Rock extends Point{
    constructor(that){
        super(that.center.x,that.center.y);
        this.that = that;
        this.that.shots.push(this);
    }
    draw(ctx){
        super.drawCircle(ctx,4,"red");
    }
    update(time){
        if(this.that.type == "CAT"){
            super.move( DIRECTION.UP,4);
        }
        else if(this.that.type == "DOG"){
            super.move( DIRECTION.DOWN,4);
        }
    }
}