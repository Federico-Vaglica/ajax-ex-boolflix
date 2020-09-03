$(document).ready(function(){


    
    
    $("button").on("click", function(){
        ricercaApi();
        $('input').val('');
    })


    $('input').on('keypress',function(a) {
        if(a.which == 13 || a.keyCode == 13) {
            ricercaApi() 
            $('input').val('');
        }
    });
    





/*****************************Funzioni***************************************/

    function ricercaApi (){

        var dati = $('input').val();
        $('.movies').empty();
        var apiUrl = 'https://api.themoviedb.org/3/search/';
        var arrayApiUrl = [
            {
                type: 'movie',
                url: apiUrl + 'movie'
            },
            {
                type: 'tv',
                url: apiUrl + 'tv'
            }
        ];
        arrayApiUrl.forEach(function(element){
            $.ajax({
                url: element.url,
                method: 'GET',
                data: {
                    'api_key': 'd5e76e32726c06432277b9f07da06085',
                    'query': dati,
                    'language': 'it-IT'
                },
                success: function(a){
                    if (a.total_results > 0){
                        printMovie(a.results,element.type);
                    }else {
                        noResults(element.type);
                    }
                },
                error: function(){
                  console.log('Errore');
                }
              });
        });
      }

    /*Funzione che clona i template rispetto alle chiamate ajax*/
      function printMovie (a,tipo){

        var source = $('#day-template').html();
        var template = Handlebars.compile(source);
        
        for ( var i = 0; i < a.length; i++ ){ 
            var selezionato = a[i];
            var titolo;
            var titoloOriginale;
            var tipologia;
                if(tipo === 'tv'){
                    titolo = selezionato.name;
                    titoloOriginale = selezionato.original_name;
                    tipologia = 'Serie Tv'
                } else {
                    titolo = selezionato.title;
                    titoloOriginale = selezionato.original_title;
                    tipologia = "Film";
                }                                      
            var thisMovie={
                titolo: titolo,
                titoloOriginale: titoloOriginale,
                lingua: printFlag(selezionato.original_language),
                voto: printStars(selezionato.vote_average),
                tipo : tipologia
            }
            console.log(thisMovie)
            var html = template(thisMovie);
            $('.movies').append(html);
        }
      }

/*Se non sono presenti risultati*/
      function noResults(tipo) {
        var source = $('#noResults').html();
        var template = Handlebars.compile(source);

        var context = {
            noResults: 'Non ci sono risultati nella categoria ' + tipo
        }

        var html = template(context);
        $('.movies').append(html);
      }

/* Funziona Reteo Stars*/
      function printStars(val) {
        var toStarsRating = Math.ceil(val / 2);
        var starsHtml = '';
        var fullStar = '<i class="fas fa-star"></i>';
        var emptyStar = '<i class="far fa-star"></i>';
    
        for(var i = 0; i < 5; i++) {
            if(toStarsRating > i) {
                starsHtml += fullStar;
            } else {
                starsHtml += emptyStar
            };
        }
        return starsHtml;
    }

     /*Funzione per printare le flag(ancora da modificare per essere riutilizzabile)*/ 
     function printFlag(lingua) {
        var italianFlag = '<img class="flag" src="img/it.svg" alt="italian flag">';
        var englishFlag = '<img class="flag" src="img/en.svg" alt="england flag">';
        console.log(lingua)

        if(lingua == 'it') {
            return italianFlag;
        } else if (lingua == 'en') {
            return englishFlag;
        } else {
            return lingua;
        }
    };
});

   