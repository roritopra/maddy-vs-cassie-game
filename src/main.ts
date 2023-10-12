/* eslint-disable no-param-reassign */
import './style.css';
import p5 from 'p5';
import {
  Level,
} from './Level';
import {
  SecondLevel,
} from './SecondLevel';
import {
  Screen,
} from './Screen';
import { finalcreen } from './finalScreen';

let level1: Level|null;
let level2: SecondLevel;
let level3: Level;
let choose: Screen;
let imgStart: p5.Image;
let endScreen: finalcreen;

let screen: number;
let player1Choice: string = '';
const score = {
  player1: 0, player2: 0,
};

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(1920, 1080);

    imgStart = p.loadImage('/chooseCharacter/start.png');

    choose = new Screen(
      p,
      '/chooseCharacter/choosingCharacter.png',
    );

    screen = 0;
    p.frameRate(60);
  };

  p.draw = () => {
    p.background(80);

    switch (screen) {
      case 0:
        p.imageMode(p.CENTER);
        p.image(imgStart, 960, 540);
        break;
      case 1:
        level1?.draw(p);
        if (level1?.gameOver) {
          p.frameRate(60);
          createLevel2();
          screen = 2;
        }

        break;

      case 2:

        level2.draw(p);
        level1 = null;
        if (level2.gameOver) {
          createLevel3();
          screen = 3;
        }
        break;

      case 3:
        level3.draw(p);
        if (level3.gameOver) {
          createFinalScreen();
          screen = 5;
        }
        break;

      case 4:
        choose.draw(p);
        if (player1Choice != '') {
          createLevel1();
          screen = 1;
        }
        break;

      case 5:
        endScreen.draw(p);
    }
  };

  p.keyPressed = () => {
    switch (screen) {
      case 1:
        level1?.keyPressed(p);
        break;

      case 2:
        level2.keypressed(p);
        console.log(p.frameRate());

      case 3:
        level3.keyPressed(p);
        break;
    }
  };
  p.mouseClicked = () => {
    console.log(p.mouseX, p.mouseY);
    if (screen === 4) {
      player1Choice = choose.mouseClick(p);
    }

    if (screen === 0) {
      if (p.dist(p.mouseX, p.mouseY, 960, 735) < 100) {
        screen = 4;
      }
    }
  };

  p.keyReleased = () => {
    switch (screen) {
      case 1:
        level1?.keyReleased(p);
        break;

      case 3:
        level3.keyReleased(p);
        break;
    }
  };

  const createLevel1 = () => {
    level1 = new Level(
      p,
      score,
      player1Choice,
      '/level1/overBg.png',
      '/level1/bg1.png',
      '/level1/maddypose.png',
      '/level1/maddyescala.gif',
      '/level1/maddylipstickGun.png',
      '/level1/maddywhip.png',
      '/level1/cassiepose.png',
      '/level1/cassieEscala.gif',
      '/level1/cassieGaslight.gif',
      '/level1/cassieGlitterGun.png',
      '/level1/MaddyBar.png',
      '/level1/lipstickSquarecopia.png',
      '/level1/whipsquarecopia.png',
      '/level1/randomsquarecopia.png',
      '/level1/cassieBar.png',
      '/level1/GaslightSquareCopia.png',
      '/level1/GLITTERSquareCopia.png',
      '/level1/random2squarecopia.png',
      '/level1/lipstick.png',
      '/level1/sparks.gif',
      '/level1/maddyshield.png',
      '/level1/cassieshield.png',
      '/level1/lipstickGif.gif',
      '/chooseCharacter/MENUBoton.png',
      '/chooseCharacter/menu.png',
      '/level1/Precomp.gif',

    );
  };

  const createLevel3 = () => {
    level3 = new Level(
      p,
      score,
      player1Choice,
      ' ',
      '/level3/bg3.png',
      '/level3/maddy3.png',
      '/level3/maddyAtacked3.gif',
      '/level3/maddyLipstick3.png',
      '/level3/maddyWhip3.gif',
      '/level3/cassie3.png',
      '/level3/cassieAtacked3.gif',
      '/level3/cassieGaslight3.gif',
      '/level3/cassiGun3.png',
      '/level1/MaddyBar.png',
      '/level1/lipstickSquarecopia.png',
      '/level1/whipsquarecopia.png',
      '/level1/randomsquarecopia.png',
      '/level1/cassieBar.png',
      '/level1/GaslightSquareCopia.png',
      '/level1/GLITTERSquareCopia.png',
      '/level1/random2squarecopia.png',
      '/level1/lipstick.png',
      '/level1/sparks.gif',
      '/level3/maddyShield3.png',
      '/level3/cassieShield3.png',
      '/level1/cdGif.gif',
      '/chooseCharacter/MENUBoton.png',
      '/chooseCharacter/menu.png',
      '/level3/nategif.gif',

    );
  };
  const createLevel2 = () => {
    level2 = new SecondLevel(
      p,
      player1Choice,
      '/level2/bg2.png',
      '/level2/maddybag.png',
      '/level2/cassiebag.png',
      score,
    );
  };

  const createFinalScreen = () => {
    endScreen = new finalcreen(
      p,
      player1Choice,
      '/chooseCharacter/end.png',
      score,
    );
  };
};
// eslint-disable-next-line new-cap
export default new p5(sketch);
