import p5 from "p5";

export class SecondCassie {
    img: p5.Image;
    x: number;
    y: number;
    velX: number;
  
    player: number;
    constructor(p: p5, player: number, x: number, y: number, url: string) {
      this.img = p.loadImage(url);
      this.x = x;
      this.y = y;
      this.velX = 50
  
      this.player = player;
    }
  
    draw(p: p5) {
      if (this.player === 1) {
        p.image(this.img, this.x, this.y);
        
      }
  
      if (this.player === 2) {
        p.push()
        p.scale(-1, 1)
        p.image(this.img, this.x * -1, this.y)
        p.pop()
      }
      if (this.x > 1920) {
        this.x = 0;
    }
    if (this.x < 0) {
        this.x = 1920;
    }
    }
  
    keyPressed(p: p5) {
  
      if (this.player === 1) {
        switch (p.keyCode) {
          case p.RIGHT_ARROW:
            this.x = this.x + this.velX
  
            break;
  
          case p.LEFT_ARROW:
            this.x = this.x - this.velX
  
            break;
  
        }
      }
  
      if (this.player === 2) {
  
        switch (p.keyCode) {
          case 65:
            this.x = this.x - this.velX
  
            break;
  
          case 68:
            this.x = this.x + this.velX
            break;
        }
      }
    }
  }