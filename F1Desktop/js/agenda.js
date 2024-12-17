class Agenda{
    constructor(){
        this.url = "https://api.jolpi.ca/ergast/f1/current";
    }

    getInfo(){

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(data1){
                $("section").empty();
                var h31 = document.createElement("h3");
                $(h31).text("Carreras de esta temporada");
                $("section").append(h31);
                var races = (data1.MRData.RaceTable.Races)
                for(var i=0; i<races.length; i++){
                    var race = races[i];
                    var raceName = race.raceName;
                    var circuitName = race.Circuit.circuitName;
                    var lat = race.Circuit.Location.lat
                    var long = race.Circuit.Location.long;
                    var fecha = race.date;
                    var hora = race.time;

                        
                    //PINTADO
                    var article = document.createElement("article");

                    var h3 = document.createElement("h4");
                    $(h3).text(raceName);
                    $(article).append(h3);

                    var h4 = document.createElement("h5");
                    $(h4).text(circuitName);
                    $(article).append(h4);

                    var pCoordenadas = document.createElement("p");
                    $(pCoordenadas).text("Coordenadas: Lat"+lat+"long:"+long);
                    $(article).append(pCoordenadas);

                    var pFechaYHora = document.createElement("p");
                    $(pFechaYHora).text("Fecha:"+fecha+" Hora: "+hora);
                    $(article).append(pFechaYHora);

                    $("main section").append(article);


                }
              
      
            },
            error:function(){
              $("h2:contains(Tiempo)").after("<p>¡Tenemos problemas! No puedo obtener JSON de OpenWeatherMap</p>");
            }
      
          });
        }
    }
