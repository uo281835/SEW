class Noticias{
    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            document.querySelectorAll("main p")[0].innerHTML=("Este navegador soporta el API File");
        }
        else {
            document.querySelectorAll("main p")[0].innerHTML=("¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!");
        }
    }

    readInputFile(files){
        var archivo = files[0];
        if(archivo.type.match("text.*")){
            var lector = new FileReader();
            lector.onload = function(evento){
                var texto = lector.result;
                var lineas = texto.split("\n");
                for(var i =0; i<lineas.length; i++){
                    var valores = lineas[i].split("_");
                    this.addNoticiaArticle(valores[0],valores[1], valores[2]);
                }
            }.bind(this);
            lector.readAsText(archivo);
        }
    }
    addNoticia(){
        var titular = $("[name = 'titular']").val();
        var contenido = $("[name = 'contenido']").val();
        var autor = $("[name = 'autor']").val();
        this.addNoticiaArticle(titular,contenido,autor);
    }

    addNoticiaArticle(titular, contenido, autor){
        if(titular!==null && contenido!==null && autor!=null
            && titular!=undefined && contenido!=undefined && autor!=undefined
        ){
            if(titular !== ""&& contenido!=="" && autor!==""){
                var article = document.createElement("article");
        var h4 = document.createElement("h4");
        $(h4).text(titular);
        var p1 = document.createElement("p");
        $(p1).text(contenido);
        var p2 = document.createElement("p");
        $(p2).text(autor);
        $(article).append(h4);
        $(article).append(p1);
        $(article).append(p2);
        $("section")[1].append(article);
            }
        }
        
    }

}