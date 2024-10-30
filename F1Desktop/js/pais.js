class Pais{
    constructor(nombre, capital, circuito){
        this.nombre = nombre;
        this.capital = capital;
        this.circuito = circuito;
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


}


var pais = new Pais("Japón", "Tokio", "Suzuka");
pais.rellenarDatos("123719238", "Monarquía Parlamentaria", "34.8429239,136.5402045,46.8373725", "Sintoísmo");

console.log(document.querySelector("body"))
//document.querySelector("body main").write("<section>");
document.querySelector("body main h3").innerHTML = ("<h3>"+pais.getNombre()+"</h3>");
document.querySelector("body main h4").innerHTML=("<h4>"+pais.getCapital()+"</h4>");
document.querySelector("body main ul").innerHTML = (pais.getInfoSecundaria());
pais.escribirCoordenadas();

