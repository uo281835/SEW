class Memoria{

    initElements(){
        this.elements =[
            {
                element:"RedBull",
                source:"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
            },
            {
                element:"McLaren",
                source:"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
            },
            {
                element:"Alpine",
                source:"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
            },
            {
                element:"AstonMartin",
                source:"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
            },
            {
                element:"Ferrari",
                source:"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
            },
            {
                element:"Mercedes",
                source:"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
            },
            {
                element:"RedBull",
                source:"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
            },
            {
                element:"McLaren",
                source:"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
            },
            {
                element:"Alpine",
                source:"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
            },
            {
                element:"AstonMartin",
                source:"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
            },
            {
                element:"Ferrari",
                source:"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
            },
            {
                element:"Mercedes",
                source:"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
            }
        ];
    }

    createElements(){
        for (var i =0; i<this.elements.length; i++){
            var card = this.elements[i];
            var article = document.createElement("article")
            article.setAttribute("data_element",card.element);
            
            var h3 = document.createElement("h3");
            h3.textContent= "Tarjeta de memoria";
            article.appendChild(h3)

            var img = document.createElement("img");
            img.setAttribute("src",card.source)
            img.setAttribute("alt", card.element)
            article.appendChild(img)
            document.querySelector("main").appendChild(article)
        }
    }

    addEventListeners(){
        var cartas = document.querySelectorAll("article[data_element]")
        for (var i =0; i<cartas.length; i++){
            var card = cartas[i];
            card.addEventListener("click",this.flipCard.bind(card,this));
        }

        
    }

    flipCard(game){
        if(this.getAttribute("data-state")==="revealed"){
            return;
        }
        if(game.lockBoard){
            return;
        }
        if(this === game.firstCard){
            return;
        }
        this.setAttribute("data-state","flip");
        if(!game.hasFlippedCard){
            game.firstCard=this;
            game.hasFlippedCard=true;
        }else{
            game.secondCard=this;
            game.checkForMatch();
        }
    }
    constructor(){
       this.initElements();
       this.hasFlippedCard = false;
       this.lockBoard = false;
       this.firstCard = null;
       this.secondCard = null;
       this.shuffleElements();
       this.createElements();
       this.addEventListeners();
    }

    shuffleElements(){
        //Crear lista nueva
        var listaNueva = new Array(12);
        var lista2 = this.elements
        //Bucle for
        //  RNG
        //  Coger esa posición
        //  Borrarla

        
        for(var i =0; i<12; i++){
            var posicion = Math.floor(Math.random()*lista2.length);
            var dato = lista2[posicion];
            listaNueva[i]=dato;
            lista2 = lista2.filter((a)=>a!==dato);
        }
        //Asignar
        this.elements = listaNueva;

    }

    unflipCards(){
        this.lockBoard=true;
        this.firstCard.setAttribute("data-state","");
        this.secondCard.setAttribute("data-state","");
        this.resetBoard();
    }

    resetBoard(){
       this.hasFlippedCard = false;
       this.lockBoard = false;
       this.firstCard = null;
       this.secondCard = null;
    }

    checkForMatch(){
        if(this.firstCard!=null && this.secondCard!=null){
            var val1 = this.firstCard.getAttribute("data_element");
            var val2 = this.secondCard.getAttribute("data_element");
            if (val1 == val2){
                this.disableCards();
            } else{
                var f = function(){
                    this.unflipCards()
                }.bind(this)
                setTimeout(f, 1000);
            }
        }
    }

    disableCards(){
        this.firstCard.setAttribute("data-state","revealed");
        this.secondCard.setAttribute("data-state","revealed");
        this.resetBoard(); 
    }
}