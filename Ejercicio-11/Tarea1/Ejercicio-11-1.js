class GeoLocalizacion{

    constructor(){
        this.permission = false;
        this.error = false;
    }
    show(){
        if(this.permission){
            $("p").remove();
            navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));

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
    }
    
    givePermission(){
        this.permission = true;

    }
}

var geo = new GeoLocalizacion();