import p5 from 'p5';
import {
  Bullet,
} from './Bullets';
import {
  Maddy,
} from './Maddy';

export class Cassie {
  bar: p5.Image;
  gaslightB: p5.Image;
  gunB: p5.Image;
  randomB: p5.Image;
  poseImg: p5.Image;
  atackedImg: p5.Image;
  gaslightImg: p5.Image;
  gunImg: p5.Image;
  xPlayer1: number;
  xPlayer2: number;
  y: number;
  velx: number;

  pose: number;
  player: number;

  health: number;
  damage: number;

  atackedAnimationTime: number;

  glitterBullet: string;
  bullets: Bullet[];

  shield: p5.Image;

  coolDownGaslight: number;
  gaslightTime: number;

  random: p5.Image;

  randomPower: boolean;

  constructor(
    p: p5,
    player: number,
    y: number,
    cassiePose: string,
    cassieAtacked: string,
    cassieGaslight: string,
    cassieGun: string,
    cassieBar: string = '',
    cassieGaslightB: string = '',
    cassieGunB: string = '',
    cassieRandomB: string = '',
    glitterBullet: string = '',

    cassieShield: string,
    randomCassie:string,

  ) {
    this.xPlayer1 = 1360;
    this.xPlayer2 = 635;
    this.y = y;
    this.velx = 0;
    this.poseImg = p.loadImage(cassiePose);
    this.atackedImg = p.loadImage(cassieAtacked);
    this.gaslightImg = p.loadImage(cassieGaslight);
    this.gunImg = p.loadImage(cassieGun);

    this.bar = p.loadImage(cassieBar);
    this.gaslightB = p.loadImage(cassieGaslightB);
    this.gunB = p.loadImage(cassieGunB);
    this.randomB = p.loadImage(cassieRandomB);
    this.shield = p.loadImage(cassieShield);

    this.pose = 0;
    this.player = player;

    this.health = 335;
    this.damage = 0;

    this.atackedAnimationTime = 0;

    this.glitterBullet = glitterBullet;
    this.bullets = [];
    this.coolDownGaslight = 0;
    this.gaslightTime = 0;

    this.random = p.loadImage(randomCassie);
    this.randomPower = false;
  }

