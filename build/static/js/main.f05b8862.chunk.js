(this.webpackJsonprenehome=this.webpackJsonprenehome||[]).push([[0],{52:function(e,t,s){},54:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/loveletter-to-rust.21ec5475.md"},55:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/react-p5-lessons.92df44ff.md"},56:function(e,t,s){"use strict";s.r(t),t.default=s.p+"static/media/hello.63cdf55a.md"},61:function(e,t,s){},72:function(e,t,s){"use strict";s.r(t);var i=s(2),a=s.n(i),n=s(39),r=s.n(n),h=(s(52),s(1));function c(){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("nav",{className:"relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3",children:Object(h.jsxs)("div",{className:"container px-4 mx-auto flex flex-wrap items-center justify-between",children:[Object(h.jsxs)("div",{className:"w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start",children:[Object(h.jsx)("a",{className:"text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white",href:"/",children:"Reneland - a glimpse into his mind"}),Object(h.jsx)("button",{className:"text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none",type:"button",children:Object(h.jsx)("i",{className:"fas fa-bars"})})]}),Object(h.jsx)("div",{className:"lg:flex flex-grow items-center",id:"example-navbar-danger",children:Object(h.jsxs)("ul",{className:"flex flex-col lg:flex-row list-none lg:ml-auto",children:[Object(h.jsx)("li",{className:"nav-item",children:Object(h.jsxs)("a",{className:"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75",href:"/blog",children:[Object(h.jsx)("i",{className:"fab fa-facebook-square text-lg leading-lg text-white opacity-75"}),Object(h.jsx)("span",{className:"ml-2",children:"Blog"})]})}),Object(h.jsx)("li",{className:"nav-item",children:Object(h.jsx)("a",{className:"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75",href:"/experiments",children:Object(h.jsx)("span",{className:"ml-2",children:"Experiments"})})}),Object(h.jsx)("li",{className:"nav-item",children:Object(h.jsx)("a",{className:"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75",href:"/about",children:Object(h.jsx)("span",{className:"ml-2",children:"About"})})})]})})]})})})}function l(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(c,{}),Object(h.jsx)("div",{children:Object(h.jsx)("h1",{children:"Welcome to the internet"})})]})}var o=s(10),m=s(18),d=s(12),u=s(17),x=s(82),j=s(45),p=[s(54),s(55),s(56)],b=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var i;return Object(o.a)(this,s),(i=t.call(this,e)).state={posts:[""]},i}return Object(m.a)(s,[{key:"componentDidMount",value:function(){var e=this,t=p.map((function(e){return fetch(e.default).then((function(e){return e.text()}))}));Promise.all(t).then((function(t){e.setState({posts:t})}))}},{key:"render",value:function(){var e=this.state.posts;console.log(e);var t=e.map((function(e){return Object(h.jsx)("div",{className:"container mx-auto prose max-w-max border",children:Object(h.jsx)(x.a,{children:e,className:"container mx-auto max-w-none",remarkPlugins:[j.a]})})}));return Object(h.jsxs)("div",{children:[Object(h.jsx)(c,{}),Object(h.jsx)("div",{className:"container mx-auto space-y-8",children:t})]})}}]),s}(i.Component);function g(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(c,{}),Object(h.jsxs)("div",{className:"prose",children:[Object(h.jsx)("p",{children:"Ren\xea Couto e Silva, born in 1993, Brazillian, code lover"}),Object(h.jsxs)("p",{children:["Github: ",Object(h.jsx)("a",{href:"https://github.com/renecouto",children:"https://github.com/renecouto"})]})]})]})}s(61);var f=s(46),O=s(5);function v(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(c,{}),Object(h.jsx)("div",{className:"prose",children:Object(h.jsx)("a",{href:"/experiments/spring-mass",children:"Spring-mass system simulation using p5.js"})})]})}var w=s(44),y=s.n(w),M=function(){function e(){Object(o.a)(this,e),this.M=.2,this.K=40,this.C=1,this.leftwall=-5,this.x1=1,this.x2=0,this.u=0,this.E=0,this.EK=0,this.Eatrito=0,this.Fatrito=0,this.Etotal=0,this.maxE=0,this.maxD=0,this.maxEK=0}return Object(m.a)(e,[{key:"simulateFrame",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=1/60/e,s=0;s<e;s++){this.x1<this.leftwall&&(this.x2=-this.x2);var i=this.x2,a=-this.K/this.M*this.x1-this.C/this.M*this.x2+1/this.M*this.u,n=a,r=-this.K/this.M*i-this.C/this.M*a,h=r,c=-this.K/this.M*n-this.C/this.M*r;this.x1=this.x1+i*t+n*Math.pow(t,2)/2+h*Math.pow(t,3)/6,this.x2=this.x2+a*t+r*Math.pow(t,2)/2+c*Math.pow(t,3)/6,this.Fatrito=this.C*this.x2;var l=Math.abs(this.Fatrito*this.x2);this.Eatrito+=l*t}this.E=this.M*Math.pow(this.x2,2)/2,this.EK=.5*this.K*Math.pow(this.x1,2),this.Etotal=this.EK+this.E,this.maxD=Math.max(this.x1,this.maxD),this.maxE=Math.max(this.E,this.maxE),this.maxEK=Math.max(this.maxEK,this.EK)}}]),e}(),k=function(){function e(t){Object(o.a)(this,e),this.systemModel=void 0,this.p=void 0,this.rocketX=0,this.massX=0,this.massY=0,this.massW=100,this.massH=60,this.massStart=250,this.systemModel=t.model,this.p=t.p5}return Object(m.a)(e,[{key:"makeDrawing",value:function(e){var t=50*this.systemModel.x1,s=this.p;s.fill(255),s.colorMode(s.HSB,100),s.stroke(0),s.strokeWeight(2),s.line(0,s.height-10-30,250+t,s.height-10-30),s.rect(125-40*(250+t)/250/2+t/2,s.height-10-33,40*(250+t)/250,6),s.line(0,s.height-10-60,100*(250+t)/250,s.height-10-60),s.line(150*(250+t)/250,s.height-10-60,250+t,s.height-10-60),s.line(100*(250+t)/250,s.height-10-60,103*(250+t)/250,s.height-10-53),s.line(103*(250+t)/250,s.height-10-53,109*(250+t)/250,s.height-10-67),s.line(109*(250+t)/250,s.height-10-67,115*(250+t)/250,s.height-10-53),s.line(115*(250+t)/250,s.height-10-53,121*(250+t)/250,s.height-10-67),s.line(121*(250+t)/250,s.height-10-67,127*(250+t)/250,s.height-10-53),s.line(127*(250+t)/250,s.height-10-53,133*(250+t)/250,s.height-10-67),s.line(133*(250+t)/250,s.height-10-67,139*(250+t)/250,s.height-10-53),s.line(139*(250+t)/250,s.height-10-53,145*(250+t)/250,s.height-10-67),s.line(145*(250+t)/250,s.height-10-67,150*(250+t)/250,s.height-10-60),s.strokeWeight(1),s.fill(255),this.massX=this.massStart+t,this.rocketX=this.massX,s.fill(0),s.rect(this.massX,s.height-90,this.massW,this.massH),s.fill(30),s.rect(this.massX,s.height-30,100,4),s.colorMode(s.RGB),s.fill(222,184,135),s.noStroke(),s.ellipse(this.massX+20,s.height-20,20),s.ellipse(this.massX+80,s.height-20,20),s.rect(this.massX,s.height-90-10,10,10),e&&(s.noStroke(),s.colorMode(s.HSB,100),s.fill(65,this.systemModel.u/5,100),s.rect(0,s.height-100,this.rocketX,10)),s.colorMode(s.RGB)}}]),e}(),N=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(e){var i;return Object(o.a)(this,s),(i=t.call(this,e)).model=void 0,i.dragging=void 0,i.pressed=void 0,i.lastMouseX=void 0,i.systemView=null,i.p=null,i.model=new M,i.dragging=!1,i.pressed=!1,i.lastMouseX=0,i}return Object(m.a)(s,[{key:"stopDragListener",value:function(e){return function(){e.dragging=!1}}},{key:"dragListener",value:function(e){return function(){e.dragging=!0}}},{key:"mySetup",value:function(e){return function(t,s){var i=t.createCanvas(500,500);console.log("got canvas"),i.parent(s),console.log("set parent"),i.mousePressed(e.dragListener(e)),console.log("set mouse pressed"),i.mouseReleased(e.stopDragListener(e)),console.log("set mouse released"),i.mouseOut(e.stopDragListener(e)),console.log("set mouse out")}}},{key:"render",value:function(){var e=this;return Object(h.jsx)(y.a,{setup:this.mySetup(this),draw:function(t){t.background(230),t.fill(0),t.rect(0,t.height-10,t.width,10);var s=new k({p5:t,model:e.model});e.dragging?(e.model.x1=(t.mouseX-s.massStart-50)/50,e.model.x2=(t.mouseX-e.lastMouseX)/50*30,e.lastMouseX=t.mouseX):(e.model.simulateFrame(1),e.pressed&&(e.model.u+=5)),s.makeDrawing(e.pressed),e.model.simulateFrame(1),s.makeDrawing(e.pressed)}})}}]),s}(i.Component);function E(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(c,{}),Object(h.jsxs)("div",{className:"prose",children:[Object(h.jsx)("h1",{children:"Spring-mass second order system."}),Object(h.jsxs)("p",{children:["Click or drag the mass to see it moving!",Object(h.jsx)("br",{}),"Here we simulate up to the third derivative at a rate of 60 calculations/second.",Object(h.jsx)("br",{}),"To be implemented: Port state-space graphs, add parameter tuning (mass, drag and spring coefficients, time scale (1s becomes 1ms, for example))"]})]}),Object(h.jsx)(N,{})]})}var X=function(){return Object(h.jsx)(f.a,{children:Object(h.jsxs)(O.c,{children:[Object(h.jsx)(O.a,{path:"/",element:Object(h.jsx)(l,{})}),Object(h.jsx)(O.a,{path:"/blog",element:Object(h.jsx)(b,{})}),Object(h.jsx)(O.a,{path:"/about",element:Object(h.jsx)(g,{})}),Object(h.jsx)(O.a,{path:"/experiments/spring-mass",element:Object(h.jsx)(E,{})}),Object(h.jsx)(O.a,{path:"/experiments",element:Object(h.jsx)(v,{})})]})})},S=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,83)).then((function(t){var s=t.getCLS,i=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;s(e),i(e),a(e),n(e),r(e)}))};r.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(X,{})}),document.getElementById("root")),S()}},[[72,1,2]]]);
//# sourceMappingURL=main.f05b8862.chunk.js.map