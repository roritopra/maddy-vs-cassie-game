import p5 from "p5";
import {
  Bullet
} from "./Bullets";
import { Cassie } from "./Cassie";


export class Maddy {
  bar: p5.Image;
  lipstickButton: p5.Image;
  whipButton: p5.Image;
  randomButton: p5.Image;
  poseImg: p5.Image;
  atackedImg: p5.Image;
  lipstickImg: p5.Image;
  whipImg: p5.Image;
  xPlayer1: number;
  xPlayer2: number;
  y: number;
  velx: number;

  pose: number;
  player: number;

  health: number;
  damage: number;

  lipstickBullet: string;
  bullets: Bullet[];
  atackedAnimationTime: number;

  shield: p5.Image;

  random : p5.Image;

  randomPower: boolean;

  coolDownWhip: number;
  whipTime: number;




  constructor(
    p: p5,
    player: number,
    y: number,
    maddyPose: string,
    maddyAtacked: string,
    maddyLipstick: string,
    maddyWhip: string,
    maddyLifeBar: string = "",
    maddyLipstickB: string = "",
    maddyWhipB: string = "",
    maddyRandomB: string = "",
    
    lipstickBullet: string,
    
    maddyShield: string,
    
    maddyRandom:string,


  ) {
    this.xPlayer1 = 1360;
    this.xPlayer2=635;
    this.y = y;
    this.velx = 0
    this.poseImg = p.loadImage(maddyPose);
    this.atackedImg = p.loadImage(maddyAtacked);
    this.lipstickImg = p.loadImage(maddyLipstick);
    this.whipImg = p.loadImage(maddyWhip);
    this.bar = p.loadImage(maddyLifeBar);
    this.lipstickButton = p.loadImage(maddyLipstickB);
    this.whipButton = p.loadImage(maddyWhipB);
    this.randomButton = p.loadImage(maddyRandomB);
    this.shield = p.loadImage(maddyShield);
    this.random = p.loadImage(maddyRandom);





    this.health = 335;
    this.damage = 0;

    this.pose = 0;
    this.player = player;

    this.lipstickBullet = lipstickBullet;
    this.bullets = [];



    this.atackedAnimationTime = 0;
    this.randomPower= false;

    this.coolDownWhip = 0;
    this.whipTime = 0;


  }

