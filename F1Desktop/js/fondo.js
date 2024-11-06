class Fondo{
    constructor(nombrePais, nombreCapital, nombreCircuito){
        this.pais = nombrePais;
        this.capital = nombreCapital;
        this.circuito = nombreCircuito;
    }
    obtenerImagenes(){
        var linkQuery = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(linkQuery, 
            {
                tags: this.circuito+", F1, formula1",
                tagmode: "all",
                format: "json"
            })
        .done(function(data) {
            var linkFoto = data.items[0].link;
            var mediaFoto =data.items[0].media.m;
            console.log(linkFoto)
            console.log(mediaFoto)
            $("body").css("background-image", "url('"+mediaFoto+"')")
            .css("background-repeat","no-repeat")
            .css("background-size", "cover")
            .css("background-position","center")
    });
    }
}
