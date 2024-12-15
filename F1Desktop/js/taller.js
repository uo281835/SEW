class Taller{

    constructor(){
        

        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            document.querySelectorAll("p")[1].innerHTML=("Este navegador soporta el API File");
        }
        else {
            document.querySelectorAll("p")[1].innerHTML=("¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!");
        }
        this.partes = new Array();
        this.partesSeleccionadas = new Array();
        this.partesSeleccionadas.push({});
        this.partesSeleccionadas.push({});
        this.partesSeleccionadas.push({});
        this.printSlots(3);
        if (!window.indexedDB) {
            alert("Sorry! Your browser does not support IndexedDB");
        }else{
            var p = document.createElement("p");
            $(p).text("Este navegador soporta IndexDB");
            $("main").append(p)
            this.initData();
        }
    }

    readInputFile(files){
        var archivo = files[0];
        //El archivo es partes.txt
        if(archivo.type.match("text.*")){
            var lector = new FileReader();
            lector.onload = function(evento){
                this.partes = new Array();
                var texto = lector.result;
                var lineas = texto.split("\n");
                for(var i =0; i<lineas.length; i++){
                    var valores = lineas[i].split("_");
                    this.partes.push({
                        "nombre":valores[0],
                        "velocidad":valores[1],
                        "freno":valores[2]
                    })
                }
                this.printPartes();
            }.bind(this)
            lector.readAsText(archivo);
        }
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    printSlots(cantidad){
        var article = document.createElement("article");
        var h3 = document.createElement("h3");
        $(h3).text("Slots para partes");
        $(article).append(h3);
        for(var i =0; i<cantidad; i++){
            var section = document.createElement("section");
            var h4 = document.createElement("h4");
            $(h4).text("Slot Vacío")
            $(section).append(h4);
            $(section).on("drop", this.drop.bind(this, i));
            $(section).on("dragover", this.allowDrop);
            $(article).append(section);
        }
       

        
        $("main").append(article);
    }

    printPartes(){
        var article = document.createElement("article");
        var h3 = document.createElement("h3");
        $(h3).text("Partes a colocar");
        $(article).append(h3)
        for(var i =0; i<this.partes.length; i++){
            var parte = this.partes[i];
            var section = document.createElement("section");
            var h4 = document.createElement("h4");
            $(h4).text(parte.nombre);
            var p1 = document.createElement("p");
            $(p1).text("Velocidad:"+parte.velocidad);
            var p2 = document.createElement("p");
            $(p2).text("Freno:"+parte.freno);
            $(section).append(h4);
            $(section).append(p1);
            $(section).append(p2);
            $(section).attr("draggable","true")
            $(section).on("drag", this.drag.bind(this, parte));
            $(section).on("touchstart", this.handleTouchStart.bind(this, parte));
            $(section).on("touchmove", this.handleTouchMove.bind(this));
            $(section).on("touchend", this.handleTouchEnd.bind(this));
            $(article).append(section);
        }
        $("main").append(article);

    }

    drag(parte){
        this.parteDraggeada = parte;
    }

    drop(slot){
        this.parteDroppeada = this.parteDraggeada;
        this.parteDraggeada = null;
        var articleSection = $("article")[0];
        var parte = this.parteDroppeada;

        this.parteDroppeada = null;
        var section =  $("section",articleSection)[slot];
        $(section).empty();
        var h4 = document.createElement("h4");
        $(h4).text(parte.nombre);
        var p1 = document.createElement("p");
        $(p1).text("Velocidad:"+parte.velocidad);
        var p2 = document.createElement("p");
        $(p2).text("Freno:"+parte.freno);
        $(section).append(h4);
        $(section).append(p1);
        $(section).append(p2);

        this.guardarEnBaseDeDatos(parte, slot);
    }

    handleTouchStart(parte) {
        this.parteDraggeada = parte;
        this.activeEvent = 'start';
    }

    handleTouchMove(event) {
        this.lastPosition = event;
        this.activeEvent = 'move';
    }

    handleTouchEnd(e) {
        var touch = this.lastPosition.changedTouches[0];
        var posX = touch.clientX;
        var posY = touch.clientY;
        if (this.activeEvent === 'move') {
            var article = $("article")[0];
            
            var slots = $("section",article);
            var distancia =188888;
            var slot =-1;
            for(var i =0; i<slots.length; i++){
                var dropZone = slots[i];
                var r2 = dropZone.getBoundingClientRect();
                var top2 = r2.top;
                var left2 = r2.left;
                var distanciaConcreta = this.distancia(posX, posY, left2, top2);
                if(distanciaConcreta<distancia){
                    if (this.detectTouchEnd(left2, 
                        top2, posX, posY, r2.width, r2.height)) {
                        distancia=distanciaConcreta;
                        slot=i;
                    } 
                    
                }
                
            }
            if (slot>=0 ) {
                this.drop(slot);
            } 

           
        }
    }

    detectTouchEnd(x1, y1, x2, y2, w, h) {
        //Very simple detection here
        if (x2 - x1 > w) 
            return false;
        if (y2 - y1 > h) 
            return false;
        return true;
    }

    distancia(x1,y1,x2,y2){
        var distanciaX = Number(Number(x2)-Number(x1));
        var distanciaY = Number(Number(y2)-Number(y1));

        return Math.sqrt(distanciaX*distanciaX+distanciaY*distanciaY);
    }



    guardarEnBaseDeDatos(parte, slot){
        this.partesSeleccionadas[slot] = parte;

        this.printCoche();
    }

    printCoche(){
        var request = window.indexedDB.open("Coche",2);

        request.onerror = function(){
            console.error("Error", request.error);
        }

        request.onsuccess = function(event){
            var db = event.target.result;
           
            var transaction = db.transaction(["partes"],"readwrite");

            var partes = transaction.objectStore("partes");
            var request2 = partes.add(this.partesSeleccionadas);

            request2.onsuccess = function(){
                this.imprimirCoche();
            }.bind(this);
            request2.onerror = function(){
                console.log("Error", request2.error);
            }.bind(this);
        }.bind(this);

    }

    initData(){
        var request = window.indexedDB.open("Coche",2);

        request.onerror = function(){
            console.error("Error", request.error);
        }
        request.onsuccess = function(event){
            var db = event.target.result;
            var transaction = db.transaction(["partes"],"readwrite");

            var partes = transaction.objectStore("partes");
            partes.getAll().onsuccess = function(event){
                var result = event.target.result;
                var cantidad = result.length;
                if(cantidad>=1){
                    var configuracion = result.slice(-1)[0];
                    this.partesSeleccionadas = configuracion;
                    for(var i =0; i<configuracion.length; i++){
                        var parte = configuracion[i];
                        
                        if(parte.nombre!== undefined){
                            var articleSection = $("article")[0];
                            var section =  $("section",articleSection)[i];
                            $(section).empty();
                            var h4 = document.createElement("h4");
                            $(h4).text(parte.nombre);
                            var p1 = document.createElement("p");
                            $(p1).text("Velocidad:"+parte.velocidad);
                            var p2 = document.createElement("p");
                            $(p2).text("Freno:"+parte.freno);
                            $(section).append(h4);
                            $(section).append(p1);
                            $(section).append(p2);
                        }
                        
                    }
                   
                }
                
            }.bind(this)
            
        }.bind(this);

        request.onupgradeneeded = function(event){
            var db = event.target.result;
            if(!db.objectStoreNames.contains("partes")){
                db.createObjectStore("partes", {autoIncrement:true});
            }
            var transaction = event.target.transaction;

            var partes = transaction.objectStore("partes");
            var request2 = partes.add(this.partesSeleccionadas);

            request2.onsuccess = function(){
                partes.getAll().onsuccess = (event)=>{
                    var result = event.target.result;
                }
            }.bind(this);
            request2.onerror = function(){
                console.log("Error", request2.error);
            }.bind(this);
        }.bind(this);

    }

    resetDatabase(){
        var request = window.indexedDB.open("Coche");

        request.onerror = function(){
            console.error("Error", request.error);
        }

        request.onsuccess = function(){
            this.resetDatabase();
            var db = request.result;
            var transaction = db.transaction("partes","readwrite");

            var partes = transaction.objectStore("partes");
            var comprobar = partes.get("latest");
            comprobar.onsuccess = function(){
                var request2 = partes.delete("latest");

                request2.onsuccess = function(){
                }.bind(this);
                request2.error = function(){
                    console.log("Error");
                }.bind(this);
            }.bind(this);
            
        }.bind(this);

    }
    imprimirCoche(datos){
        var request = window.indexedDB.open("Coche");

        request.onerror = function(){
            console.error("Error", request.error);
        }

        request.onsuccess = function(event){
            var db = event.target.result;
            var transaction = db.transaction(["partes"],"readwrite");

            var partes = transaction.objectStore("partes");
            partes.getAll().onsuccess = (event)=>{
                var result = event.target.result;
            }
            
        }.bind(this);
    }


}