  draw(p: p5, maddy: Maddy) {
    switch (this.pose) {
      case 0:
        if (this.player === 1) {
          p.image(this.poseImg, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push();
          p.scale(-1, 1);
          p.image(this.poseImg, this.xPlayer2 * -1, this.y);
          p.pop();
        }

        break;
      case 1:
        if (this.player === 1) {
          p.image(this.atackedImg, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push();
          p.scale(-1, 1);
          p.image(this.atackedImg, this.xPlayer2 * -1, this.y);
          p.pop();
        }

        // if (p.frameCount % 60 === 0) this.atackedAnimationTime++;

        if (this.atackedAnimationTime === 3) this.pose = 0;

        break;

      case 2:
        if (this.player === 1) {
          p.image(this.gaslightImg, this.xPlayer1, this.y);
        }
        if (this.player === 2) {
          p.push();
          p.scale(-1, 1);
          p.image(this.gaslightImg, this.xPlayer2 * -1, this.y);
          p.pop();
        }
        // if (p.frameCount % 60 === 0) this.gaslightTime++;

        if (this.gaslightTime === 3) {
          this.pose = 0;
          this.coolDownGaslight = 0;
          this.gaslightTime = 0;
        }
        break;

      case 3:
        if (this.player === 1) {
          p.image(this.gunImg, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push();
          p.scale(-1, 1);
          p.image(this.gunImg, this.xPlayer2 * -1, this.y);
          p.pop();
        }
        break;

      case 4:
        if (this.player === 1) {
          p.image(this.shield, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push();
          p.scale(-1, 1);
          p.image(this.shield, this.xPlayer2 * -1, this.y);
          p.pop();
        }
        break;
    }

    if (p.frameCount % 60 === 0) {
      this.atackedAnimationTime++;
      this.gaslightTime++;

      if (this.coolDownGaslight < 30) {
        this.coolDownGaslight++;
      }
    }

    this.bullets.forEach((stars) => {
      stars.draw(p);
      if (stars.x < this.bulletTarget() && this.player === 1) {
        maddy.wounded(15);
        this.bullets = [];
      }

      if (stars.x > this.bulletTarget() && this.player === 2) {
        maddy.wounded(15);
        this.bullets = [];
      }
    });

    if (this.pose === 2) {
      maddy.wounded(0.5);
    }

    if (this.player == 2 && p.keyIsDown(88)) {
      this.pose = 4;
    }

    if (this.player == 1 && p.keyIsDown(77)) {
      this.pose = 4;
    }
    if (this.randomPower) {
      p.image(this.random, 960, p.height / 2);
      if (this.random.getCurrentFrame() === this.random.numFrames()) {
        this.random.pause();
      }
      maddy.wounded(1);
      if (this.atackedAnimationTime == 2) {
        this.random.play();
        this.randomPower = false;
      }
    }
  }

  getRealHealth() {
    return this.health - this.damage;
  }

  drawOverTable(p: p5) {
    const gaslightCharging: number = p.map(this.coolDownGaslight, 0, 30, 0, 100);
    switch (this.player) {
      case 1:
        p.fill('#abebef');
        p.rect(1700, 290 + this.damage, 114, this.getRealHealth());
        p.image(this.bar, 1755, 329);
        p.image(this.gunB, 1430, 947);
        p.image(this.gaslightB, 1590, 947);
        p.rect(1542, 1038, gaslightCharging, 20);
        p.image(this.randomB, 1750, 947);

        break;

      case 2:

        p.fill('#abebef');
        p.rect(94, 290 + this.damage, 114, this.getRealHealth());
        p.image(this.bar, 151, 329);
        p.image(this.gunB, 461, 947);
        p.image(this.gaslightB, 308, 947);
        p.rect(248, 1038, gaslightCharging, 20);
        p.image(this.randomB, 151, 947);
        break;
    }
  }

  keyPressed(p: p5) {
    if (this.player === 1) {
      switch (p.keyCode) {
        case p.LEFT_ARROW:
          this.pose = 3;

          break;

        case p.RIGHT_ARROW:
          if (this.coolDownGaslight >= 30) {
            this.gaslightTime = 0;
            this.pose = 2;
          }

          break;

        case p.DOWN_ARROW:
          this.randomPower = true;
          this.atackedAnimationTime = 0;
          break;

        case 77:
          this.pose = 4;
          break;
      }
    }

    if (this.player === 2) {
      switch (p.keyCode) {
        case 65:
          if (this.coolDownGaslight >= 30) {
            this.gaslightTime = 0;
            this.pose = 2;
          }

          break;

        case 68:
          this.pose = 3;

          break;

        case 83:
          this.randomPower = true;
          this.atackedAnimationTime = 0;
          break;
      }
    }

    this.shoot(p);
  }

  wounded(damageAmount: number) {
    if (this.pose !== 4) {
      this.damage += damageAmount;
      this.atackedAnimationTime = 0;
      this.pose = 1;
    }
  }

  shoot(p: p5) {
    if (this.pose === 3 && this.bullets.length === 0) {
      switch (this.player) {
        case 1:
          if (p.keyCode === p.UP_ARROW) {
            this.bullets.push(new Bullet(p, this.player, this.glitterBullet, this.xPlayer1, 496));
          }
          break;

        case 2:
          if (p.keyCode === 87) {
            this.bullets.push(new Bullet(p, this.player, this.glitterBullet, this.xPlayer2, 496));
          }
          break;
      }
    }
  }

  bulletTarget() {
    if (this.player === 1) return 725;
    return 1335;
  }

  keyReleased(p:p5) {
    if (this.player === 1 && p.keyCode === 77) {
      this.pose = 0;
    }
    if (this.player === 2 && p.keyCode === 88) {
      this.pose = 0;
    }
  }
}
