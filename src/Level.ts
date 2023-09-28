import p5 from 'p5';
import {
  Cassie,
} from './Cassie';
import {
  Maddy,
} from './Maddy';

export class Level {
  player1Choice: string;
  background: p5.Image;
  overBg: p5.Image;

  maddy: Maddy;
  maddyPose: string;
  maddyAtacked: string;
  maddyLipstick: string;
  maddyWhip: string;

  maddyLifeBar: string;
  maddyLipstickB: string;
  maddyWhipB: string;
  maddyRandomB: string;

  cassie: Cassie;
  cassiePose: string;
  cassieAtacked: string;
  cassieGaslight: string;
  cassieGun: string;

  cassieBar: string;
  cassieGaslightB: string;
  cassieGunB: string;
  cassieRandomB: string;

  maddyBullets: string;
  cassieBullet: string;

  cassieShield: string;
  maddyShield: string;

  gameOver: boolean;
  maddyRandom: string;
  cassieRandom: string;
  menuButton: p5.Image;
  menu: p5.Image;
  score: {
    player1: number,
    player2: number
  };

  constructor(
    p: p5,
    score: {
      player1: number,
      player2: number
    },
    player1Choice: string,
    overBackground: string = ' ',
    bg: string,
    maddyPose: string,
    maddyAtacked: string,
    maddyLipstick: string,
    maddyWhip: string,
    cassiePose: string,
    cassieAtacked: string,
    cassieGaslight: string,
    cassieGun: string,
    maddyLifeBar: string = '',
    maddyLipstickB: string = '',
    maddyWhipB: string = '',
    maddyRandomB: string = '',

    cassieBar: string = '',
    cassieGaslightB: string = '',
    cassieGunB: string = '',
    cassieRandomB: string = '',

    maddyBullets: string,
    cassieBullet: string,

    maddyShield: string,
    cassieShield: string,
    maddyRandom: string,
    menuBUrl: string,
    menu: string,
    cassieRandom: string,
  ) {
    this.background = p.loadImage(bg);
    this.overBg = p.loadImage(overBackground);
    this.maddyPose = maddyPose;
    this.maddyAtacked = maddyAtacked;
    this.maddyLipstick = maddyLipstick;
    this.maddyWhip = maddyWhip;
    this.cassiePose = cassiePose;
    this.cassieAtacked = cassieAtacked;
    this.cassieGaslight = cassieGaslight;
    this.cassieGun = cassieGun;
    this.cassieShield = cassieShield;
    this.maddyShield = maddyShield;
    this.maddyBullets = maddyBullets;
    this.cassieBullet = cassieBullet;

    this.maddyLifeBar = maddyLifeBar;
    this.maddyLipstickB = maddyLipstickB;
    this.maddyWhipB = maddyWhipB;
    this.maddyRandomB = maddyRandomB;
    this.cassieRandom = cassieRandom;

    this.cassieBar = cassieBar;
    this.cassieGaslightB = cassieGaslightB;
    this.cassieGunB = cassieGunB;
    this.cassieRandomB = cassieRandomB;
    this.player1Choice = player1Choice;

    this.gameOver = false;

    this.maddyRandom = maddyRandom;

    this.menuButton = p.loadImage(menuBUrl);
    this.menu = p.loadImage(menu);
    this.score = score;

    this.maddy = new Maddy(
      p,
      this.player1Choice === 'maddy' ? 1 : 2,
      950,
      maddyPose,
      maddyAtacked,
      maddyLipstick,
      maddyWhip,
      maddyLifeBar,
      maddyLipstickB,
      maddyWhipB,
      maddyRandomB,
      maddyBullets,
      maddyShield,
      maddyRandom,
    );

    this.cassie = new Cassie(
      p,
      this.player1Choice === 'cassie' ? 1 : 2,
      950,
      cassiePose,
      cassieAtacked,
      cassieGaslight,
      cassieGun,
      cassieBar,
      cassieGaslightB,
      cassieGunB,
      cassieRandomB,
      cassieBullet,
      cassieShield,
      cassieRandom,
    );
  }

  draw(p: p5) {
    p.imageMode(p.CENTER);
    p.image(this.background, 960, 540);

    this.maddy.draw(p, this.cassie);
    this.cassie.draw(p, this.maddy);

    p.image(this.overBg, 960, 540);
    this.maddy.drawOverTable(p);
    this.cassie.drawOverTable(p);
    p.textSize(45);
    p.fill(255);
    p.text('Player 1', 1360, 60);
    p.text('Player 2', 515, 60);
    p.image(this.menuButton, p.width / 2, 980);

    if (p.mouseIsPressed) {
      if (p.dist(p.mouseX, p.mouseY, p.width / 2, 980)) {
        p.image(this.menu, 960, 540);
      }
    }

    if (this.cassie.getRealHealth() <= 0) {
      if (this.maddy.player === 1) {
        this.score.player1 += 100;
      } else {
        this.score.player2 += 100;
      }

      this.gameOver = true;
    }

    if (this.maddy.getRealHealth() <= 0) {
      if (this.cassie.player === 1) {
        this.score.player1 += 100;
      } else {
        this.score.player2 += 100;
      }
      this.gameOver = true;
    }
  }

  keyPressed(p: p5) {
    this.maddy.keyPressed(p);
    this.cassie.keyPressed(p);
  }

  keyReleased(p: p5) {
    this.cassie.keyReleased(p);
    this.maddy.keyReleased(p);
  }
}
