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
                var content = " <h3>Noticias</h3>"
                for(var i =0; i<lineas.length; i++){
                    var valores = lineas[i].split("_");
                    console.log(valores);
                    var string = "<article><h4>"+valores[0] + "</h4>";
                    string+="<p>"+valores[1]+"</p>";
                    string+="<p>"+valores[2]+"</p></article>";
                    content+=string;
                    
                }
                $("section").html(content);
            }
            lector.readAsText(archivo);
        }
    }

}