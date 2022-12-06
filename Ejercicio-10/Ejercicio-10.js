class GasNatural{
    constructor(){
        this.apikey = "0a258947f4479ffa487852aed3af20e2";
        this.ciudad = "";
        this.codigoPais = "ES";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.correcto = "¡Todo correcto! XML recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"  
    }

    obtenerDatos(){
        // set endpoint and your access key
        var endpoint = 'latest'
        var access_key = 'izwgs6eh9e6cjl568qrjt68n0i47bhcxelq1lfwbh4j0w82h0x3xy3g6j7wm';

        // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
        url: 'https://commodities-api.com/api/open-high-low-close/2022-11-2?access_key=' + access_key,  
        
        dataType: 'jsonp',
        
        success: function(json) {

        // exchange rata data is stored in json.rates
        alert(json.rates.GBP);

        // base currency is stored in json.base
        alert(json.base);

        // timestamp can be accessed in json.timestamp
        alert(json.timestamp);
        $("pre").text(JSON.stringify(data, null, 2)); //muestra el json en un elemento pre

        var string = "<ul><li>Europa: "+data.rates.EUR + " Euros</li>";
        string+="<ul><li>Australia: "+data.rates.AUD + " Dólares australianos</li>";
        string+="<li> Datos del: "+data.date+"</li>";
        string+="<li> Canadá: "+data.rates.CAD+" Dólares Canadienses</li>";
        string+="<li> CHF: "+data.rates.CHF+"</li>";
        string+="<li> CNY: "+data.rates.CNY+"</li>";
        string+="<li> Gran Bretaña: "+data.rates.GBP+"Libras </li>";
        string+="<li> Japón: "+data.rates.JPY+" Yenes</li>";
        string+="<li> USA: "+data.rates.USD+" Dólares americanos</li>";
        $("p").after(string); 

}
});

    }
    


}
var gas = new GasNatural();