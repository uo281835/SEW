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
        botonReaccion.setAttribute("disabled","");
        botonReaccion.textContent = "Reacción";
        botonReaccion.addEventListener("click", this.stopReaction.bind(game));
        document.querySelector("main").appendChild(botonReaccion);
        document.querySelector("main").appendChild(document.createElement("p"))

    }

    initSequence(){
        document.querySelector("main").classList.add("load");
        document.querySelectorAll("button")[0].setAttribute("disabled","");

        var f = function(game){
            this.unload_moment=new Date();
            this.endSequence();
        }.bind(this);
        setTimeout(f, 2000+this.difficulty*100);
    
    }

    endSequence(){
        document.querySelectorAll("button")[1].removeAttribute("disabled");
        document.querySelector("main").classList.add("unload");
    }

    stopReaction(){
        this.clic_moment=new Date();

        var milisegundosUnload = this.unload_moment.getTime();
        var milisegundosActual = this.clic_moment.getTime();
        var diferencia = (milisegundosActual-milisegundosUnload)/1000;
        var p = document.createElement("p");
        p.textContent = diferencia+"s";
        
        document.querySelector("main p").innerHTML= (diferencia+"s");
        document.querySelector("main").classList.remove("load","unload");
        document.querySelectorAll("button")[1].setAttribute("disabled","");
        document.querySelectorAll("button")[0].removeAttribute("disabled");
        this.createRecordForm();
    }
    createRecordForm(){

        var milisegundosUnload = this.unload_moment.getTime();
        var milisegundosActual = this.clic_moment.getTime();
        var diferencia = (milisegundosActual-milisegundosUnload)/1000;
        var form0 = $("form")[0];
        if(form0!==undefined)
        {
            var campoNivel = $("input", form0)[2];
            campoNivel.value=(this.difficulty*10);
            var campoPuntos = $("input", form0)[3];
            campoPuntos.value= (diferencia);
            
        }else{
            var form = document.createElement("form");
            form.setAttribute("action", "#");
            form.setAttribute("method", "post");
            form.setAttribute("name","record")
    
            var labelName = document.createElement("label");
            labelName.textContent="Nombre";
    
            var name = document.createElement("input");
            name.setAttribute("type", "text");
            name.setAttribute("name", "nombre");
            name.setAttribute("title", "nombre");
            labelName.appendChild(name);
    
            var labelSurname = document.createElement("label");
            labelSurname.textContent="Apellido";
            
            var surname = document.createElement("input");
            surname.setAttribute("type", "text");
            surname.setAttribute("name", "apellidos");
            surname.setAttribute("title", "apellidos");
            labelSurname.appendChild(surname);
    
            var labelLevel = document.createElement("label");
            labelLevel.textContent="Dificultad";
            
            var level = document.createElement("input");
            level.setAttribute("type", "number");
            level.setAttribute("name", "nivel");
            level.setAttribute("title", "nivel");
            level.setAttribute("readonly", "");
            level.value= this.difficulty*10;
            labelLevel.appendChild(level);
    
    
            var labelScore = document.createElement("label");
            labelScore.textContent="Puntuación";
    
            var score = document.createElement("input");
            score.setAttribute("type", "number");
            score.setAttribute("name", "tiempo");
            score.setAttribute("title", "tiempo");
            score.setAttribute("readonly", "");
            score.setAttribute("step","0.001");
            score.value=diferencia;
            labelScore.appendChild(score);
    
            var submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value","guardar");
            submit.textContent ="Submit";
    
            form.appendChild(labelName);
            form.appendChild(labelSurname);
            form.appendChild(labelLevel);
            form.appendChild(labelScore);
            form.appendChild(submit);
    
            $("main").append(form);
        }
            
        


    }

}