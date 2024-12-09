class Taller{

    constructor(){
        if (!window.indexedDB) {
            alert("Sorry! Your browser does not support IndexedDB");
        }else{
            var p = document.createElement("p");
            $(p).text("Este navegador soporta IndexDB");
            $("main").append(p)
        }

        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            document.querySelectorAll("p")[1].innerHTML=("<p>Este navegador soporta el API File </p>");
        }
        else {
            document.querySelectorAll("p")[1].innerHTML=("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
        this.partes = new Array();
        this.partesSeleccionadas = new Array();
        this.partesSeleccionadas.push({});
        this.partesSeleccionadas.push({});
        this.partesSeleccionadas.push({});
        this.printSlots(3);
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
                    console.log(valores);
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
            $(article).append(section);
        }
        $("main").append(article);

    }

    drag(parte){
        this.parteDraggeada = parte;
        console.log(parte);
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

    guardarEnBaseDeDatos(parte, slot){
        this.partesSeleccionadas[slot] = parte;

        this.printCoche();
    }

    printCoche(){
        var request = window.indexedDB.open("Coche");

        request.onerror = function(){
            console.error("Error", request.error);
        }

        request.onsuccess = function(){
            var db = request.result;
            if(!db.objectStoreNames.contains("partes")){
                db.createObjectStore("partes");
            }
            var transaction = db.transaction("partes","readwrite");

            var partes = transaction.objectStore("partes");
            var request2 = partes.add(this.partesSeleccionadas);

            request2.onsuccess = function(){
                this.imprimirCoche();
            }.bind(this);
            request2.error = function(){
                console.log("Error");
            }.bind(this);
        }.bind(this);

    }


}