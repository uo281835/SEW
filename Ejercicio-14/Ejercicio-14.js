class PintateUna{
    constructor(){
       this.seteado = false;
       this.animation = null;
       this.x =0;
       this.y = 0;
       this.pantallaComplet = false;
    }
    cargar(){

        this.canvas = $("canvas")[0];
        this.canvas.requestPointerLock = this.canvas.requestPointerLock ||
        this.canvas.mozRequestPointerLock;
        document.getElementsByName("start")[0].onclick = function() {
            document.documentElement.requestPointerLock();
            
        }
        this.contexto = this.canvas.getContext('2d');
        this.contexto.fillStyle = "black";
        this.contexto.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.contexto.fillStyle = "#f00";
        this.contexto.fill();
        
    }
    dibujar(){
        if(!this.seteado){
            this.seteado = true;
            document.addEventListener('mousemove', this.updatePosition.bind(this));
            
        }else{
            this.contexto.fillStyle = "red";
            this.contexto.fillRect(this.x, this.y, 30, 30);
        }
        
    }
    updatePosition(e) {
        this.x = Number(e.clientX);
        this.y = Number(e.clientY);
    }
    pantallaCompleta(){
            document.documentElement.requestFullscreen();
            this.pantallaComplet = true;
        
    }

}

var p = new PintateUna();
