class Circuito{
    constructor() {
        this.listaRuta = new Array();
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            document.querySelectorAll("p")[1].innerHTML=("Este navegador soporta el API File");
        }
        else {
            document.querySelectorAll("p")[1].innerHTML=("¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!");
        }
    }

    readXML(files){
        var archivo = files[0];

        if(archivo.type.match("text.*")){
            var lector = new FileReader();
            lector.onload = function(evento){
                var texto = lector.result;
                var parser = new DOMParser();
                var doc = parser.parseFromString(texto,"text/xml");

                var article = document.createElement("article");
                
                //Nombre
                var nombre = $("circuito", doc).attr("nombre");
                var title = document.createElement("h3");
                $(title).text("Información del circuito: "+nombre);
                $(article).append(title);

                //Información general Localidad, País, Longitud, Anchura
                var sectionInfo = document.createElement("section");
                var h4Info = document.createElement("h4");
                $(h4Info).text("Información general del circuito");
                $(sectionInfo).append(h4Info);

                var dListInfo = document.createElement("dl");
                $(sectionInfo).append(dListInfo);

                var longitudC = $("longitudCircuito", doc);
                var longitudCValor = $(longitudC).text();
                var longitudCUnidad = $(longitudC).attr("unidad");
                var cadenaLongitud =longitudCValor+longitudCUnidad;
                var termLongitud =document.createElement("dt");
                $(termLongitud).text("Longitud");
                var defLongitud = document.createElement("dd");
                $(defLongitud).text(cadenaLongitud);
                $(dListInfo).append(termLongitud);
                $(dListInfo).append(defLongitud);
                

                var anchura = $("anchura", doc);
                var anchuraValor = $(anchura).text();
                var anchuraUnidad = $(anchura).attr("unidad");
                var cadenaAnchura = anchuraValor+anchuraUnidad;
                var termAncho =document.createElement("dt");
                $(termAncho).text("Anchura");
                var defAncho = document.createElement("dd");
                $(defAncho).text(cadenaAnchura);
                $(dListInfo).append(termAncho);
                $(dListInfo).append(defAncho);

                var salida = $("salida", doc);
                var coordenadas = $("coordenadas", salida);
                var coordenadasString = "";
                coordenadasString+= "Latitud: "+$("latitud",coordenadas).text();
                coordenadasString+= ", Longitud: "+$("longitud",coordenadas).text();
                coordenadasString+= ", Altura: "+$("altura",coordenadas).text();
                var termCoordenadas = document.createElement("dt");
                $(termCoordenadas).text("Coordenadas de la salida");
                var defCoordenadas = document.createElement("dd");
                $(defCoordenadas).text(coordenadasString);
                $(dListInfo).append(termCoordenadas);
                $(dListInfo).append(defCoordenadas);



                var Localidad = $("localidad", doc).text();
                var termLocalidad =document.createElement("dt");
                $(termLocalidad).text("Localidad");
                var defLocalidad = document.createElement("dd");
                $(defLocalidad).text(Localidad);
                $(dListInfo).append(termLocalidad);
                $(dListInfo).append(defLocalidad);

                var pais = $("pais", doc).text();
                var termPais = document.createElement("dt");
                $(termPais).text("País");
                var defPais = document.createElement("dd");
                $(defPais).text(pais);
                $(dListInfo).append(termPais);
                $(dListInfo).append(defPais);


                $(article).append(sectionInfo);
                //Fecha y hora
                var sectionFechaHora = document.createElement("section");
                var h4Fecha = document.createElement("h4");
                $(h4Fecha).text("Fecha y hora del circuito");
                $(sectionFechaHora).append(h4Fecha);

                var fechaCarrera = $("fechaCarrera",doc);
                var diaCarrera = $("dia", fechaCarrera).text();
                var mesCarrera = $("mes", fechaCarrera).text();
                var yearCarrera = $("year", fechaCarrera).text();
                var cadenaFecha = "Fecha de la carrera: "+diaCarrera+"/"+mesCarrera+"/"+yearCarrera;
                var pFecha = document.createElement("p");
                $(pFecha).text(cadenaFecha);
                $(sectionFechaHora).append(pFecha);

                var horaCarrera = $("horaCarrera", doc);
                var horaHora = $("hora", horaCarrera).text();
                var minutoHora = $("minuto", horaCarrera).text();
                var segundoHora = $("segundo", horaCarrera).text();
                var cadenaHora = "Hora de la carrera: "+horaHora+":"+minutoHora+":"+segundoHora;
                var pHora = document.createElement("p");
                $(pHora).text(cadenaHora);
                $(sectionFechaHora).append(pHora);


                $(article).append(sectionFechaHora);

                //Multimedia Referencias, Videos, Fotos
                var sectionReferencias = document.createElement("section");
                var h4Referencias = document.createElement("h4");
                $(h4Referencias).text("Referencias");
                $(sectionReferencias).append(h4Referencias);
                var listaReferencias = document.createElement("ul");
                $(sectionReferencias).append(listaReferencias);
                $(article).append(sectionReferencias);

                var referencias = $("referencia", doc);
                for(var i =0; i<referencias.length; i++){
                    var referencia = referencias[i];
                    var item = document.createElement("li");
                    var aReferencia = document.createElement("a");
                    $(aReferencia).text($(referencia).attr("titular"));
                    $(aReferencia).attr("href",$(referencia).text());
                    $(item).append(aReferencia);
                    $(listaReferencias).append(item);
                }

                //Fotos
                var sectionFotos = document.createElement("section");
                var h4Fotos = document.createElement("h4");
                var ulFotos = document.createElement("ul");
                $(h4Fotos).text("Fotos");
                $(sectionFotos).append(h4Fotos);
                $(sectionFotos).append(ulFotos);
                $(article).append(sectionFotos);

                var fotos = $("fotografia",doc);
                for(var i =0; i<fotos.length; i++){
                    var foto = fotos[i];
                    var item = document.createElement("li");
                    var img = document.createElement("img");
                    $(img).attr("src", $(foto).text());
                    $(img).attr("alt", $(foto).attr("titulo"))
                    $(item).append(img);
                    $(ulFotos).append(item);
                }

                //Videos
                var sectionVideos = document.createElement("section");
                var h4Videos = document.createElement("h4");
                var ulVideos = document.createElement("ul");
                $(h4Videos).text("Videos");
                $(sectionVideos).append(h4Videos);
                $(sectionVideos).append(ulVideos);
                $(article).append(sectionVideos);

                var videos = $("video", doc);
                for(var i =0; i<videos.length; i++){
                    var video = videos[i];
                    var item = document.createElement("li");
                    var videoElement = document.createElement("video");
                    $(videoElement).attr("controls","true");
                    $(videoElement).attr("preload","auto");
                    $(item).append(videoElement);
                    var source = document.createElement("source");
                    $(source).attr("src", $(video).text());
                    $(source).attr("type","video/mp4");
                    $(videoElement).append(source);
                    $(ulVideos).append(item);
                }

                //Tramos y Salida
                var sectionTramos = document.createElement("section");
                var h4Tramos = document.createElement("h4");
                $(h4Tramos).text("Tramos");
                $(sectionTramos).append(h4Tramos);
                var olTramos = document.createElement("ol");
                $(sectionTramos).append(olTramos);
                $(article).append(sectionTramos);

                var tramos = $("tramo", doc);
                for(var i =0; i<tramos.length; i++){
                    var tramo = tramos[i];
                    var item = document.createElement("li");
                    $(olTramos).append(item);
                    var dltramo = document.createElement("dl");
                    $(item).append(dltramo);

                    var coordenadasTramo = $("coordenadas", tramo);
                    var coordenadasStringTramo = "";
                    coordenadasStringTramo+= "Latitud: "+$("latitud",coordenadasTramo).text();
                    coordenadasStringTramo+= ", Longitud: "+$("longitud",coordenadasTramo).text();
                    coordenadasStringTramo+= ", Altura: "+$("altura",coordenadasTramo).text();
                    var termCoordenadasT = document.createElement("dt");
                    $(termCoordenadasT).text("Coordenadas");
                    var defCoordenadasT = document.createElement("dd");
                    $(defCoordenadasT).text(coordenadasStringTramo);
                    $(dltramo).append(termCoordenadasT);
                    $(dltramo).append(defCoordenadasT);

                    var distanciaTramo = $("distancia", tramo);
                    var stringDistancia = $(distanciaTramo).text()+" "+$(distanciaTramo).attr("unidad")
                    var termDistancia = document.createElement("dt");
                    $(termDistancia).text("Longitud del tramo")
                    var defDistancia = document.createElement("dd");
                    $(defDistancia).text(stringDistancia);
                    $(dltramo).append(termDistancia);
                    $(dltramo).append(defDistancia);

                    var numeroSector = $("numeroSector", tramo).text();
                    var termNumero = document.createElement("dt");
                    $(termNumero).text("Sector");
                    var defNumero = document.createElement("dd");
                    $(defNumero).text(numeroSector);
                    $(dltramo).append(termNumero);
                    $(dltramo).append(defNumero);


                }


                $("main").append(article);


            }
            lector.readAsText(archivo);
        }
        
    }

    showDynamicMap(){
        var centro = {lat:34.8429239, lng:136.5402045};
        var mapaGeoposicionado = new google.maps.Map(document.querySelector('body div'),{
            zoom: 10,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.mapa = mapaGeoposicionado;

        var h3 = document.createElement("h3");
        $(h3).text("Mapa del circuito ");
        $("article").append(h3);
    }
  
        
        handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: Ha fallado la geolocalización' :
                                  'Error: Su navegador no soporta geolocalización');
            infoWindow.open(dynamicMap);
      }

    readKML(files){
        var archivo = files[0];
        if(archivo.type.match(".kml")){

            var lector = new FileReader();
            lector.onload = function(evento){
                var texto = lector.result;
                var parser = new DOMParser();
                var doc = parser.parseFromString(texto,"text/xml");
                var puntos = $("Placemark", doc);
                var listaRuta = new Array();
                for(var i =0; i<puntos.length; i++){
                    var punto = puntos[i];
                    var coordinates = $("coordinates", punto).text().split("\n")[1].split(",");

                    var latitud =  Number(coordinates[1]);
                    var longitud =  Number(coordinates[0]);


                    var latLong ={lat:latitud, lng:longitud};

                    new google.maps.Marker({
                        position: latLong,
                        map: this.mapa,
                        title: "Punto "+i,
                      });
                    
                      listaRuta.push({lat:latitud, lng:longitud});


                }
                var flightPath = new google.maps.Polyline({
                    path: listaRuta,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                  });
                
                  flightPath.setMap(this.mapa);
            }.bind(this)
            lector.readAsText(archivo);
            
           
           
        }
    }
    readSVG(files){
        var archivo = files[0];
        if(archivo.type.match(".svg")){
            var lector = new FileReader();
            lector.onload = function(evento){
                var texto = lector.result;
                var parser = new DOMParser();
                var doc = parser.parseFromString(texto, "image/svg+xml");
                var svg = document.createElement("svg");
                svg.innerHTML=texto;
                $("main").append(svg);
            }
            lector.readAsText(archivo);
            
        }
    }
}