  draw(p: p5, cassie: Cassie) {

    switch (this.pose) {
      case 0:
        if (this.player === 1) {
          p.image(this.poseImg, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push()
          p.scale(-1, 1)
          p.image(this.poseImg, this.xPlayer2 * -1, this.y)
          p.pop()
        }

        break;
      case 1:
        if (this.player === 1) {
          p.image(this.atackedImg, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push()
          p.scale(-1, 1)
          p.image(this.atackedImg, this.xPlayer2 * -1, this.y)
          p.pop()
        }

        if (p.frameCount % 60 === 0) this.atackedAnimationTime++;

        if (this.atackedAnimationTime === 3) this.pose = 0;

        break;

      case 2:
        if (this.player === 1) {
          p.image(this.lipstickImg, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push()
          p.scale(-1, 1)
          p.image(this.lipstickImg, this.xPlayer2 * -1, this.y)
          p.pop()
        }



        break;

      case 3:
        if (this.player === 1) {
          p.image(this.whipImg, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push()
          p.scale(-1, 1)
          p.image(this.whipImg, this.xPlayer2 * -1, this.y)
          p.pop()
        }
        if (this.whipTime === 3) {
          this.pose = 0;
          this.coolDownWhip = 0;
          this.whipTime = 0;
        }
        break;

      case 4:
        if (this.player === 1) {
          p.image(this.shield, this.xPlayer1, this.y);
        }

        if (this.player === 2) {
          p.push()
          p.scale(-1, 1)
          p.image(this.shield, this.xPlayer2 * -1, this.y)
          p.pop()
        }
        break;

        

    }
    if (p.frameCount % 60 === 0) {
      this.atackedAnimationTime++;
      this.whipTime++;

    if (this.coolDownWhip < 30) {
      this.coolDownWhip++

    }
    
  };

    

    this.bullets.forEach(lipstick => {
      lipstick.draw(p);
      if (lipstick.x < this.bulletTarget() && this.player === 1) {
       cassie.wounded(15);
        this.bullets = [];
      }

      if (lipstick.x > this.bulletTarget() && this.player === 2) {
       cassie.wounded(15);
        this.bullets = [];
      }
    })
     if(this.pose===3){
         cassie.wounded(0.5);
     }

     if(this.player==2 && p.keyIsDown(88)){
        this.pose=4;
    }

    if(this.player==1 && p.keyIsDown(77)){
        this.pose=4;
    }

    if(this.randomPower){
      p.image(this.random,960,p.height/2)
      if(this.random.getCurrentFrame()===this.random.numFrames()){
        this.random.pause()
      }
      cassie.wounded(1);
      if(this.atackedAnimationTime==2){
        this.random.play()
        this.randomPower=false;
      }
    }

    
  }
getRealHealth(){
  return this.health - this.damage
}
  drawOverTable(p: p5) {

    let whipCharging: number = p.map(this.coolDownWhip, 0, 30, 0, 100);
    switch (this.player) {

      case 1:
        
        p.fill("#b388da")
        p.rect(1700, 290 + this.damage, 114, this.getRealHealth());
        p.image(this.bar, 1755, 329);
        p.image(this.lipstickButton, 1430, 947);
        p.image(this.whipButton, 1590, 947);
        p.rect(1542,1038,whipCharging,20);
        p.image(this.randomButton, 1750, 947);
        break;

      case 2:
        p.fill("#b388da")
        p.rect(94, 290 + this.damage, 114,  this.getRealHealth());
        p.image(this.bar, 151, 329);
        p.image(this.lipstickButton, 461, 947);
        p.image(this.whipButton, 308, 947);
        p.rect(248, 1038, whipCharging, 20);
        p.image(this.randomButton, 151, 947);
        break;
    }
  }

  keyPressed(p: p5) {
    if (this.player === 1) {
      switch (p.keyCode) {
        case p.LEFT_ARROW:
          this.pose = 2

          break;

        case p.RIGHT_ARROW:
          if (this.coolDownWhip >= 30) {
            this.whipTime=0;
          this.pose = 3;
          }

          break;

          case p.DOWN_ARROW:
            this.randomPower=true;
            this.atackedAnimationTime=0;

      }
    }

    if (this.player === 2) {
      switch (p.keyCode) {
        case 65:
          if (this.coolDownWhip >= 30) {
            this.whipTime=0;
          this.pose = 3;
          }

          break;

        case 68:
          this.pose = 2;

          break;

          case 83:
            this.randomPower=true;
            this.atackedAnimationTime=0;

      }

    }


    this.shoot(p);
  }

  shoot(p: p5) {

    if (this.pose === 2 && this.bullets.length === 0) {
      switch (this.player) {

        case 1:
          if (p.keyCode === p.UP_ARROW) {
            this.bullets.push(new Bullet(p, this.player, this.lipstickBullet, this.xPlayer1, 542))
          }
          break;

        case 2:
          if (p.keyCode === 87) {
            this.bullets.push(new Bullet(p, this.player, this.lipstickBullet, this.xPlayer2, 542))
            
          }
          break;
      }
    }
  }

  bulletTarget() {
    if (this.player === 1) return 725;
    else return 1335;

  }

  wounded(damageAmount:number) {
      if(this.pose!==4){
    this.damage = this.damage + damageAmount;
    this.pose = 1;
    this.atackedAnimationTime = 0;
      }
  }
  keyReleased(p:p5){
    if(this.player===1 && p.keyCode===77){
        this.pose=0
    }
    if(this.player===2 && p.keyCode===88){
        this.pose=0
    }
  }
}
