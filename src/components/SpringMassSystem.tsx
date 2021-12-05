import React, {Component} from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { isConstructorTypeNode } from "typescript";

interface ComponentProps {
}

class SpringMassSystemModel {
    M: number = 0.2;
    K: number = 40;
    C: number = 1;
    leftwall: number = -5;
    x1: number = 1;
    x2: number = 0;
    u: number =  0;

    E: number = 0;
    EK: number = 0;
    Eatrito: number = 0;
    Fatrito: number = 0;
    Etotal: number =0;
    maxE: number = 0;
    maxD: number = 0;
    maxEK: number = 0;

    simulateFrame(n: number = 1) {
        var t = (1 / 60) / n;
        
        for (var i = 0; i < n; i++) {
            if(this.x1 < this.leftwall){                
                this.x2 = -this.x2;
            }
            var x1ponto = this.x2;
            var x2ponto = -(this.K / this.M)*this.x1 - (this.C / this.M)*this.x2 + (1 / this.M) * this.u;
    
            var x1doisponto = x2ponto;
            var x2doisponto = -(this.K / this.M)*x1ponto - (this.C / this.M)*x2ponto;
    
            var x1tresponto = x2doisponto;
            var x2tresponto = -(this.K / this.M) * x1doisponto - (this.C / this.M) * x2doisponto;
    
            this.x1 = this.x1 + x1ponto * t + x1doisponto * (t ** 2) / 2 + x1tresponto * (t ** 3) / 6;
            this.x2 = this.x2 + x2ponto * t + x2doisponto * (t ** 2) / 2 + x2tresponto * (t ** 3) / 6;
            
            this.Fatrito = this.C * this.x2;
            var Patrito = Math.abs(this.Fatrito * this.x2);
            this.Eatrito += Patrito * t;
        }
    
        this.E = this.M*(this.x2**2)/2;
        this.EK = (1/2)*this.K*this.x1**2;
        this.Etotal=this.EK+this.E;
        this.maxD = Math.max(this.x1,this.maxD);
        this.maxE = Math.max(this.E,this.maxE);
        this.maxEK = Math.max(this.maxEK,this.EK);
    }
}
interface ISpringMassSystemViewProps {
    model: SpringMassSystemModel
    p5: p5Types
}

class SpringMassSystemView {
    systemModel: SpringMassSystemModel;
    p: p5Types;
    rocketX: number = 0;
    massX: number = 0;
    massY: number = 0;
    massW: number = 100;
    massH: number = 60;
    massStart: number = 250;
    constructor(props: ISpringMassSystemViewProps) {
        this.systemModel = props.model;
        this.p = props.p5;

    }

