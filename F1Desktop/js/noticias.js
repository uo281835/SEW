class Noticias{
    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            document.querySelectorAll("p")[1].innerHTML=("<p>Este navegador soporta el API File </p>");
        }
        else {
            document.querySelectorAll("p")[1].innerHTML=("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
    }

    readInputFile(files){
        var archivo = files[0];
        if(archivo.type.match("text.*")){
            var lector = new FileReader();
            lector.onload = function(evento){
                var texto = lector.result;
                var lineas = texto.split("\n");
                var content = "<section> <h2>Noticias</h2>"
                for(var i =0; i<lineas.length; i++){
                    var valores = lineas[i].split("_");
                    console.log(valores);
                    var string = "<article><h3>"+valores[0] + "</h3>";
                    string+="<p>"+valores[1]+"</p>";
                    string+="<p>"+valores[2]+"</p></article>";
                    content+=string;
                    
                }
                content+="</section>";
                $("section").html(content);
            }
            lector.readAsText(archivo);
        }
    }

}