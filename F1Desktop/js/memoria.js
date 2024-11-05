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
        for (card in this.elements){
            document.write("<article data-element=\""+card.element+"\">");
            document.write("<h3> Tarjeta de memoria </h3>");
            document.write("<img src=\""+card.source+"\" alt=\""+card.element+"\"/>");
            document.write("</article>");
        }
    }
    constructor(){
       this.initElements();
       this.hasFlippedCard = false;
       this.lockBoard = false;
       this.firstCard = null;
       this.secondCard = null;
    }

    shuffleElements(){
        //CAMBIAR
        this.elements.sort((a,b)=>a-b);
    }

    unflipCards(){
        this.lockBoard=true;
        this.checkForMatch()
        setTimeout(10);
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
            method = this.firstCard.element===this.secondCard.element ? this.disableCards : this.unflipCards
            method()
        }
    }

    disableCards(){
        data_state = "revealed";
        this.resetBoard();
    }
}