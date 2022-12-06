class Meteorologia{
    constructor(){
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.ciudad = "";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"  
    }
    obtenerDatos(ciudad){
        this.ciudad = ciudad;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(data){
                $("pre").text(JSON.stringify(data, null, 2)); //muestra el json en un elemento pre

                var string = "<ul><li>Ciudad: "+data.name + "</li>";
                string+="<li> País: "+data.sys.country+"</li>";
                string+="<li> Latitud: "+data.coord.lat+"</li>";
                string+="<li> Longitud: "+data.coord.lon+"</li>";
                string+="<li> Temperatura: "+data.main.temp+"</li>";
                string+="<li> Temperatura maxima: "+data.main.temp_max+"</li>";
                string+="<li> Temperatura minima: "+data.main.temp_min+"</li>";
                string+="<li> Presión: "+data.sys.pressure+"</li>";
                string+="<li> Humedad: "+data.sys.humidity+"</li>";
                string+= "<li>Amanece a las: " + new Date(data.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                string+="<li>Oscurece a las: " + new Date(data.sys.sunset *1000).toLocaleTimeString() + "</li>";
                string += "<li>Dirección del viento: " + data.wind.deg + " grados</li>";
                string += "<li>Velocidad del viento: " + data.wind.speed + " metros/segundo</li>";
                string += "<li>Hora de la medida: " + new Date(data.dt *1000).toLocaleTimeString() + "</li>";
                string += "<li>Fecha de la medida: " + new Date(data.dt *1000).toLocaleDateString() + "</li>";
                string += "<li>Descripción: " + data.weather[0].description + "</li>";
                string += "<li>Visibilidad: " + data.visibility + " metros</li>";
                string += "<li>Nubosidad: " + data.clouds.all + " %</li></ul>";
                string += "<img src = '"+"http://openweathermap.org/img/w/"+data.weather[0].icon+".png'"+"/>";
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