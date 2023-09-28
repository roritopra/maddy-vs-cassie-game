import p5 from "p5";
import {
  Item
} from "./Item";
import {
  Character
} from "./Character";


export class SecondLevel {


  items: Item[];
  bg: p5.Image;
  maddyImg: string;
  cassieImg: string;

  timeLeft: number;

  maddy: Character;
  cassie: Character;

  gameOver:boolean;
  score:  {
    player1: number,
    player2: number
  };

  player1Choice:string;
  constructor(p: p5, player1Choice: string, backgroundUrl: string, maddyImg: string, cassieImg: string, score:{player1:number, player2:number}) {
    this.bg = p.loadImage(backgroundUrl);
    this.cassieImg = cassieImg;
    this.maddyImg = maddyImg;
   

    this.player1Choice=player1Choice;
    this.score = score;
   
    this.maddy = new Character(p,this.player1Choice==="maddy"?1: 2,  1035, maddyImg, this.player1Choice==="maddy"?this.score.player1:this.score.player2);
    this.cassie = new Character(p,this.player1Choice==="cassie"?1: 2, 1035, cassieImg, this.player1Choice==="cassie"?this.score.player1:this.score.player2);
    this.items = [];
    this.timeLeft = 80;
    this.gameOver= false;

    console.log(player1Choice);
  }

  draw(p: p5) {
    p.imageMode(p.CENTER);
    p.image(this.bg, 960, 540);

    this.maddy.draw(p);
    this.cassie.draw(p);
    this.maddy.keyPressed(p);
    this.cassie.keyPressed(p);
    this.createNewItem(p);

    this.items.forEach(item=>{
        item.draw(p);
        item.deleteSelf(this.items);
    })

    this.maddy.catchItem(this.items);
    this.cassie.catchItem(this.items);
p.textAlign(p.CENTER);
    p.textSize(45);
    p.fill(255);
    p.text("Player 1",1360,70);
    p.text("Player 2", 515, 70);
    p.text(this.score.player1,1360,120);
    p.text(this.score.player2,515, 120);

    if(this.maddy.player===1){
      this.score.player1= this.maddy.score
      this.score.player2= this.cassie.score
    }
    if(this.maddy.player===2){
      this.score.player2= this.maddy.score
      this.score.player1= this.cassie.score
    }

    if (p.frameCount % 60 === 0) this.timeLeft--
    p.text(this.timeLeft, p.width/2, 120)

    if(this.timeLeft===0){
        this.gameOver= true;
    }
  }

  keypressed(p: p5) {
    this.cassie.keyPressed(p);
  }

  createNewItem(p: p5) {
    if (p.frameCount % 25 === 0) {
      const newItem: Item = new Item(p)
      this.items.push(newItem);
    }
  }
}