    makeDrawing(pressed: boolean) {
        var k = 50 * this.systemModel.x1;
        const p = this.p;
        p.fill(255);
        p.colorMode(p.HSB, 100);
        p.stroke(0);
        p.strokeWeight(2);
        // Draws damper
        p.line(0, p.height-10-30, 250 + k, p.height-10-30);        
        p.rect((125 - (40 * (250+k)/250)/2)+k/2, p.height-10-33, 40 * (250+k)/250, 6);
        // Draws spring conecting lines
        p.line(0, p.height-10-60, 100* (250 + k) / 250, p.height-10-60);
        p.line(150 * (250+k)/250, p.height-10-60, 250 + k, p.height-10-60);
        // Draws spring
        p.line(100* (250 + k) / 250, p.height-10-60,103* (250 + k) / 250, p.height-10-53);
        p.line(103* (250 + k) / 250, p.height-10-53,109* (250 + k) / 250, p.height-10-67);
        p.line(109* (250 + k) / 250, p.height-10-67,115* (250 + k) / 250, p.height-10-53);
        p.line(115* (250 + k) / 250, p.height-10-53,121* (250 + k) / 250, p.height-10-67);
        p.line(121* (250 + k) / 250, p.height-10-67,127* (250 + k) / 250, p.height-10-53);
        p.line(127* (250 + k) / 250, p.height-10-53,133* (250 + k) / 250, p.height-10-67);
        p.line(133* (250 + k) / 250, p.height-10-67,139* (250 + k) / 250, p.height-10-53);
        p.line(139* (250 + k) / 250, p.height-10-53,145* (250 + k) / 250, p.height-10-67);
        p.line(145* (250 + k) / 250, p.height-10-67,150* (250 + k) / 250, p.height-10-60);
        p.strokeWeight(1);
        
        p.fill(255);

        // Draws Mass block
        
        this.massX = this.massStart + k;
        this.rocketX = this.massX;        
        p.fill(0);
        p.rect(this.massX, p.height - 90, this.massW , this.massH);
        p.fill(30);
        // Draws small rectangle between block and wheels
        p.rect(this.massX, p.height - 30, 100,4);

        // Draws wheels
        p.colorMode(p.RGB);
        p.fill(222,184,135);
        p.noStroke();
        p.ellipse(this.massX + 20, p.height - 20, 20);
        p.ellipse(this.massX + 80, p.height - 20, 20);

        // Draws rocket/force applier
        p.rect(this.massX, p.height-90-10, 10, 10);


        if (pressed) {
            p.noStroke();
            p.colorMode(p.HSB, 100);
            p.fill(65, this.systemModel.u / 5, 100);
            p.rect(0, p.height -100, this.rocketX, 10);
        }
        p.colorMode(p.RGB);
        
    };
}

export default class SpringMassSystem extends Component {
    model: SpringMassSystemModel;
    dragging: boolean;
    pressed: boolean;
    lastMouseX: number;
    systemView?: SpringMassSystemView | null = null;
    p?: p5Types | null= null;

    constructor(props: ComponentProps) {
        super(props);
        this.model = new SpringMassSystemModel();
        
        this.dragging = false;
        this.pressed = false;
        this.lastMouseX = 0;
    }


    stopDragListener(x: SpringMassSystem){return()=> {
        // const p = this.p;
        // const systemView = this.systemView;
        // if (p != null && systemView != null ) {
        //     if (p.dist(p.mouseX, p.mouseY, systemView == null? 0 : systemView.massX  + 50, p.height-60) < 60) {
        x.dragging = false;
        //     }
        // }        
    }}
    dragListener(x: SpringMassSystem){return () => {
        // const p = this.p;
        // const systemView = this.systemView;
        // if (p != null && systemView != null ) {
            // if (p.dist(p.mouseX, p.mouseY, systemView.massX + 50, p.height-60) < 60) {          
        x.dragging = true;
            // }
        // }
    }}
	
    mySetup(x: SpringMassSystem){return (p5: p5Types, canvasParentRef: Element) =>{
        const canvas = p5.createCanvas(500, 500);
        console.log('got canvas');
        canvas.parent(canvasParentRef);
        console.log('set parent');   
        
        canvas.mousePressed(x.dragListener(x));
        console.log('set mouse pressed');
        canvas.mouseReleased(x.stopDragListener(x));
        console.log('set mouse released');
        canvas.mouseOut(x.stopDragListener(x));
        console.log('set mouse out');
    }
    }

    render() {
        const myDraw = (p5: p5Types) => {
            p5.background(230);     
            p5.fill(0);
            p5.rect(0, p5.height-10, p5.width, 10);

            const systemView = new SpringMassSystemView({p5: p5, model: this.model});

            if (this.dragging) {
                this.model.x1 = (p5.mouseX- systemView.massStart-50) / 50;
                this.model.x2 = ((p5.mouseX - this.lastMouseX) / 50) * 30
                this.lastMouseX = p5.mouseX;
            } else {
                this.model.simulateFrame(1);
                if (this.pressed) {
                    this.model.u += 5;
                }
            }

            systemView.makeDrawing(this.pressed);
            this.model.simulateFrame(1);
            
            systemView.makeDrawing(this.pressed);
        };
        
        return <Sketch setup={this.mySetup(this)} draw={myDraw} />
    } 
}