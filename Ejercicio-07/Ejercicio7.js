class JQueryUtil{
    constructor(){
        
    }

    hideTable(){
        $("table").hide();
    }

    hideParagraphs(){
        $("p").hide();
    }

    hideH1(){
        $("h1").hide();
    }

    hideH2(){
        $("h2").hide();
    }

    hideH3(){
        $("h3").hide();
    }
    showTable(){
        $("table").show();
    }

    showParagraphs(){
        $("p").show();
    }

    showH1(){
        $("h1").show();
    }

    showH2(){
        $("h2").show();
    }

    showH3(){
        $("h3").show();
    }

    changeH1(){
        $("h1").text($("header form input").val());
    }
    addParagraph(){
        $("h1").after("<p>"+$("header form input").val()+"</p>");
    }
    removeAllParagraphs(){
        $("p").remove();
    }
    recorrer(){
        var parent;
        var contador =0;
        var hasNumber = false;
        var contadores = new Array();
        var a1 = $("table tr");
        a1.each(function(){
            contador=0;
            hasNumber = false;
            var c = this.children;
            for(var i = 0; i<c.length; i++){
                var element = c[i];
                var a = Number(element.textContent);
                if(!(isNaN(a))){
                    contador+=a;
                    hasNumber=true;
                }
            }
            if(hasNumber){
                this.lastChild.textContent=(contador);
            }
           
        });
      
        
    }
    sumatorio(){
        $("")
    }
}

var jqutil = new JQueryUtil();