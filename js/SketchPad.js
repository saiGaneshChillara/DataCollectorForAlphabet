class SketchPad {
    constructor(container,size=400) {
        this.canvas=document.createElement("canvas");
        this.canvas.width=size;
        this.canvas.height=size;
        this.canvas.style=`background-color:white;
        box-shadow: 0px 0px 10px 2px green;`;
        container.appendChild(this.canvas);

        const lineBreak=document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn=document.createElement("button");
        this.undoBtn.innerHTML="UNDO";
        container.appendChild(this.undoBtn);


        this.ctx=this.canvas.getContext("2d");
        
        this.reset();
        this.#addEventListeners();

    }
    
    reset() {
        this.paths=[];
        this.isDrawing=false;
        this.#redraw();
    }

    #addEventListeners() {
        this.canvas.onmousedown=(evnt)=> {
            const mouse=this.#getMouse(evnt);
            this.paths.push([mouse]);
            this.isDrawing=true;
        }
        this.canvas.onmousemove=(evnt)=> {
            if(this.isDrawing) {
                const mouse=this.#getMouse(evnt);
                const lastPath=this.paths[this.paths.length-1];
                lastPath.push(mouse);
                this.#redraw();
            }
        }
        document.onmouseup=()=> {
            this.isDrawing=false;
        }
        this.canvas.ontouchstart=(evt)=>{
            const loc=evt.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove=(evnt)=>{
            const loc=evnt.touches[0];
            this.canvas.onmousemove(loc);
        }
        document.ontouchend=()=> {
            this.canvas.onmouseup();
        }
        this.undoBtn.onclick=()=> {
            this.paths.pop();
            this.#redraw();
        }
    }


    #getMouse=(evnt)=> {
        const rect=this.canvas.getBoundingClientRect();
        const mouse=[
            Math.round(evnt.clientX-rect.left),
            Math.round(evnt.clientY-rect.top)
        ];
        return mouse;
    }
    #redraw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        draw.paths(this.ctx,this.paths);
        if(this.paths.length>0) {
            this.undoBtn.disabled=false;
        } else {
            this.undoBtn.disabled=true;
        }
    }
    
}