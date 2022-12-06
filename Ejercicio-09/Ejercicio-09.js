class Meteorologia{
    constructor(){
        this.apikey = "0a258947f4479ffa487852aed3af20e2";
        this.ciudad = "";
        this.codigoPais = "ES";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! XML recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"  
    }
    obtenerDatos(ciudad){
        this.ciudad = ciudad;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(data){
                var nodos = $("*",data).length;
                var ciudad = $("city",data).attr("name");
                var longitud =  $("coord", data).attr("lon");
                var latitude =  $("coord", data).attr("lat");
                var country = $("country", data).value();
                var timezone = $("timezone", data).value();
                var sunrise = $("sun", data).attr("rise");
                var sunset = $("sun", data).attr("set");
                var temperature = $("temperature",data).attr("value");
                var minTemperature = $("temperature",data).attr("min");
                var maxTemperature = $("temperature",data).attr("max");
                var unit = $("temperature",data).attr("unit");
                var sensacion = $("feels_like", data).attr("value");
                var humedad = $("humidity", data).attr("value");
                var presion = $("pressure", data).attr("value");
                var presionUnits = $("pressure", data).attr("unit");
                var windSpeed = $("wind speed", data).attr("value");
                var windSpeedName = $("wind speed", data).attr("value");
                var windGusts = $("wind gusts", data).attr("value");
                var directionDegrees = $("wind direction", data).attr("value");
                var directionFacing = $("wind direction", data).attr("name");
                var cloudName = $("clouds", data).attr("name");
                var visibility = $("visibility", data).attr("value");
                var precipitationValue = $("precipitation", data).attr("value");
                var precipitationName = $("precipitation", data).attr("mode");
                var precipitationUnit = $("precipitation", data).attr("unit");
                var weatherName = $("wheather", data).attr("name");
                var icon = $("wheather", data).attr("icon");
                var string = "<ul><li>Ciudad: "+ciudad + "</li>";
                string+="<li> País: "+country+"</li>";
                string+="<li> Latitud: "+latitude+"</li>";
                string+="<li> Longitud: "+longitud+"</li>";
                string+="<li> Temperatura: "+temperature+unit+"</li>";
                string+="<li> Temperatura maxima: "+maxTemperature+unit+"</li>";
                string+="<li> Temperatura minima: "+minTemperature+unit+"</li>";
                string+="<li> Presión: "+presion+presionUnits+"</li>";
                string+="<li> Humedad: "+humedad+"</li>";
                string+= "<li>Amanece a las: " + new Date(sunrise *1000).toLocaleTimeString() + "</li>";
                string+="<li>Oscurece a las: " + new Date(sunset *1000).toLocaleTimeString() + "</li>";
                string += "<li>Dirección del viento: " + directionDegrees+directionFacing + " grados</li>";
                string += "<li>Velocidad del viento: " + windSpeed+windSpeedName+windGusts + " metros/segundo</li>";
                string += "<li>Hora de la medida: " + new Date(data.dt *1000).toLocaleTimeString() + "</li>";
                string += "<li>Fecha de la medida: " + new Date(data.dt *1000).toLocaleDateString() + "</li>";
                string += "<li>Descripción: " + weatherName + "</li>";
                string += "<li>Visibilidad: " +visibility + " metros</li>";
                string += "<li>Nubosidad: " + cloudName + " %</li></ul>";
                string += "<img src = '"+"http://openweathermap.org/img/w/"+icon+".png'"+"/>";
                $("p").html(string);
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
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
var meteorologia = new Meteorologia();