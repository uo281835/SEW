class Circuito{
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            document.querySelectorAll("p")[1].innerHTML=("<p>Este navegador soporta el API File </p>");
        }
        else {
            document.querySelectorAll("p")[1].innerHTML=("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
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
                
                console.log(doc);
                //Nombre
                var nombre = $("circuito", doc).attr("nombre");
                console.log(nombre)
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
                console.log(cadenaLongitud);
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
                console.log(cadenaAnchura);
                var termAncho =document.createElement("dt");
                $(termAncho).text("Anchura");
                var defAncho = document.createElement("dd");
                $(defAncho).text(cadenaAnchura);
                $(dListInfo).append(termAncho);
                $(dListInfo).append(defAncho);

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
                console.log(cadenaFecha);
                var pFecha = document.createElement("p");
                $(pFecha).text(cadenaFecha);
                $(sectionFechaHora).append(pFecha);

                var horaCarrera = $("horaCarrera", doc);
                var horaHora = $("hora", horaCarrera).text();
                var minutoHora = $("minuto", horaCarrera).text();
                var segundoHora = $("segundo", horaCarrera).text();
                var cadenaHora = "Hora de la carrera: "+horaHora+":"+minutoHora+":"+segundoHora;
                console.log(cadenaHora);
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
                console.log(referencias);
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


                $("main").append(article);


            }
            lector.readAsText(archivo);
        }
        
    }
    readKML(files){
        var archivo = files[0];
        if(archivo.type.match("text.*")){
            var parser = new XMLSerializer();
            var doc = parser.serializeToString(archivo);
            console.log(doc);
            
            /*var xml = xmlhttp.responseXML;
            

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
            */
        }
    }
    readSVG(files){
        var archivo = files[0];
        if(archivo.type.match("text.*")){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET",archivo, false);
            xmlhttp.send();
            var xml = xmlhttp.responseXML;
            

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