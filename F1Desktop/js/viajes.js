class Viajes{
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        

        // current slide counter
        this.curSlide = 9;
        // maximum number of slides
        
    }

    initSlidesPerSe(){
      this.slides = document.querySelectorAll("img");
      // select next slide button
      this.nextSlide = document.querySelector("button:nth-of-type(1)");
      this.maxSlide = this.slides.length - 1;
      this.prevSlide = document.querySelector("button:nth-of-type(2)");
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;   
        
    }

    verErrores(error){
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
        var zoom ="&zoom=10";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false";
    
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        $("h3:contains('Mapa')").after("<img src='"+this.imagenMapa+"' alt='mapa estático del usuario' />");
      }

      showDynamicMap(){
        console.log("enseñando mapa")
        console.log(this)
        var centro = {lat:0, lng:0}
        console.log(centro)
        var mapaGeoposicionado = new google.maps.Map(document.querySelector('article'),{
            zoom: 10,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };


    
                infoWindow.setPosition(pos);
                infoWindow.setContent('Localización encontrada');
                infoWindow.open(mapaGeoposicionado);

                var h31 = document.createElement("h4");
                $(h31).text("Mapa del circuito ");
                $("main article")[0].append(h31);
                mapaGeoposicionado.setCenter(pos);
                
              }, function() {
                this.handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
              });
            } else {
              // Browser doesn't support Geolocation
              this.handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
            }
        }
  
        
        
        handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: Ha fallado la geolocalización' :
                                  'Error: Su navegador no soporta geolocalización');
            infoWindow.open(dynamicMap);
      }

      siguienteImagen(){
        if (this.curSlide === this.maxSlide) {
          this.curSlide = 0;
        } else {
          this.curSlide++;
        }

        //   move slide by -100%
        this.slides.forEach((slide, indx) => {
          var trans = 100 * (indx - this.curSlide);
          $(slide).css('transform', 'translateX(' + trans + '%)')
        });
      }
      
      previaImagen(){
        // check if current slide is the first and reset current slide to last
        if (this.curSlide === 0) {
          this.curSlide = this.maxSlide;
        } else {
          this.curSlide--;
        }

        //   move slide by 100%
        this.slides.forEach((slide, indx) => {
          var trans = 100 * (indx - this.curSlide);
          $(slide).css('transform', 'translateX(' + trans + '%)')
        });
      }
      inicializarCarrousel(){
        this.initSlidesPerSe();
        // add event listener and navigation functionality
        this.nextSlide.addEventListener("click",this.siguienteImagen.bind(this));
        // add event listener and navigation functionality
        this.prevSlide.addEventListener("click", this.previaImagen.bind(this));
      }
    
    }