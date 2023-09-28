import p5 from "p5";

export class Screen{
    img: p5.Image;
    
    constructor(p:p5, url: string){
        this.img = p.loadImage(url);
    

    }
    
draw(p:p5){
    p.imageMode(p.CENTER);
    p.image(this.img, 960, 540 );
}

mouseClick(p:p5){
    if(p.mouseX>1088 && p.mouseX<1594 && p.mouseY>302 && p.mouseY<1037){
        return "maddy"
    } else if(p.mouseX>154 && p.mouseX<848 && p.mouseY>288 && p.mouseY<1088){
        return "cassie"
    } else { 
        return ""
    }
   
}



}
