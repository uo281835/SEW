class Semaforo{
    constructor(){
        this.levels = [0.2,0.5,0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random()*3)];
        this.createStructure();
    }

    createStructure(){
        var encabezado = document.createElement("h2");
        encabezado.textContent="Semáforo";
        document.querySelector("main").appendChild(encabezado);

        for(var i =0; i<this.lights; i++){
            var luz1 = document.createElement("div");
            document.querySelector("main").appendChild(luz1);

        }
        var game = this

        var botonArrancar = document.createElement("button");
        botonArrancar.textContent = "Arranque";
        botonArrancar.addEventListener("click", this.initSequence.bind(game));
        document.querySelector("main").appendChild(botonArrancar);
        var botonReaccion= document.createElement("button");
        botonReaccion.setAttribute("disabled","true");
        botonReaccion.textContent = "Reacción";
        botonReaccion.addEventListener("click", this.stopReaction.bind(game));
        document.querySelector("main").appendChild(botonReaccion);
        document.querySelector("main").appendChild(document.createElement("p"))

    }

    initSequence(){
        document.querySelector("main").classList.add("load");
        document.querySelectorAll("button")[0].setAttribute("disabled","true");

        console.log(this)
        var f = function(game){
            this.unload_moment=new Date();
            this.endSequence();
        }.bind(this)
        setTimeout(f, 2000+this.difficulty*100);
    
    }

    endSequence(){
        document.querySelectorAll("button")[1].removeAttribute("disabled");
        document.querySelector("main").classList.add("unload");
    }

    stopReaction(){
        this.clic_moment=new Date();
        var diferencia = -this.unload_moment.getMilliseconds()+this.clic_moment.getMilliseconds();
        var p = document.createElement("p");
        p.textContent = diferencia+"ms";
        
        document.querySelector("main p").innerHTML= (diferencia+"ms");
        document.querySelector("main").classList.remove("load","unload");
        document.querySelectorAll("button")[1].setAttribute("disabled","true");
        document.querySelectorAll("button")[0].removeAttribute("disabled");
    }

}