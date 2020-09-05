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
                type: 'tv',
                url: apiUrl + 'tv'
            },
            {
                type: 'movie',
                url: apiUrl + 'movie'
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
                        $(".noResult").empty();
                        printMovieSeries(a.results,element.type);
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
      function printMovieSeries (a,tipo){

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
                tipo : tipologia,
                poster: poster(selezionato.poster_path),
                personaggi: getCharacters(selezionato.id),
                recensione: selezionato.overview.substr(0,100),
            }
            // console.log(selezionato.id);
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
        $('.noResult').append(html);
      }

/* Funziona Reteo Stars*/
      function printStars(val) {
        var resto = val % 2;
        val = Math.floor(val / 2);
        var stars = '';
        var fullStar = '<i class="fas fa-star"></i>';
        var emptyStar = '<i class="far fa-star"></i>';
        var halfStar = '<i class="fas fa-star-half-alt"></i>';
    
        for(var i = 0; i < 5; i++) {
            if(val > i) {
                stars += fullStar;
            } else if (resto != 0){
                stars += halfStar;
                resto = 0 ;
            }
            else {
                stars += emptyStar
            };
        }
        return stars;
    }

     /*Funzione per printare le flag , con la possibilita di avere piu bandiere per le lingue , se dovesse esserci la necessita basterebbe aggiunger il file della bandiera corrispondente*/ 
     function printFlag(lingua) {

        var languages=[];
        languages.push(lingua);

        if (languages.includes(lingua)) {
            return '<img class="flag" src="img/' + lingua + '.svg"' +' '+'alt="'+ lingua + ' '+ 'flag">';
        }  else {
            return lingua;
        }   
    }

    function poster(poster){
        var img;

        if (poster == null) {
            img = 'img/no-poster.jpg'
        } else {
            img = 'https://image.tmdb.org/t/p/w500' + poster;
        }

        return img;
    }


    function getCharacters(id){
        var apiUrl = 'https://api.themoviedb.org/3/';
        var arrayApiUrl = [
            {
                url: apiUrl + 'tv/' + id + '/credits'
            },
            {
                url: apiUrl + 'movie/' + id + '/credits'
            }
        ];
            arrayApiUrl.forEach(function(element){
                $.ajax({
                    url: element.url,
                    method: 'GET',
                    data: {
                        'api_key': 'd5e76e32726c06432277b9f07da06085',
                    },
                    success: function(a){
                        ottieniNomi(a.cast);
                    },
                    error: function(){
                      console.log('Errore');
                    }
                  });
            });

            function ottieniNomi(a){
                var personaggi = [];
                
                for(var i=1; i< a.length; i++){
                    personaggi.push(a[i].name ); 
                } 
                console.log(personaggi);

                return personaggi;
                
            }
    
    }
});



