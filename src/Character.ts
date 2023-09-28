import p5 from 'p5';
import { Item } from './Item';

export class Character {
  xPlayer1: number;
  xPlayer2: number;
  img: p5.Image;
  y: number;
  velX: number;
  score:number;

  player: number;
  constructor(p: p5, player: number, y: number, url: string, score: number) {
    this.img = p.loadImage(url);
    this.y = y;
    this.velX = 15;

    this.player = player;
    this.score = score;
    this.xPlayer1 = 1360;
    this.xPlayer2 = 635;
  }

  draw(p: p5) {
    p.imageMode(p.CENTER);
    if (this.player === 1) {
      p.image(this.img, this.xPlayer1, this.y);
    }

    if (this.player === 2) {
      p.push();
      p.scale(-1, 1);
      p.image(this.img, this.xPlayer2 * -1, this.y);
      p.pop();
    }

    if (this.xPlayer1 > 1920) {
      this.xPlayer1 = 0;
    }
    if (this.xPlayer1 < 0) {
      this.xPlayer1 = 1920;
    }

    if (this.xPlayer2 > 1920) {
      this.xPlayer2 = 0;
    }
    if (this.xPlayer2 < 0) {
      this.xPlayer2 = 1920;
    }
  }

  keyPressed(p: p5) {
    if (this.player === 1) {
      if (p.keyIsDown(p.RIGHT_ARROW)) {
        this.xPlayer1 += this.velX;
      }

      if (p.keyIsDown(p.LEFT_ARROW)) {
        this.xPlayer1 -= this.velX;
      }
    }

    if (this.player === 2) {
      if (p.keyIsDown(65)) {
        this.xPlayer2 -= this.velX;
      }

      if (p.keyIsDown(68)) {
        this.xPlayer2 += this.velX;
      }
    }
  }

  catchItem(items:Item[]) {
    if (this.player === 1) {
      items.forEach((item) => {
        if (item.Y > 670 && item.Y < 680
    && item.X > this.xPlayer1 - 80
     && item.X < this.xPlayer1 + 80) {
          switch (item.kind) {
            case 0: case 1: case 2:
              this.score += 20;
              break;
            case 3: case 4:
              this.score -= 20;
              break;
          }
          item.catch(items);
        }
      });
    }

    if (this.player === 2) {
      items.forEach((item) => {
        if (item.Y > 670 && item.Y < 680
    && item.X > this.xPlayer2 - 80
     && item.X < this.xPlayer2 + 80) {
          switch (item.kind) {
            case 0: case 1: case 2:
              this.score += 20;
              break;
            case 3: case 4:
              this.score -= 20;
              break;
          }
          item.catch(items);
        }
      });
    }
  }
}
