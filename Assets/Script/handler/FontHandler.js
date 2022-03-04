import SpriteSheet from './SpriteSheet.js';
import AssetsManager from '../module/AssetsManager.js';
export default class FontHandler{
    constructor(name = "main",fontSprites, size) {
        this.name = name;
        this.fontSprites = fontSprites;
        this.size = size;
    }
    print(line, context, x, y,center = false) {
        let contextWidth = context.canvas.width;
        let possiblelinemax = Math.floor(contextWidth / this.size);
        let newx = x;
        if(center){
            let emptycells = possiblelinemax - line.length;
            let cellsbeforeText = Math.floor(emptycells/2);
            newx = x + cellsbeforeText * this.size;
        }
        [...line.toUpperCase()].forEach((char, pos) => {
            if(this.fontSprites){
                this.fontSprites.draw(char, context, newx + pos * this.size, y, false);
            }
        });
    }
    printLines(lines,context, x, y,center = false){
        let contextWidth = context.canvas.width;
        let size = this.size;
        let possiblelinemax = Math.floor(contextWidth / size);
        let currentrow = y;
        [...lines].forEach(line=>{
            let newx = x;
            if(center){
                let emptycells = possiblelinemax - line.length;
                let cellsbeforeText = Math.floor(emptycells/2);
                newx = x + cellsbeforeText * size;
            }
            this.print(line,context,newx,currentrow);
            currentrow = currentrow + this.size * 5/4;
        });
    }
    static async loadFont(name) {
        if(!FontHandler.Handlers){FontHandler.Handlers = {};}
        if(FontHandler.Handlers[name]){
            return FontHandler.Handlers[name];
        }
        let image = null;
        if(GLOBAL.Assets.images[GLOBAL.FONTS[name].img] != null){
            image = GLOBAL.Assets.images[GLOBAL.FONTS[name].img]
        }
        else{
            image = await AssetsManager.loadImage(GLOBAL.FONTS[name].img);
            GLOBAL.Assets.images[GLOBAL.FONTS[name].img] = image;
        }
        console.log(image);
        if(image == undefined){
            console.log("image null, fail to load font "  + name);
            return null;
        }
        const fontSprite = new SpriteSheet(image);
        const size = GLOBAL.FONTS[name].size;
        const rowLen = image.width;
        for (let [index, char] of [...GLOBAL.CHARS].entries()) {
            const x = index * size % rowLen;
            const y = Math.floor(index * size / rowLen) * size;
            fontSprite.define(char, x, y, size, size);
        }
        FontHandler.Handlers[name] = new FontHandler(name,fontSprite, size);
        console.log(FontHandler.Handlers[name] );
        return FontHandler.Handlers[name];
    }
    createTextLayer(text,context) {
        let buffer = document.createElement('canvas');
        buffer.width = context.canvas.width;
        buffer.height = context.canvas.height;
        let ctx = buffer.getContext('2d');
        const size = this.size;
        const textW = text.length;
        const screenW = Math.floor(context.canvas.width / size);
        const screenH = Math.floor(context.canvas.height / size);
        const x = screenW / 2 - textW / 2;
        const y = screenH / 2;
        this.print(text, ctx, x * size, y * size);
        console.log(buffer);
        return buffer;
    }
}