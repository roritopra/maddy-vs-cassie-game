import p5 from "p5";

export class finalcreen{
    img: p5.Image;
    score:  {
        player1: number,
        player2: number
      };
      player1Choice:string;

    constructor(p:p5, player1Choice: string, url: string, score:{player1:number, player2:number}){
        this.img = p.loadImage(url);
    this.score= score;
    this.player1Choice=player1Choice;

    }
    
draw(p:p5){
    p.imageMode(p.CENTER);
    p.image(this.img, 960, 540 );

    p.textSize(145);
    p.fill(255);

    if(this.score.player1> this.score.player2){
    p.text("Player 1",588,570);
    p.text(this.score.player1,588,720);
    }

    if(this.score.player2> this.score.player1){
        p.text("Player 2",588,570);
        p.text(this.score.player2,588,720);
        }
}




}
