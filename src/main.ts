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

    imgStart = p.loadImage('/src/assets/choose Character/start.png');

    choose = new Screen(
      p,
      '/src/assets/choose Character/choosing character.png',
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
      '/src/assets/level 1/overBg.png',
      '/src/assets/level 1/bg1.png',
      '/src/assets/level 1/maddypose.png',
      '/src/assets/level 1/maddy escala.gif',
      '/src/assets/level 1/maddylipstickGun.png',
      '/src/assets/level 1/maddy whip.png',
      '/src/assets/level 1/cassie pose.png',
      '/src/assets/level 1/Cassie escala.gif',
      '/src/assets/level 1/Cassie gaslight.gif',
      '/src/assets/level 1/cassieGlitterGun.png',
      '/src/assets/level 1/Maddy Bar.png',
      '/src/assets/level 1/lipstickSquare copia.png',
      '/src/assets/level 1/whipsquare copia.png',
      '/src/assets/level 1/random square copia.png',
      '/src/assets/level 1/Cassie Bar.png',
      '/src/assets/level 1/Gaslight Square copia.png',
      '/src/assets/level 1/GLITTER Square copia.png',
      '/src/assets/level 1/random 2 square copia.png',
      '/src/assets/level 1/lipstick.png',
      '/src/assets/level 1/sparks.gif',
      '/src/assets/level 1/maddy shield.png',
      '/src/assets/level 1/cassie shield.png',
      '/src/assets/level 1/lipstickGif.gif',
      '/src/assets/choose Character/MENUBoton.png',
      '/src/assets/choose Character/menu.png',
      '/src/assets/level 1/Precomp.gif',

    );
  };

  const createLevel3 = () => {
    level3 = new Level(
      p,
      score,
      player1Choice,
      ' ',
      '/src/assets/level 3/bg 3.png',
      '/src/assets/level 3/maddy3.png',
      '/src/assets/level 3/maddyAtacked3.gif',
      '/src/assets/level 3/maddyLipstick3.png',
      '/src/assets/level 3/maddyWhip3.gif',
      '/src/assets/level 3/cassie3.png',
      '/src/assets/level 3/cassieAtacked3.gif',
      '/src/assets/level 3/cassieGaslight3.gif',
      '/src/assets/level 3/cassiGun3.png',
      '/src/assets/level 1/Maddy Bar.png',
      '/src/assets/level 1/lipstickSquare copia.png',
      '/src/assets/level 1/whipsquare copia.png',
      '/src/assets/level 1/random square copia.png',
      '/src/assets/level 1/Cassie Bar.png',
      '/src/assets/level 1/Gaslight Square copia.png',
      '/src/assets/level 1/GLITTER Square copia.png',
      '/src/assets/level 1/random 2 square copia.png',
      '/src/assets/level 1/lipstick.png',
      '/src/assets/level 1/sparks.gif',
      '/src/assets/level 3/maddyShield3.png',
      '/src/assets/level 3/cassieShield3.png',
      '/src/assets/level 1/cdGif.gif',
      '/src/assets/choose Character/MENUBoton.png',
      '/src/assets/choose Character/menu.png',
      '/src/assets/level 3/nategif.gif',

    );
  };
  const createLevel2 = () => {
    level2 = new SecondLevel(
      p,
      player1Choice,
      '/src/assets/level 2/bg2.png',
      '/src/assets/level 2/maddy bag.png',
      '/src/assets/level 2/cassie bag.png',
      score,
    );
  };

  const createFinalScreen = () => {
    endScreen = new finalcreen(
      p,
      player1Choice,
      '/src/assets/choose Character/end.png',
      score,
    );
  };
};
// eslint-disable-next-line new-cap
export default new p5(sketch);
