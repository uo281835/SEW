class Cargador{

    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) 
      {  
          //El navegador soporta el API File
          document.write("<p>Este navegador soporta el API File </p>");
      }
          else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        this.ubicaciones = new Array();
    }

    cargarArchivoGeoJson() {
        var errorArchivo = document.getElementsByName("errorLectura")[0];
        var data = document.getElementsByName("subirArchivos")[0].files[0];
        data = $("pre").text(JSON.stringify(data, null, 2)); 

        var hijos = $("coordinates",data);
        hijos.forEach(element => {
            var coordenadas = element;
            var longitud = coordenadas[0];
            var latitud = coordenadas[1];
            this.ubicaciones.push(new InfoUbicacion(" ",longitud,latitud,0));
        });
       }

}
class InfoUbicacion{
    constructor(name,longitud,latitud,altitud){
        this.name = name;
        this.longitud= longitud;
        this.latitud = latitud;
        this.altitud = altitud;
    }
}
var carga = new Cargador();
function initMap() {
    
    var myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementsByName("map")[0], {
        zoom: 4,
        center: myLatLng,
      });
    if(carga.ubicaciones.length>0){
        for(var i =0; i<carga.ubicaciones.length; i++){
            myLatLng = {lat: carga.ubicaciones[i].latitud, lng: carga.ubicaciones[i].longitud}
            new google.maps.Marker({
                position: myLatLng,
                map,
                title: carga.ubicaciones[i].name,
              });
        }
    }
    
    
  
   
  }