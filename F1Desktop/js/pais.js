class Pais{
    constructor(nombre, capital, circuito){
        this.nombre = nombre;
        this.capital = capital;
        this.circuito = circuito;
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.ciudad = "";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"  
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


var pais = new Pais("Japón", "Tokio", "Suzuka");
pais.rellenarDatos("123719238", "Monarquía Parlamentaria", "34.8429239,136.5402045,46.8373725", "Sintoísmo");

console.log(document.querySelector("body"))
//document.querySelector("body main").write("<section>");
document.querySelector("body main h3").innerHTML = ("<h3>"+pais.getNombre()+"</h3>");
document.querySelector("body main h4").innerHTML=("<h4>"+pais.getCapital()+"</h4>");
document.querySelector("body main ul").innerHTML = (pais.getInfoSecundaria());
pais.escribirCoordenadas();

