//abstract class to inherit game from
import Timer from "./Timer.js";
export default class GameBase{
    constructor(canvas){
        const canvas_container = document.querySelector(canvas.CONTAINER);
        canvas_container.innerHTML = "";
        this.canvas = document.createElement('canvas');
        canvas_container.appendChild(this.canvas);
        this.canvas.width = canvas.WIDTH;
        this.canvas.height = canvas.HEIGHT;
        this.ctx = this.canvas.getContext('2d');
        this.Timer = new Timer(GLOBAL.FRAMERATE, this, false);
        this.framesPassedTillNow = 0;
        this.time = 0;
        window.ctx = this.ctx; 
    }
    update(time){
        //things to do in basic main
        this.framesPassedTillNow++;
        this.time = time;
        this.timeHMS = this.timeInHourFormat(time);
    }
    timeInHourFormat(seconds){
        let minutes     = Math.floor(seconds / 60);
        let hours       = Math.floor(minutes / 60);
        minutes         = Math.floor(minutes % 60);
        seconds         = Math.floor(seconds % 60);
        return `${hours < 10 ? '0' : ''}${hours}:`+
        `${minutes < 10 ? '0' : ''}${minutes}:`+
        `${seconds < 10 ? '0' : ''}${seconds}`;
    }
    resetCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    }
    stop(){
        this.Timer.stop();
    }
}