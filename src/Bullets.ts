import p5 from "p5";

export class Bullet{

    pic: p5.Image;
    x:number;
    y:number;
    velX: number;
    player: number;
    constructor(p:p5,player:number, url:string, x:number, y:number){

        this.player= player;
        this.pic= p.loadImage(url);
        this.x= x;
        this.y=y;
        this.velX=25;


    }

    draw(p:p5){
        switch(this.player){
            case 1: 
            this.x= this.x -this.velX;
            p.image(this.pic, this.x, this.y);
            break;

            case 2:
                this.x= this.x +this.velX;
                p.push();
                p.scale(-1,1);
                p.image(this.pic, this.x*-1,this.y);
                p.pop();    
        }
    }

  
}