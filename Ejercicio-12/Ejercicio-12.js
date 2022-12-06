class FileReader{

    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) 
      {  
          //El navegador soporta el API File
          document.write("<p>Este navegador soporta el API File </p>");
      }
          else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
          
    }

    calcularTamañoArchivos() {
        var errorArchivo = document.getElementsByName("errorLectura")[0];
        var nBytes = 0,
            archivos = document.getElementsByName("subirArchivos")[0].files,
            nArchivos = archivos.length;
        for (var i = 0; i < nArchivos; i++) {
          nBytes += archivos[i].size;
        }
        var nombresTiposTamaños="";
        for (var i = 0; i < nArchivos; i++) {
          nombresTiposTamaños += "<p>Archivo[" + i +"] = "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"</p>" ;
        var archivo = archivos[i];
        var tipoTexto = /text.*/;
            if (archivo.type.match(tipoTexto)) 
              {
                var lector = new FileReader();
                lector.onload = function (evento) {
                  areaVisualizacion.innerText = lector.result;
                  }      
                lector.readAsText(archivo);
                }
            else {
                errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
                }   
        }
        document.getElementsByName("number")[0].value=(nArchivos);
        document.getElementsByName("size")[0].value=( nBytes + " bytes") ;
        $("p").after(nombresTiposTamaños);
    }
}

var file = new FileReader();