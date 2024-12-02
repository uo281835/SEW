class Pais{
    constructor(nombre, capital, circuito){
        this.nombre = nombre;
        this.capital = capital;
        this.circuito = circuito;
        this.apikey = "4fbf610da01d3782582a723f7a6f9156";
        this.lat=34.8429239;
        this.lon=136.5402045;
        this.ciudad = "";
        this.codigoPais = "&JP";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.lat + "&lon=" + this.lon+"&mode=xml&appid=" + this.apikey;
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
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(data){
                var arrayData = $('forecast',data).children();
                var tmax = 0;
                var tmin = 500;
                var acumuladoH =0;
                var nH =0;
                var icono1 ="";
                var lluvia=0;

                for(var i =0; i<arrayData.length; i++){
                    //Acceso a datos
                    var datos = arrayData[i];

                    var temperatureMin = $('temperature',datos).attr('min');
                    var temperatureMax = $('temperature',datos).attr('max');

                    var icono = $('symbol', datos);
                    var humedad = new Number($('humidity',datos).attr("value"));

                    var precip = $('precipitation', datos)
                    

                    var from = $(datos).attr('from').substring(0,10)
                    var to = $(datos).attr('to').substring(0,10)

                    //Procesado de datos
                    if(temperatureMin<tmin)
                        tmin=temperatureMin;

                    if(temperatureMax>tmax)
                        tmax=temperatureMax;

                    icono1 = icono;

                    acumuladoH+=humedad;
                    nH+=1;

                    if($(precip).attr('probability')>0){
                        lluvia+=$(precip).attr('value')
                    }
                    

                    if(from!==to){
                        //Pintado
                        var humedadPromedio = acumuladoH/nH;

                        

                        var article = document.createElement("article");

                        var h3 = document.createElement("h3");
                        $(h3).text("Suzuka");
                        $(article).append(h3);

                        var h4 = document.createElement("h4");
                        $(h4).text(from);
                        $(article).append(h4);

                        var img = document.createElement("img");
                        $(img).attr("src","http://openweathermap.org/img/w/"+$(icono1).attr("var")+".png");
                        $(img).attr("alt",+$(icono1).attr("name"));
                        $(article).append(img);

                        var pTMax = document.createElement("p");
                        $(pTMax).text("Temperatura Máxima:"+(tmax-273)+"ºC");
                        $(article).append(pTMax);

                        var pTMin = document.createElement("p");
                        $(pTMin).text("Temperatura Mínima:"+(tmin-273)+"ºC");
                        $(article).append(pTMin);

                        var ptHumid = document.createElement("p");
                        $(ptHumid).text("Humedad:"+(humedadPromedio)+"%");
                        $(article).append(ptHumid);

                        var ptLluvia = document.createElement("p");
                        $(ptLluvia).text("Lluvia:"+(lluvia));
                        $(article).append(ptLluvia);

                        var articulo =""
                        articulo+="<p> Humedad: "+humedadPromedio+"</p>";
                        articulo += "<p>Precipitación: " + lluvia + "</p></article>";
                        $("main section")[1].append(article);

                        //Reinicio de variables
                        tmax =0;
                        tmin=500;
                        acumuladoH =0;
                        nH =0;
                        icono1 ="";
                        lluvia=0;
                    }
                }
               
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



