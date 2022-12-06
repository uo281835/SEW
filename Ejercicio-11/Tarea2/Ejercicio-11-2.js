class GeoLocalizacion{

    constructor(){
        this.permission = false;
        this.error = false;
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
    }
    mostrarError(){
        this.error = true;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
            }
        $("h2").after("<p>"+this.mensaje+"</p>");
    }
    givePermission(){
        this.permission = true;

    }
}

var geo = new GeoLocalizacion();