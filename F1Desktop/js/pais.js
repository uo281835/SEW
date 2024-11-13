class Pais{
    constructor(nombre, capital, circuito){
        this.nombre = nombre;
        this.capital = capital;
        this.circuito = circuito;
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.ciudad = "";
        this.codigoPais = "&JP";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! Datos recibidos de <a href='http://openweathermap.org'>OpenWeatherMap</a>"  
    }

    rellenarDatos(poblacion, formaGobierno, lineaMeta, religionMayoritaria) {
        this.poblacion = poblacion;
        this.formaGobierno = formaGobierno;
        this.lineaMeta = lineaMeta;
        this.religionMayoritaria = religionMayoritaria;
    }

    getNombre(){
        return this.nombre;
    }

    getCapital(){
        return this.capital;
    }

    getInfoSecundaria(){
        var result = "<ul>";
        result+="<li>"+this.circuito+"</li>";
        result+="<li>"+this.poblacion+"</li>";
        result+="<li>"+this.formaGobierno+"</li>";
        result+="<li>"+this.religionMayoritaria+"</li>";
        result+="</ul>";
        return result;
    }

    escribirCoordenadas(){
        document.querySelector("body main p").innerHTML = ("<p> Coordenadas de la línea de meta "+this.lineaMeta+"</p>");
    }
    obtenerDatos(ciudad){
        this.ciudad = ciudad;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad+"&mode=xml"+ this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(data){
               
                var string = "<article><h3>Ciudad: "+$('city',data).attr("name") + "</h3>";
                string+="<p> Temperatura maxima: "+$('temperature',data).attr("max")+"</p>";
                string+="<p> Temperatura minima: "+$('temperature',data).attr("min")+"</p>";
                string+="<p> Humedad: "+$('humidity',data).attr("value")+"</p>";
                string += "<p>Precipitación: " + $('precipitation',data).attr("value") + "</p>";
                string += "<img src = '"+"http://openweathermap.org/img/w/"+$('weather',data).attr("icon")+".png'"+"/></article>";
                $("article").html(string);
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
            
        });
    }
    show(ciudad){
        this.obtenerDatos(ciudad);
    }


}



