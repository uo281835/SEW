class GeoLocalizacion{

    constructor(){
        this.permission = false;
        this.error = false;
        this.points = new Array();
    }
    show(){
        if(this.permission){
            $("p").remove();
            navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.mostrarError.bind(this));

        }else{
            $("h2").after("<p>No nos ha dado permiso para usar su ubicación</p>");
        }
       
    }
    getPosicion(posicion){
        this.error = false;
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        var string = "";
        string+='<p>Longitud: '+this.longitud +' grados</p>'; 
        string+='<p>Latitud: '+this.latitud +' grados</p>';
        string+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        string+='<p>Altitud: '+ this.altitud +' metros</p>';
        string+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        $("h2").after(string);
        $("input").last().after("<input type=\"button\" value=\"Enseñar la posición en un mapa\" onClick = \"geo.showMap()\">");
    }
    showMap(){
        
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)

        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        points.forEach(element => {
            marcador+="&markers=color:red%7Clabel:S%7C" + element[0] + "," + element[1];
        });
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        $("p").last().after("<img src='"+this.imagenMapa+"' alt='mapa estático google' />");
        var map = new Map(this);
        map.initMap = initMap.bind(map);
        map.initMap();
    }
    mostrarError(){
        this.error = true;
        $("h2").after("<p>Ha habido un error</p>");
    }
    givePermission(){
        this.permission = true;

    }
    add(){
        var latitud = Number(getElementsByName("latitud")[0].value);
        var longitud = Number(getElementsByName("longitud")[0].value);
        this.points.push({latitud, longitud});
        this.showMap();
    }
}
class Map{
    constructor(geo){
        this.geo = geo;
    }
    

}
function initMap(){
    var position = {lat: this.geo.latitud, lng:   this.geo.longitud};
    var mapa = new google.maps.Map(document.getElementsByName('mapa')[0],{zoom: 8,center:position});
    var marcador = new google.maps.Marker({position:position,map:mapa});

}


var geo = new GeoLocalizacion();