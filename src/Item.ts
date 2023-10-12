import p5 from 'p5';

export class Item {
  cdUrl: string;
  cd: p5.Image;
  nail: p5.Image;
  nailUrl: string;
  lipstick: p5.Image;
  lipstickUrl: string;
  sock: p5.Image;
  sockUrl: string;
  condom: p5.Image;
  condomUrl: string;
  kind: number;
  X: number;
  Y: number;
  velY: number;

  constructor(p:p5) {
    this.cdUrl = '/level2/cd.png';
    this.nailUrl = '/level2/nailposlish.png';
    this.lipstickUrl = '/level2/lipstick.png';
    this.sockUrl = '/level2/sock.png';
    this.condomUrl = '/level2/condom.png';
    this.cd = p.loadImage(this.cdUrl);
    this.nail = p.loadImage(this.nailUrl);
    this.lipstick = p.loadImage(this.lipstickUrl);
    this.sock = p.loadImage(this.sockUrl);
    this.condom = p.loadImage(this.condomUrl);
    this.kind = p.floor(p.random(0, 5));
    this.X = p.random(50, 1900);
    this.Y = 0;
    this.velY = 5;
  }

  draw(p:p5) {
    this.Y += this.velY;
    switch (this.kind) {
      case 0:
        p.image(this.cd, this.X, this.Y);
        break;
      case 1:
        p.image(this.nail, this.X, this.Y);
        break;
      case 2:
        p.image(this.lipstick, this.X, this.Y);
        break;
      case 3:
        p.image(this.sock, this.X, this.Y);
        break;
      case 4:
        p.image(this.condom, this.X, this.Y);
        break;
    }
  }

  deleteSelf(items:Item[]) {
    if (this.Y >= 1080) {
      items.splice(items.indexOf(this), 1);
    }
  }

  catch(items:Item[]) {
    items.splice(items.indexOf(this), 1);
  }
}
