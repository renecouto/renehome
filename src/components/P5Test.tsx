import React, {Component} from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { isConstructorTypeNode } from "typescript";

interface ComponentProps {
	//Your component props
}


export default class SpringMassSystem extends Component {
    x: number;
    y: number;
    constructor(props: ComponentProps) {
        super(props);
        this.x = 50;
        this.y = 70;
    }
	
    mySetup(p5: p5Types, canvasParentRef: Element) {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    }

    render() {
        const myDraw = (p5: p5Types) => {
                p5.background(0);
                p5.ellipse(this.x, this.y, 70, 70);
                this.x = (this.x + 1)%500;
        };
        
        return <Sketch setup={this.mySetup} draw={myDraw} />
    } 
}